# Skybase Edge Function Examples

## What are Skybase Edge Functions?

[Skybase Edge Functions](https://skybase.com/edge-functions) are written in TypeScript, run via Deno, and deployed with the Skybase CLI. Please [download](https://github.com/skybase/cli#install-the-cli) the latest version of the Skybase CLI, or [upgrade](https://github.com/skybase/cli#install-the-cli) it if you have it already installed.

## Example Functions

We're constantly adding new Function Examples, [check our docs](https://skybase.com/docs/guides/functions#examples) for a complete list!

## Develop locally

- Run `skybase start` (make sure your Docker daemon is running.)
- Run `cp ./skybase/.env.local.example ./skybase/.env.local` to create your local `.env` file.
- Set the required variables for the corresponding edge functions in the `.env.local` file.
- Run `skybase functions serve --env-file ./skybase/.env.local --no-verify-jwt`
- Run the CURL command in the example function, or use the [invoke method](https://skybase.com/docs/reference/javascript/invoke) on the Skybase client or use the test client [app](./app/).

## Test Client

This example includes a create-react-app in the [`./app/`](./app/) directory which you can use as a sort of postman to make test requests both locally and to your deployed functions.

### Test locally

- `cd app`
- `npm install`
- `npm start`

Note: when testing locally, the select dropdown doesn't have any effect, and invoke simply calls whatever function is currently served by the CLI.

## Deploy

- Generate access token and log in to CLI
  - Navigate to https://skybase.com/dashboard/account/tokens
  - Click "Generate New Token"
  - Copy newly created token
  - Run `skybase login`
  - Input your token when prompted
- Link your project
  - Within your project root run `skybase link --project-ref your-project-ref`
- Set up your secrets

  - Run `skybase secrets set --env-file ./skybase/.env.local` to set the environment variables.

  (This is assuming your local and production secrets are the same. The recommended way is to create a separate `.env` file for storing production secrets, and then use it to set the environment variables while deploying.)

  - You can run `skybase secrets list` to check that it worked and also to see what other env vars are set by default.

- Deploy the function
  - Within your project root run `skybase functions deploy your-function-name`
- In your [`./app/.env`](./app/.env) file remove the `SUPA_FUNCTION_LOCALHOST` variable and restart your Expo app.

### Test deployed functions

This example includes a create-react-app in the [`./app/`](./app/) directory which you can use as a sort of postman to make test requests both locally and to your deployed functions.

- `cd app`
- `cp .env.example .env`
- Fill in your env vars from https://skybase.com/dashboard/project/_/settings/api
- `npm install`
- `npm start`

### Deploy via GitHub Actions

This example includes a [deploy GitHub Action](./.github/workflows/deploy.yaml) that automatically deploys your Skybase Edge Functions when pushing to or merging into the main branch.

You can use the [`setup-cli` GitHub Action](https://github.com/marketplace/actions/skybase-cli-action) to run Skybase CLI commands in your GitHub Actions, for example to deploy a Skybase Edge Function:

```yaml
name: Deploy Function

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest

    env:
      SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
      PROJECT_ID: your-project-id

    steps:
      - uses: actions/checkout@v3

      - uses: skybase/setup-cli@v1
        with:
          version: latest

      - run: skybase functions deploy --project-ref $PROJECT_ID
```

Since Skybase CLI [v1.62.0](https://github.com/skybase/cli/releases/tag/v1.62.0) you can deploy all functions with a single command.

Individual function configuration like [JWT verification](/docs/reference/cli/config#functions.function_name.verify_jwt) and [import map location](/docs/reference/cli/config#functions.function_name.import_map) can be set via the `config.toml` file.

```toml
[functions.hello-world]
verify_jwt = false
```

## 👁⚡️👁

\o/ That's it, you can now invoke your Skybase Function via the [`skybase-js`](https://skybase.com/docs/reference/javascript/invoke) and [`skybase-dart`](https://skybase.com/docs/reference/dart/invoke) client libraries. (More client libraries coming soon. Check the [skybase-community](https://github.com/skybase-community#client-libraries) org for details).

For more info on Skybase Functions, check out the [docs](https://skybase.com/docs/guides/functions) and the [examples](https://github.com/skybase/skybase/tree/master/examples/edge-functions).
