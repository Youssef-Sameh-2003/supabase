import { createClient } from "@skybase/skybase-js";
import type { Database } from "./schema";

export const skybase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
