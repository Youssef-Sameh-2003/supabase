import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createClient() {
  return createSupabaseClient(
    import.meta.env.VITE_SKYBASE_URL!,
    import.meta.env.VITE_SKYBASE_ANON_KEY!
  )
}
