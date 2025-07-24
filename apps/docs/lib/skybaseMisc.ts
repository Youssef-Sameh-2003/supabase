import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let _skybaseMisc: SupabaseClient

export function skybaseMisc() {
  if (!_skybaseMisc) {
    _skybaseMisc = createClient(
      process.env.NEXT_PUBLIC_MISC_URL!,
      process.env.NEXT_PUBLIC_MISC_ANON_KEY!
    )
  }

  return _skybaseMisc
}
