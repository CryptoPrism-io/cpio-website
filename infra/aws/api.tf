# Early-access signup API (functions/index.js). Originally planned as a
# 3rd App Runner service to match cryptoprism-api/cpio-ai, but this AWS
# account is restricted to 2 App Runner services per region (both slots
# already used) -- lifting that needs an AWS Support request, not a
# self-service quota bump. Pivoted to Lambda + API Gateway HTTP API
# instead: no per-region service-count wall, and it's a better fit anyway
# for an endpoint rate-limited to 5 req/15min (true pay-per-request, no
# idle cost).
#
# The DB secret (/cryptoprism/website/DATABASE_URL) was created directly
# via the AWS CLI, not by this Terraform config -- see api.tf's sibling
# note in MIGRATION_GUIDE.md. It holds the DSN for a least-privilege
# `website_api` Postgres role on dbcp-aws, scoped to SELECT/INSERT on
# public.early_access_signups only.

data "aws_secretsmanager_secret" "website_api_db" {
  name = "/cryptoprism/website/DATABASE_URL"
}

data "archive_file" "api_lambda" {
  type        = "zip"
  source_dir  = "${path.module}/../../functions"
  output_path = "${path.module}/.build/api-lambda.zip"
  excludes    = ["Dockerfile"]
}

# Per-IP rate limiting (5 req / 15 min), re-implemented statelessly since
# Lambda has no long-lived process to hold an in-memory counter across
# invocations. TTL auto-expires old window entries.
resource "aws_dynamodb_table" "rate_limit" {
  name         = "cryptoprism-website-api-ratelimit"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "pk"

  attribute {
    name = "pk"
    type = "S"
  }

  ttl {
    attribute_name = "expiresAt"
    enabled        = true
  }
}

resource "aws_iam_role" "api_lambda" {
  name = "cryptoprism-website-api-lambda"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Action    = "sts:AssumeRole"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "api_lambda_basic_logs" {
  role       = aws_iam_role.api_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "api_lambda" {
  name = "api-lambda-policy"
  role = aws_iam_role.api_lambda.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid      = "ReadDbSecret"
        Effect   = "Allow"
        Action   = "secretsmanager:GetSecretValue"
        Resource = data.aws_secretsmanager_secret.website_api_db.arn
      },
      {
        Sid      = "RateLimitTable"
        Effect   = "Allow"
        Action   = "dynamodb:UpdateItem"
        Resource = aws_dynamodb_table.rate_limit.arn
      }
    ]
  })
}

resource "aws_lambda_function" "api" {
  function_name    = var.api_service_name
  role             = aws_iam_role.api_lambda.arn
  handler          = "index.handler"
  runtime          = "nodejs20.x"
  filename         = data.archive_file.api_lambda.output_path
  source_code_hash = data.archive_file.api_lambda.output_base64sha256
  memory_size      = 128
  timeout          = 10

  environment {
    variables = {
      # Lambda env vars can't reference Secrets Manager directly the way
      # App Runner's runtime_environment_secrets can -- passing the ARN
      # here, the handler fetches + caches the actual DSN from Secrets
      # Manager itself at cold start (see getDatabaseUrl() in index.js).
      DATABASE_URL_SECRET_ARN = data.aws_secretsmanager_secret.website_api_db.arn
      RATE_LIMIT_TABLE        = aws_dynamodb_table.rate_limit.name
    }
  }
}

resource "aws_apigatewayv2_api" "api" {
  name          = var.api_service_name
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["https://cryptoprism.io", "https://www.cryptoprism.io"]
    allow_methods = ["GET", "POST"]
    allow_headers = ["content-type"]
  }
}

resource "aws_apigatewayv2_integration" "api" {
  api_id                 = aws_apigatewayv2_api.api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.api.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "health" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /health"
  target    = "integrations/${aws_apigatewayv2_integration.api.id}"
}

resource "aws_apigatewayv2_route" "early_access" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "POST /api/early-access"
  target    = "integrations/${aws_apigatewayv2_integration.api.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = "$default"
  auto_deploy = true

  # Coarse account-wide throttle as a backstop above the DynamoDB per-IP
  # limit -- not a substitute for it, just a ceiling against a genuine
  # flood.
  default_route_settings {
    throttling_rate_limit  = 10
    throttling_burst_limit = 20
  }
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}
