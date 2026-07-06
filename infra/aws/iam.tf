# Two new GitHub Actions OIDC deploy roles, following the exact pattern
# already used by gha-cryptoprism-app-deploy (S3+CloudFront) and
# gha-cryptoprism-api-deploy (ECR+App Runner). No stored AWS keys -- same
# no-long-lived-credentials posture as your GCP Workload Identity setup.

data "aws_iam_policy_document" "github_trust" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [data.aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_repo}:ref:refs/heads/${var.github_branch}"]
    }
  }
}

# --- Website deploy role (S3 sync + CloudFront invalidation) ---

resource "aws_iam_role" "gha_website_deploy" {
  name               = "gha-cryptoprism-website-deploy"
  assume_role_policy = data.aws_iam_policy_document.github_trust.json
}

resource "aws_iam_role_policy" "gha_website_deploy" {
  name = "s3-cloudfront-deploy"
  role = aws_iam_role.gha_website_deploy.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid      = "S3Sync"
        Effect   = "Allow"
        Action   = ["s3:ListBucket"]
        Resource = aws_s3_bucket.website.arn
      },
      {
        Sid      = "S3Objects"
        Effect   = "Allow"
        Action   = ["s3:PutObject", "s3:DeleteObject", "s3:GetObject"]
        Resource = "${aws_s3_bucket.website.arn}/*"
      },
      {
        Sid      = "CFInvalidate"
        Effect   = "Allow"
        Action   = ["cloudfront:CreateInvalidation", "cloudfront:GetInvalidation"]
        Resource = aws_cloudfront_distribution.website.arn
      }
    ]
  })
}

# --- Signup API deploy role (Lambda code update) ---
# Was ECR push + App Runner redeploy in the original plan; pivoted to
# Lambda (see api.tf) after hitting this account's 2-App-Runner-services-
# per-region restriction.

resource "aws_iam_role" "gha_website_api_deploy" {
  name               = "gha-cryptoprism-website-api-deploy"
  assume_role_policy = data.aws_iam_policy_document.github_trust.json
}

resource "aws_iam_role_policy" "gha_website_api_deploy" {
  name = "gha-cryptoprism-website-api-deploy-policy"
  role = aws_iam_role.gha_website_api_deploy.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "LambdaDeploy"
        Effect = "Allow"
        Action = [
          "lambda:UpdateFunctionCode",
          "lambda:GetFunction",
          "lambda:GetFunctionConfiguration"
        ]
        Resource = aws_lambda_function.api.arn
      }
    ]
  })
}
