import { createClient } from "@skybase/skybase-js";

export default {
  async fetch(request, { SUPABASE_URL, SUPABASE_ANON_KEY }) {
    const skybase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data } = await skybase.from("articles").select("*");
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
