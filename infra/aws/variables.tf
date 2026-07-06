variable "aws_region" {
  description = "AWS region for all resources (CloudFront/ACM certs must be us-east-1 regardless)"
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Primary apex domain for the marketing site"
  type        = string
  default     = "cryptoprism.io"
}

variable "www_domain_name" {
  description = "www alias for the marketing site"
  type        = string
  default     = "www.cryptoprism.io"
}

variable "github_repo" {
  description = "GitHub repo (org/name) allowed to assume the deploy roles via OIDC"
  type        = string
  default     = "CryptoPrism-io/cpio-website"
}

variable "github_branch" {
  description = "Branch allowed to assume the deploy roles via OIDC"
  type        = string
  default     = "main"
}

variable "website_bucket_name" {
  description = "S3 bucket name for the built marketing site (must be globally unique)"
  type        = string
  default     = "cryptoprism-io-prod"
}

variable "api_service_name" {
  description = "Name for the Lambda function + API Gateway HTTP API hosting the early-access signup API"
  type        = string
  default     = "cryptoprism-website-api"
}
