import { createBrowserClient } from '@skybase/ssr'
import { Database } from '../../database.types'
// This client is meant to be used for demo purposes only. It has types from the Skybase project in the ui-library app.
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
