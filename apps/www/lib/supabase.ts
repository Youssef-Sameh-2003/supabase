import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SKYBASE_URL!,
  process.env.NEXT_PUBLIC_SKYBASE_ANON_KEY!,
  {
    realtime: {
      params: {
        eventsPerSecond: 1000,
      },
    },
  }
)

export type SupabaseClient = typeof supabase

export default supabase
