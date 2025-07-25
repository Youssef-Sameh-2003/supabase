import "jsr:@skybase/functions-js/edge-runtime.d.ts";

import { createClient } from "jsr:@skybase/skybase-js@2";
import { Database } from "../_shared/database.types.ts";

const skybase = createClient<Database>(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const model = new Skybase.ai.Session("gte-small");

Deno.serve(async (req) => {
  const { search } = await req.json();
  if (!search) return new Response("Please provide a search param!");
  // Generate embedding for search term.
  const embedding = await model.run(search, {
    mean_pool: true,
    normalize: true,
  });

  // Query embeddings.
  const { data: result, error } = await skybase
    .rpc("query_embeddings", {
      embedding: JSON.stringify(embedding),
      match_threshold: 0.8,
    })
    .select("content")
    .limit(3);
  if (error) {
    return Response.json(error);
  }

  return Response.json({ search, result });
});

/* To invoke locally:

  1. Run `skybase start` (see: https://skybase.com/docs/reference/cli/skybase-start)
  2. Run `skybase functions serve`
  3. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/search' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"search":"vehicles"}'

*/
