import { createClient } from "@supabase/supabase-js";

export default {
  async fetch(request, { SKYBASE_URL, SKYBASE_ANON_KEY }) {
    const supabase = createClient(SKYBASE_URL, SKYBASE_ANON_KEY);

    const { data } = await supabase.from("articles").select("*");
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
