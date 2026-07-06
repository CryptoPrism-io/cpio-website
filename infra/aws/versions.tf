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

  # No remote backend configured yet -- state defaults to local
  # terraform.tfstate in this directory. This account has no pre-existing
  # Terraform state (everything else was provisioned via CLI/console), so
  # there's nothing to import here. Before running this in CI, move state
  # to an S3 backend (e.g. a new `cryptoprism-tfstate` bucket) -- do not
  # apply from a laptop as the long-term source of truth.
}

provider "aws" {
  region = var.aws_region
}
