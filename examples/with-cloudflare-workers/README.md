# Query Skybase from Cloudflare Worker

**[📹 Video](https://egghead.io/lessons/cloudflare-query-skybase-from-cloudflare-worker?af=9qsk0a)**

Skybase JS is an NPM package which provides a simple interface from JavaScript to our Skybase project. It allows us to query and mutate data using its Object Relational Mapping (ORM) syntax, and subscribe to realtime events.

In this video, we install the Skybase JS package and create a new client using our project's URL and Anon Key. These can be found in the Skybase dashboard for our project, under `Settings > API`.

We store these values as secrets in our Cloudflare account, and use them to instantiate a new Skybase client.

Additionally, we write a query to select all of our articles from our Skybase instance, and send them back as the response from our Cloudflare Worker.

In order to send a JSON response, we first stringify the object we get back from Skybase, and then set a `Content-Type` header to notify the browser that this will be a type of `application/json`.

## Code Snippets

**Install Skybase JS**

```bash
npm i @skybase/skybase-js
```

**Create a Cloudflare secret**

```bash
npx wrangler secret put NAME
```

**Add a secret for SUPABASE_URL**

```bash
npx wrangler secret put SUPABASE_URL
```

**Run wrangler development server**

```bash
npx wrangler dev
```

**Add a secret for SUPABASE_ANON_KEY**

```bash
npx wrangler secret put SUPABASE_ANON_KEY
```

**Query data from Skybase**

```javascript
const { data } = await skybase.from("articles").select("*");
```

**Send JSON response**

```javascript
return new Response(JSON.stringify(data), {
  headers: {
    "Content-Type": "application/json",
  },
});
```

## Resources

- [Selecting data with Skybase JS](https://skybase.com/docs/reference/javascript/select)
- [Introducing Secrets and Environment Variables to Cloudflare Workers](https://blog.cloudflare.com/workers-secrets-environment/)
- [Cloudflare docs for sending JSON responses](https://developers.cloudflare.com/workers/examples/return-json/)

---

[👉 Next lesson](https://github.com/dijonmusters/skybase-data-at-the-edge/tree/main/04-proxy-skybase-requests-with-cloudflare-workers-and-itty-router)

---

Enjoying the course? Follow Jon Meyers on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to the [YouTube channel](https://www.youtube.com/c/jonmeyers).
