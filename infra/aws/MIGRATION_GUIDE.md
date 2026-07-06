# Migrating cryptoprism.io off Firebase/GCP to AWS

## Status: infra live, only DNS cutover remains

| Piece | GCP (old) | AWS (now) |
|---|---|---|
| Database | Cloud SQL | **Migrated.** RDS `dbcp-aws` (Postgres), tagged `MigratedFrom: gcp-cloudsql-dbcp`. `early_access_signups` (6 real rows) already lived in the `dbcp` database. |
| Dashboard (`app.cryptoprism.io`) | Firebase Hosting | Already migrated before this session. S3 `cryptoprism-app-prod` + CloudFront, `gha-cryptoprism-app-deploy` (GitHub OIDC). |
| Main backend (`cryptoprism-api`) | Cloud Run | Already migrated before this session. ECR + App Runner, secrets in `/cryptoprism/api/*`. |
| **Marketing site (`cryptoprism.io`, this repo)** | Firebase Hosting | **Live on AWS**, verified working via the CloudFront domain directly. Only the final DNS cutover (Step 6 below) is left. |
| **Signup API (`functions/`)** | Cloud Run (billing lapsed, was down) | **Live on AWS as Lambda + API Gateway** — not App Runner as originally planned, see below. Verified end-to-end with a real throwaway signup (created, confirmed, deleted). |

## What actually happened, in order

1. **ACM cert requested and validated.** Added the two DNS validation CNAMEs at Dynadot together, live. Cert is `ISSUED`.
2. **S3 + CloudFront + IAM roles applied successfully** on the first full apply — no issues.
3. **App Runner hit an account wall.** This AWS account is restricted to 2 App Runner services per region (`cryptoprism-api` and `cpio-ai` already use both slots) — `CreateService` failed with `InvalidRequestException: ... restricted ... contact the AWS support team`. Not a self-service quota; genuinely blocked.
4. **Pivoted to Lambda + API Gateway HTTP API instead of filing an AWS Support ticket.** Better fit anyway for an endpoint this small (true pay-per-request, no idle cost, no per-region service-count wall). This meant:
   - Rewrote `functions/index.js` from an Express app to a plain Lambda handler (`exports.handler`). Removed `express`, `cors`, `express-rate-limit` from `functions/package.json` — down to just `pg`.
   - **Rate limiting moved to DynamoDB** (`cryptoprism-website-api-ratelimit` table, pay-per-request, TTL-expired). Lambda has no long-lived process to hold `express-rate-limit`'s in-memory counter across invocations, so this re-implements the same 5-req/15-min-per-IP policy statelessly.
   - CORS moved to API Gateway's native `cors_configuration` (was the `cors` npm package).
   - `DATABASE_URL` is no longer a plain Lambda env var (Lambda can't reference Secrets Manager directly the way App Runner's `runtime_environment_secrets` could) — the handler fetches + caches it from Secrets Manager at cold start instead (`getDatabaseUrl()` in `index.js`).
   - Deleted the ECR repo created for the abandoned App Runner path (`aws ecr delete-repository --force`) and removed it from Terraform state.
5. **Found and fixed two real bugs while testing the actual write path** (not caught by the earlier health-check/honeypot/400 tests, which never touch the DB):
   - The DSN stored in Secrets Manager had `?sslmode=require`, which forces `pg` into strict certificate verification regardless of the code's explicit `ssl: { rejectUnauthorized: false }` — this would have failed on every real signup. Fixed by stripping the query param from the stored secret.
   - The `website_api` Postgres role had `INSERT`/`SELECT` on the table but not `USAGE` on `early_access_signups_id_seq` — Postgres requires sequence privileges separately for auto-increment columns. Fixed with `GRANT USAGE, SELECT ON SEQUENCE ... TO website_api`.
   - Verified the fix with a real throwaway signup (unique `@example.invalid` email), confirmed success + row count, then deleted that row — production data is back to exactly 6 real rows.
6. **Added a CloudFront Response Headers Policy** — the existing `app.cryptoprism.io` distribution has none, but this specific site had CSP/HSTS/X-Frame-Options/etc. deliberately added to Firebase Hosting earlier in this session (a real hardening pass), so those are carried forward here rather than silently dropped on cutover.
7. **Built and synced the actual site** to `cryptoprism-io-prod`, verified via `https://<cloudfront-domain>/` directly: loads cleanly, correct security headers present, no console errors. (The signup form itself can't be exercised from the CloudFront preview domain — API Gateway's CORS is intentionally locked to `https://cryptoprism.io`/`https://www.cryptoprism.io`, so a browser test from the preview domain gets a CORS error. That's correct behavior, not a bug — the direct `curl` test already proved the backend works.)

## What's left

### Step 5 — First deploy via the real GitHub Actions workflow

`deploy-aws.yml` is `workflow_dispatch`-only right now so it can't fail on every push before DNS has cut over. Trigger it manually once to confirm CI can do everything that was just done by hand:
```
gh workflow run deploy-aws.yml
```
Watch both jobs (`deploy-website`, `deploy-api`) succeed.

### Step 6 — Cut over DNS at Dynadot (the point of no return for this migration)

`terraform output cloudfront_domain_name` gives the CloudFront domain (`df9suya9swt9c.cloudfront.net` as of this apply). At Dynadot:
- Apex `cryptoprism.io`: check the panel for an ALIAS/ANAME option first. If unavailable, the practical choice is migrating DNS hosting for this domain to Route53 — a bigger, separate step, flag before doing it (changes where `cryptoprism.io`'s nameservers point, same class of action as the earlier GCP DNS fix).
- `www.cryptoprism.io`: straightforward CNAME to the CloudFront domain, no apex complication.

**Do this together, live, the same way the GCP DNS record was fixed** — not something to script blind. Verify with multi-resolver `nslookup` + a real browser load before and after.

### Step 7 — Retire GCP

Once DNS has propagated and cryptoprism.io is confirmed serving from CloudFront:
- Change `deploy-aws.yml`'s trigger to `push: branches: [main]`.
- Delete or disable `.github/workflows/firebase-deploy.yml`.
- Decide whether to delete the Firebase Hosting site / GCP project entirely, or leave it dormant as a rollback path for a while first (Firebase Hosting doesn't need billing to keep serving, so there's no cost pressure to rush this).

## Rollback

Nothing here is destructive to the GCP side until Step 7. Firebase Hosting keeps serving cryptoprism.io right up until the DNS cutover in Step 6 — if anything looks wrong after cutover, revert the DNS record and you're back on the old setup within propagation time.
