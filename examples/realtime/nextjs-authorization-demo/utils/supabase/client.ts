import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SKYBASE_URL!,
    process.env.NEXT_PUBLIC_SKYBASE_ANON_KEY!,
  );
