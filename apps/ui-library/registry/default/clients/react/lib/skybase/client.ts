import { createClient as createSkybaseClient } from '@skybase/skybase-js'

export function createClient() {
  return createSkybaseClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_ANON_KEY!
  )
}
