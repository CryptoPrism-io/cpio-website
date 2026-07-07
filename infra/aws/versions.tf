terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.4"
    }
  }

  # S3 bucket created directly via AWS CLI, not by this config -- backend
  # infrastructure shouldn't be managed by the state it holds (avoids a
  # `terraform destroy` being able to delete the bucket out from under
  # itself). Locking uses S3's native lockfile support (Terraform 1.10+),
  # not a DynamoDB table -- no separate lock table needed.
  backend "s3" {
    bucket       = "cryptoprism-tfstate"
    key          = "aws/terraform.tfstate"
    region       = "us-east-1"
    use_lockfile = true
    encrypt      = true
  }
}

provider "aws" {
  region = var.aws_region
}
