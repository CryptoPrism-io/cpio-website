const { Client } = require("pg");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

// Lambda handler behind API Gateway HTTP API (payload format 2.0). CORS is
// handled by the API Gateway's cors_configuration, not here.
//
// Rate limiting: Lambda is stateless across invocations, so the in-memory
// express-rate-limit approach used when this ran on a long-lived container
// doesn't work here. Limits are enforced via a small DynamoDB table
// (RATE_LIMIT_TABLE), keyed by <ip>#<15-min-window-bucket>, atomically
// incremented per request -- same 5-requests/15-minutes-per-IP policy as
// before, just re-implemented for a stateless runtime.

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const RATE_LIMIT_TABLE = process.env.RATE_LIMIT_TABLE;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validExperiences = ["beginner", "intermediate", "advanced", "professional"];

function json(statusCode, body) {
  return { statusCode, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) };
}

// Fetched once per warm Lambda instance, not per invocation -- avoids a
// Secrets Manager call on every request while still never putting the
// DSN in a plain environment variable.
const secretsClient = new SecretsManagerClient({});
let cachedDatabaseUrl = null;
async function getDatabaseUrl() {
  if (cachedDatabaseUrl) return cachedDatabaseUrl;
  const res = await secretsClient.send(
    new GetSecretValueCommand({ SecretId: process.env.DATABASE_URL_SECRET_ARN })
  );
  cachedDatabaseUrl = res.SecretString;
  return cachedDatabaseUrl;
}

async function checkRateLimit(ip) {
  const windowBucket = Math.floor(Date.now() / RATE_LIMIT_WINDOW_MS);
  const pk = `${ip}#${windowBucket}`;
  const expiresAt = Math.floor(Date.now() / 1000) + Math.ceil(RATE_LIMIT_WINDOW_MS / 1000) + 60;

  const result = await ddb.send(
    new UpdateCommand({
      TableName: RATE_LIMIT_TABLE,
      Key: { pk },
      UpdateExpression: "SET #c = if_not_exists(#c, :zero) + :incr, expiresAt = :expiresAt",
      ExpressionAttributeNames: { "#c": "count" },
      ExpressionAttributeValues: { ":incr": 1, ":zero": 0, ":expiresAt": expiresAt },
      ReturnValues: "UPDATED_NEW",
    })
  );

  return result.Attributes.count <= RATE_LIMIT_MAX;
}

exports.handler = async (event) => {
  const path = event.rawPath || event.requestContext?.http?.path;
  const method = event.requestContext?.http?.method;

  if (path === "/health" && method === "GET") {
    return json(200, { status: "ok" });
  }

  if (!(path === "/api/early-access" && method === "POST")) {
    return json(404, { error: "Not found" });
  }

  const sourceIp = event.requestContext?.http?.sourceIp || "unknown";
  const withinLimit = await checkRateLimit(sourceIp);
  if (!withinLimit) {
    return json(429, { error: "Too many requests. Please try again later." });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON body" });
  }

  const { name, email, experience } = payload;

  // Honeypot: the frontend form includes a hidden field named "website"
  // that real users never see or fill in. If it's present and non-empty,
  // treat the submission as a bot and silently discard it.
  const honeypot = payload.website;
  if (honeypot && String(honeypot).trim() !== "") {
    return json(200, { success: true, message: "You're on the list!", isNew: true });
  }

  if (!name || !email || !experience) {
    return json(400, { error: "Missing required fields: name, email, experience" });
  }
  if (!emailRegex.test(email)) {
    return json(400, { error: "Invalid email format" });
  }
  if (!validExperiences.includes(experience)) {
    return json(400, { error: "Invalid experience level" });
  }

  const client = new Client({
    connectionString: await getDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
  });

  try {
    await client.connect();
    const result = await client.query(
      `INSERT INTO early_access_signups (full_name, email, trading_experience, source)
       VALUES ($1, $2, $3, 'website')
       ON CONFLICT (email) DO NOTHING
       RETURNING id`,
      [name.trim(), email.trim().toLowerCase(), experience]
    );

    const isNew = result.rowCount > 0;
    return json(200, {
      success: true,
      message: isNew ? "You're on the list!" : "You're already signed up!",
      isNew,
    });
  } catch (err) {
    console.error("DB insert error:", err);
    return json(500, { error: "Internal server error" });
  } finally {
    await client.end().catch(() => {});
  }
};
