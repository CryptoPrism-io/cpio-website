output "acm_validation_records" {
  description = "DNS CNAME records to add at Dynadot before aws_acm_certificate_validation can complete"
  value = {
    for dvo in aws_acm_certificate.website.domain_validation_options :
    dvo.domain_name => {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  }
}

output "cloudfront_domain_name" {
  description = "CloudFront-assigned domain -- the target for the final DNS cutover at Dynadot"
  value       = aws_cloudfront_distribution.website.domain_name
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.website.id
}

output "website_bucket_name" {
  value = aws_s3_bucket.website.id
}

output "api_service_url" {
  description = "API Gateway invoke URL for the signup API -- update EarlyAccessModal.tsx and the CSP connect-src to this"
  value       = aws_apigatewayv2_api.api.api_endpoint
}

output "gha_website_deploy_role_arn" {
  value = aws_iam_role.gha_website_deploy.arn
}

output "gha_website_api_deploy_role_arn" {
  value = aws_iam_role.gha_website_api_deploy.arn
}
