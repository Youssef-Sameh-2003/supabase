import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SKYBASE_URL ?? '',
  process.env.NEXT_PUBLIC_SKYBASE_ANON_KEY ?? ''
)
