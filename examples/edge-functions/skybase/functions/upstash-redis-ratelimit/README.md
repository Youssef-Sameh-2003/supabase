# Rate limiting with Upstash Redis in Skybase Edge Functions

[Redis](https://redis.io/docs/about/) is an open source (BSD licensed), in-memory data structure store used as a database, cache, message broker, and streaming engine. It is optimized for atomic operations like incrementing a value, for example for a view counter or rate limiting. We can even rate limit based on the user ID from Skybase Auth!

[Upstash](https://upstash.com/) provides an HTTP/REST based Redis client which is ideal for serverless use-cases and therefore works well with Skybase Edge Functions.

## Redis database setup

Create a Redis database using the [Upstash Console](https://console.upstash.com/) or [Upstash CLI](https://github.com/upstash/cli).

Select the `Global` type to minimize the latency from all edge locations. Copy the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to your .env file. You'll find them under **Details > REST API > .env**.

```bash
cp skybase/.env.local.example skybase/.env.local
```

## Run locally

Make sure you have the latest version of the [Skybase CLI installed](https://skybase.com/docs/guides/cli#installation).

```bash
skybase start
skybase functions serve --env-file skybase/.env.local
```

Navigate to http://localhost:54321/functions/v1/upstash-redis-ratelimit.

## Deploy

```bash
skybase functions deploy upstash-redis-ratelimit
skybase secrets set --env-file skybase/.env.local
```
