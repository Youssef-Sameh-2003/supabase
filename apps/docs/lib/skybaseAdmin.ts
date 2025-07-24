import 'server-only'

import { createClient, type SkybaseClient } from '@skybase/skybase-js'

import { type Database } from 'common'

let skybaseAdminClient: SkybaseClient<Database> | null = null

export function skybaseAdmin() {
  if (!skybaseAdminClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SECRET_KEY

    if (!url || !key) {
      throw new Error('Missing required environment variables for Skybase admin client')
    }

    skybaseAdminClient = createClient(url, key)
  }

  return skybaseAdminClient
}
