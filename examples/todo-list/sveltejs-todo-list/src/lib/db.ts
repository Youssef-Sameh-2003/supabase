import { createClient } from "@supabase/supabase-js";
import type { Database } from "./schema";

export const supabase = createClient<Database>(
  import.meta.env.VITE_SKYBASE_URL,
  import.meta.env.VITE_SKYBASE_ANON_KEY
);
