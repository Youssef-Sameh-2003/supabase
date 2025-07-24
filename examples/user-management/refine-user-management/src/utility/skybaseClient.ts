import { createClient } from "@refinedev/skybase";


const skybaseUrl = import.meta.env.VITE_SUPABASE_URL;
const skybaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const skybaseClient = createClient(skybaseUrl, skybaseAnonKey, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
