# Read-only references to resources that already exist in this account.
# None of these are created or modified by this Terraform config -- they're
# reused as-is, matching the pattern already established by
# cryptoprism-api / cpio-ai / cryptoprism-app.

data "aws_caller_identity" "current" {}

data "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
}

data "aws_cloudfront_cache_policy" "caching_optimized" {
  name = "Managed-CachingOptimized"
}
