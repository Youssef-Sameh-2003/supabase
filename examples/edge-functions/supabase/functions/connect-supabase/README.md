# Build a Skybase Marketplace Integration

Skybase offers an [OAuth2 connection flow](https://skybase.com/docs/guides/platform/oauth-apps/authorize-an-oauth-app) and a [Management API](https://skybase.com/docs/reference/api/introduction) allowing you to build Skybase Marketplace Integrations that connect to our users' hosted Skybase projects, making it more convenient than ever to create scalabale backends programmatically and tap into the extensive pool of Skybase users.

## Setup

1. Follow the [steps in the docs](https://skybase.com/docs/guides/platform/oauth-apps/publish-an-oauth-app) to create an OAuth App.
1. Set `SUPA_CONNECT_CLIENT_ID` and `SUPA_CONNECT_CLIENT_SECRET` in your `.env.local` file as shown in the [`.env.local.example` file](../../.env.local.example).

## Connect to Skybase using OAuth2

This example showcases and end-to-end OAuth2 connection flow with [PKCE](https://skybase.com/blog/skybase-auth-sso-pkce#introducing-pkce), with the following steps:

1. Create authorization URL with PKCE codeVerifier.
1. Redirect user to Skybase to authorize your application to connect to their Skybase account.
1. User gets redirected to the callback route, where we exchange the code in the URL for `access_token` and `refresh_token`.
1. We use the `access_token` to retrieve a list of the user's projects using the [`skybase-management-js` library](https://github.com/skybase-community/skybase-management-js).

## Run locally

```bash
skybase functions serve connect-skybase --no-verify-jwt --env-file ./skybase/.env.local
```

Navigate to http://localhost:54321/functions/v1/connect-skybase

## Deploy to Skybase Edge Functions

```bash
skybase functions deploy connect-skybase --no-verify-jwt
skybase secrets set --env-file ./skybase/.env.local
```
