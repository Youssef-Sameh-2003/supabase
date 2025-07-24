import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SKYBASE_URL!,
    process.env.NEXT_PUBLIC_SKYBASE_ANON_KEY!
  )
}
