# Marketing site (cryptoprism.io) -- the one piece of this repo not yet on
# AWS. Mirrors the existing app.cryptoprism.io pattern exactly: private S3
# bucket behind CloudFront via Origin Access Control, no public bucket
# policy, ACM cert in us-east-1 (required for CloudFront regardless of
# where everything else lives).

resource "aws_s3_bucket" "website" {
  bucket = var.website_bucket_name
}

resource "aws_s3_bucket_public_access_block" "website" {
  bucket                  = aws_s3_bucket.website.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "website" {
  bucket = aws_s3_bucket.website.id
  versioning_configuration {
    status = "Enabled"
  }
}

# ACM cert must be requested in us-east-1 for CloudFront. DNS validation
# records need to be added at your DNS provider (Dynadot) -- see
# MIGRATION_GUIDE.md. Terraform will wait on aws_acm_certificate_validation
# until those records exist and propagate.
resource "aws_acm_certificate" "website" {
  domain_name               = var.domain_name
  subject_alternative_names = [var.www_domain_name]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# Blocks here until the CNAME validation records (see the
# acm_validation_records output) exist at Dynadot and propagate. Either
# add them before running `terraform apply` (recommended -- avoids a
# long-running blocked apply), or add them while this is running; default
# timeout is 45 minutes. Everything below this depends on the validated
# cert, so nothing else in this file can be created until it passes.
resource "aws_acm_certificate_validation" "website" {
  certificate_arn = aws_acm_certificate.website.arn
  validation_record_fqdns = [
    for dvo in aws_acm_certificate.website.domain_validation_options : dvo.resource_record_name
  ]
}

resource "aws_cloudfront_origin_access_control" "website" {
  name                              = "${var.website_bucket_name}-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# The existing app.cryptoprism.io CloudFront distribution has no response
# headers policy at all -- but this specific site had CSP/HSTS/etc.
# explicitly added to Firebase Hosting recently (a real hardening pass,
# not incidental), so carrying those forward here rather than silently
# losing them on cutover is deliberate, not just copying precedent.
resource "aws_cloudfront_response_headers_policy" "website" {
  name = "${var.website_bucket_name}-security-headers"

  security_headers_config {
    content_security_policy {
      override                = true
      content_security_policy = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' ${aws_apigatewayv2_api.api.api_endpoint}; img-src 'self' data:; frame-ancestors 'none'"
    }
    content_type_options {
      override = true
    }
    frame_options {
      override     = true
      frame_option = "DENY"
    }
    referrer_policy {
      override        = true
      referrer_policy = "strict-origin-when-cross-origin"
    }
    strict_transport_security {
      override                   = true
      access_control_max_age_sec = 31536000
      include_subdomains         = true
    }
  }

  custom_headers_config {
    items {
      header   = "Permissions-Policy"
      value    = "camera=(), microphone=(), geolocation=()"
      override = true
    }
  }
}

resource "aws_cloudfront_distribution" "website" {
  enabled             = true
  default_root_object = "index.html"
  aliases             = [var.domain_name, var.www_domain_name]
  price_class         = "PriceClass_100" # cheapest tier -- US/Canada/Europe edge locations only

  origin {
    domain_name              = aws_s3_bucket.website.bucket_regional_domain_name
    origin_id                = "s3-${var.website_bucket_name}"
    origin_access_control_id = aws_cloudfront_origin_access_control.website.id
  }

  default_cache_behavior {
    target_origin_id         = "s3-${var.website_bucket_name}"
    viewer_protocol_policy    = "redirect-to-https"
    allowed_methods           = ["GET", "HEAD"]
    cached_methods            = ["GET", "HEAD"]
    compress                  = true
    cache_policy_id           = data.aws_cloudfront_cache_policy.caching_optimized.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.website.id
  }

  # This SPA uses hash-based routing (#/deck, #/brandkit, etc.) -- the
  # server never sees the fragment. Mirrors Firebase's current
  # `rewrites: "**" -> /index.html` behavior exactly: any path that isn't a
  # real file in the bucket still serves the app shell with a 200, rather
  # than a real 404 (unlike the path-based app.cryptoprism.io setup, which
  # intentionally returns real 404s -- deliberate difference, not an
  # oversight).
  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.website.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}

resource "aws_s3_bucket_policy" "website" {
  bucket = aws_s3_bucket.website.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "AllowCloudFrontOACRead"
      Effect    = "Allow"
      Principal = { Service = "cloudfront.amazonaws.com" }
      Action    = "s3:GetObject"
      Resource  = "${aws_s3_bucket.website.arn}/*"
      Condition = {
        StringEquals = {
          "AWS:SourceArn" = aws_cloudfront_distribution.website.arn
        }
      }
    }]
  })
}
