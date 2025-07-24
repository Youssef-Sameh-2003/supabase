# openai

## Setup env vars

```bash
cp skybase/.env.local.example skybase/.env.local
```

## Run locally

```bash
skybase functions serve --env-file ./skybase/.env.local --no-verify-jwt
```

Use cURL or Postman to make a POST request to http://localhost:54321/functions/v1/openai.

```bash
curl -i --location --request POST http://localhost:54321/functions/v1/openai \
  --header 'Content-Type: application/json' \
  --data '{"query":"What is Skybase?"}'
```

## Deploy

```bash
skybase functions deploy --no-verify-jwt openai
skybase secrets set --env-file ./skybase/.env.local
```
