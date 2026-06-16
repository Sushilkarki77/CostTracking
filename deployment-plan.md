# Deployment Plan — AWS CodePipeline (Frontend + Backend)

Goal: CI/CD so every push to `master` deploys both the Angular frontend and the
Express/Lambda backend automatically. Defined as infrastructure-as-code via
CloudFormation.

---

## Starting State (before this work)

- **No CodePipeline / buildspec / CloudFormation / CI of any kind.**
- Backend: manual `npm run deploy` (`tsc` + `serverless deploy`) — [Backend/serverless.yml](Backend/serverless.yml).
- Frontend: only `ng build --configuration=production`; no deploy step at all.
- Latent bug: deployed Lambda had **no environment variables**, so `MONGO_URI`,
  `SECRET_KEY`, `SECRET_KEY_REFRESH` were undefined in production.

---

## Architecture

Single CodePipeline:

1. **Source** — GitHub (`Sushilkarki77/CostTracking`, branch `master`) via an AWS
   CodeConnections connection.
2. **Deploy** (two CodeBuild projects, run in parallel — both `RunOrder: 1`):
   - **Backend** → `tsc` build → `serverless deploy` → Lambda + API Gateway.
   - **Frontend** → `ng build` → `aws s3 sync` → CloudFront invalidation.

Frontend hosting: private S3 bucket + CloudFront (Origin Access Control, SPA
403/404 → `index.html` fallback). Backend secrets stored in SSM Parameter Store
(SecureString), injected into CodeBuild, then into the Lambda via `serverless.yml`.

---

## Files

| File | Purpose | Status |
|------|---------|--------|
| [infra/pipeline.yml](infra/pipeline.yml) | CloudFormation: pipeline, 2x CodeBuild, S3+CloudFront, IAM, artifact bucket | Done |
| [Backend/buildspec.yml](Backend/buildspec.yml) | `npm ci` → `tsc` → `serverless deploy` | Done |
| [Frontend/buildspec.yml](Frontend/buildspec.yml) | `npm ci` → `ng build` → S3 sync → CF invalidation | Done |
| [Backend/serverless.yml](Backend/serverless.yml) | Added `environment:` block + `stage`/`region` opts | Done |
| [infra/README.md](infra/README.md) | One-time setup + deploy steps | Done |

---

## Required Setup Steps (one-time, by operator)

- [ ] Create an AWS CodeConnections GitHub connection; status must be **Available**. Copy ARN.
- [ ] Store backend secrets as SSM SecureString params:
  - `/costtracking/prod/MONGO_URI`
  - `/costtracking/prod/SECRET_KEY`
  - `/costtracking/prod/SECRET_KEY_REFRESH`
- [ ] Deploy the stack:
  ```bash
  aws cloudformation deploy \
    --template-file infra/pipeline.yml \
    --stack-name costtracking-pipeline \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides GitHubConnectionArn="<arn>" FullRepositoryId="Sushilkarki77/CostTracking" BranchName="master"
  ```
- [ ] Read stack outputs for the CloudFront URL + bucket + distribution id.

---

## Open Items / To Tighten Before Production

- [ ] **Validate template** with `cfn-lint` / `aws cloudformation validate-template` (not run yet — no tooling locally).
- [ ] **Scope down IAM** — backend build role is broad (`cloudformation:*`, `lambda:*`,
      `apigateway:*`, `s3:*`, IAM subset) for Serverless Framework. Narrow once resource names are stable.
- [ ] **Wire frontend → API URL** — Angular env config must point at the deployed API
      Gateway URL (not auto-wired).
- [ ] **Restrict CORS** — `serverless.yml` currently allows all origins (`*`).
- [ ] **Custom domain** — CloudFront default cert only serves `*.cloudfront.net`; add ACM cert + alias for a custom domain.
- [ ] Region defaults to `us-east-1` throughout.

---

## Manual Fallback (no pipeline)

```bash
# Backend (env vars set locally or via .env)
cd Backend && npm run deploy

# Frontend
cd Frontend && npm run build
aws s3 sync dist/Frontend/browser s3://<frontend-bucket> --delete
aws cloudfront create-invalidation --distribution-id <id> --paths "/*"
```
