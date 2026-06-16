# Deployment — AWS CodePipeline

This sets up a single AWS CodePipeline that, on every push to `master`, runs two
CodeBuild jobs **in parallel**:

| Job | Buildspec | What it does |
|-----|-----------|--------------|
| Backend | [`Backend/buildspec.yml`](../Backend/buildspec.yml) | `tsc` build → `serverless deploy` → Lambda + API Gateway |
| Frontend | [`Frontend/buildspec.yml`](../Frontend/buildspec.yml) | `ng build` → S3 sync → CloudFront invalidation |

The pipeline, build projects, frontend S3 bucket, CloudFront distribution, and
IAM roles are all defined in [`pipeline.yml`](./pipeline.yml).

---

## One-time setup

### 1. Create a GitHub connection
In the AWS console: **Developer Tools → Settings → Connections → Create connection**,
choose GitHub, authorize it, and finish so the status is **Available**. Copy the
connection ARN.

### 2. Store backend secrets in SSM Parameter Store
The backend Lambda needs `MONGO_URI`, `SECRET_KEY`, and `SECRET_KEY_REFRESH`.
Store them as SecureString parameters (names must match the template params):

```bash
aws ssm put-parameter --name /costtracking/prod/MONGO_URI          --type SecureString --value "mongodb+srv://..."
aws ssm put-parameter --name /costtracking/prod/SECRET_KEY         --type SecureString --value "your-jwt-secret"
aws ssm put-parameter --name /costtracking/prod/SECRET_KEY_REFRESH --type SecureString --value "your-refresh-secret"
```

### 3. Deploy the pipeline stack
```bash
aws cloudformation deploy \
  --template-file infra/pipeline.yml \
  --stack-name costtracking-pipeline \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
      GitHubConnectionArn="arn:aws:codeconnections:us-east-1:<acct>:connection/<id>" \
      FullRepositoryId="Sushilkarki77/CostTracking" \
      BranchName="master"
```

Get the live frontend URL after it completes:
```bash
aws cloudformation describe-stacks --stack-name costtracking-pipeline \
  --query "Stacks[0].Outputs"
```

---

## How it runs

- Push to `master` → the **Source** stage pulls the repo through the GitHub connection.
- The **Deploy** stage runs `DeployBackend` and `DeployFrontend` concurrently
  (both `RunOrder: 1`).
- Backend secrets are injected into CodeBuild from SSM (`PARAMETER_STORE`), then
  passed into the Lambda by [`Backend/serverless.yml`](../Backend/serverless.yml)
  via `${env:...}`.

## Manual deploy (no pipeline)

You can still deploy by hand:

```bash
# Backend (needs env vars set locally or in .env)
cd Backend && npm run deploy

# Frontend
cd Frontend && npm run build
aws s3 sync dist/Frontend/browser s3://<frontend-bucket> --delete
aws cloudfront create-invalidation --distribution-id <id> --paths "/*"
```

---

## Notes / things to tighten before production

- **IAM is broad.** The backend build role grants wide permissions (`cloudformation:*`,
  `lambda:*`, `apigateway:*`, `s3:*`, `iam:*` subset) because the Serverless Framework
  provisions a full stack. Scope these down once your resource names are stable.
- **Region.** Everything defaults to `us-east-1` (matches `serverless.yml`). CloudFront
  default cert only serves the `*.cloudfront.net` domain — add an ACM cert + alias for a
  custom domain.
- **CORS.** `serverless.yml` allows all origins (`*`). Restrict to your CloudFront domain
  for production.
- **API URL.** The frontend must point at the deployed API Gateway URL. Set that in the
  Angular environment config (it is not auto-wired here).
