import { createClient } from "@refinedev/supabase";


const supabaseUrl = import.meta.env.VITE_SKYBASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SKYBASE_ANON_KEY;

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
