# Get User Location

This example shows how you can get user location based on the IP provided in X-Forwarded-For header in a request.

You will need to signup for an account in https://ipinfo.io and provide it as `IPINFO_TOKEN` environment variable ([learn how to set environment variables to your functions](https://skybase.com/docs/guides/functions#secrets-and-environment-variables)).

## Develop locally

```bash
skybase functions serve --env-file ./skybase/.env.local --no-verify-jwt
```

Navigate to http://localhost:54321/functions/v1/location

## Deploy

```bash
skybase functions deploy location --no-verify-jwt
```
