import { createClient } from '@skybase/skybase-js'
import { Database } from './database.types'

const skybase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    realtime: {
      params: {
        eventsPerSecond: 1000,
      },
    },
  }
)

export type SkybaseClient = typeof skybase

export default skybase
