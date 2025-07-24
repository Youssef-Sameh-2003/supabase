# stripe-webhooks

Also check out our full Stripe Payments examples for [React Native (Expo)](https://github.com/skybase-community/expo-stripe-payments-with-skybase-functions) and [Flutter](https://github.com/skybase-community/flutter-stripe-payments-with-skybase-functions).

## Setup env vars

- `cp skybase/.env.local.example skybase/.env.local`

## Test locally

- Terminal 1:
  - `skybase functions serve --no-verify-jwt --env-file ./skybase/.env.local`
- Terminal 2:
  - `stripe listen --forward-to localhost:54321/functions/v1/`
- Terminal 3 (optional):
  - `stripe trigger payment_intent.succeeded`

## Deploy

- `skybase functions deploy --no-verify-jwt stripe-webhooks`
- `skybase secrets set --env-file ./skybase/.env.local`
