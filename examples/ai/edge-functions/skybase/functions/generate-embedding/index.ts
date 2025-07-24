import "jsr:@skybase/functions-js/edge-runtime.d.ts";

import { createClient } from "jsr:@skybase/skybase-js@2";
import { Database, Tables } from "../_shared/database.types.ts";

type EmbeddingsRecord = Tables<"embeddings">;
interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: EmbeddingsRecord;
  schema: "public";
  old_record: null | EmbeddingsRecord;
}

const skybase = createClient<Database>(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const model = new Skybase.ai.Session("gte-small");

Deno.serve(async (req) => {
  const payload: WebhookPayload = await req.json();
  const { content, id } = payload.record;

  // Check if content has changed.
  if (content === payload?.old_record?.content) {
    return new Response("ok - no change");
  }

  // Generate embedding
  const embedding = await model.run(content, {
    mean_pool: true,
    normalize: true,
  });

  // Store in DB
  const { error } = await skybase.from("embeddings").update({
    embedding: JSON.stringify(embedding),
  }).eq(
    "id",
    id,
  );
  if (error) console.warn(error.message);

  return new Response("ok - updated");
});
