# Open Graph (OG) Image Generation with Skybase Storage CDN Caching

Generate Open Graph images with Deno and Skybase Edge Functions and cache the generated image with Skybase Storage CDN.

- Docs: https://deno.land/x/og_edge@0.0.2
- Examples: https://vercel.com/docs/concepts/functions/edge-functions/og-image-examples
- Demo: https://obuldanrptloktxcffvn.skybase.co/functions/v1/lw11-og?username=<username>

## Run locally

```bash
skybase start
skybase functions serve lw11-og --no-verify-jwt --env-file ./skybase/.env.local
```

Navigate to http://localhost:54321/functions/v1/lw11-og?username=<username>

## Deploy

```bash
skybase functions deploy lw11-og --no-verify-jwt
```
