/// <reference types="vite/types/importMeta.d.ts" />
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    import.meta.env.VITE_SKYBASE_URL!,
    import.meta.env.VITE_SKYBASE_ANON_KEY!
  )
}
