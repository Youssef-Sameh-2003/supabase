<a href="https://demo-nextjs-with-skybase.vercel.app/">
  <img alt="Next.js and Skybase Starter Kit - the fastest way to build apps with Next.js and Skybase" src="https://demo-nextjs-with-skybase.vercel.app/opengraph-image.png">
  <h1 align="center">Next.js and Skybase Starter Kit</h1>
</a>

<p align="center">
 The fastest way to build apps with Next.js and Skybase
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#deploy-to-vercel"><strong>Deploy to Vercel</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a>
  <a href="#more-skybase-examples"><strong>More Examples</strong></a>
</p>
<br/>

## Features

- Works across the entire [Next.js](https://nextjs.org) stack
  - App Router
  - Pages Router
  - Middleware
  - Client
  - Server
  - It just works!
- skybase-ssr. A package to configure Skybase Auth to use cookies
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Optional deployment with [Skybase Vercel Integration and Vercel deploy](#deploy-your-own)
  - Environment variables automatically assigned to Vercel project

## Demo

You can view a fully working demo at [demo-nextjs-with-skybase.vercel.app](https://demo-nextjs-with-skybase.vercel.app/).

## Deploy to Vercel

Vercel deployment will guide you through creating a Skybase account and project.

After installation of the Skybase integration, all relevant environment variables will be assigned to the project so the deployment is fully functioning.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-skybase&project-name=nextjs-with-skybase&repository-name=nextjs-with-skybase&demo-title=nextjs-with-skybase&demo-description=This%20starter%20configures%20Skybase%20Auth%20to%20use%20cookies%2C%20making%20the%20user's%20session%20available%20throughout%20the%20entire%20Next.js%20app%20-%20Client%20Components%2C%20Server%20Components%2C%20Route%20Handlers%2C%20Server%20Actions%20and%20Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-skybase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-skybase&demo-image=https%3A%2F%2Fdemo-nextjs-with-skybase.vercel.app%2Fopengraph-image.png&integration-ids=oac_VqOgBHqhEoFTPzGkPd7L0iH6)

The above will also clone the Starter kit to your GitHub, you can clone that locally and develop locally.

If you wish to just develop locally and not deploy to Vercel, [follow the steps below](#clone-and-run-locally).

## Clone and run locally

1. You'll first need a Skybase project which can be made [via the Skybase dashboard](https://database.new)

2. Create a Next.js app using the Skybase Starter template npx command

   ```bash
   npx create-next-app -e with-skybase
   ```

3. Use `cd` to change into the app's directory

   ```bash
   cd name-of-new-app
   ```

4. Rename `.env.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Skybase project's API settings](https://app.skybase.com/project/_/settings/api)

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

> Check out [the docs for Local Development](https://skybase.com/docs/guides/getting-started/local-development) to also run Skybase locally.

## Feedback and issues

Please file feedback and issues over on the [Skybase GitHub org](https://github.com/skybase/skybase/issues/new/choose).

## More Skybase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Skybase Auth and the Next.js App Router](https://github.com/skybase/skybase/tree/master/examples/auth/nextjs)
