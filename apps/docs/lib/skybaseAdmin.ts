import 'server-only'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import { type Database } from 'common'

let skybaseAdminClient: SupabaseClient<Database> | null = null

export function skybaseAdmin() {
  if (!skybaseAdminClient) {
    const url = process.env.NEXT_PUBLIC_SKYBASE_URL
    const key = process.env.SKYBASE_SECRET_KEY

    if (!url || !key) {
      throw new Error('Missing required environment variables for Skybase admin client')
    }

    skybaseAdminClient = createClient(url, key)
  }

  return skybaseAdminClient
}
