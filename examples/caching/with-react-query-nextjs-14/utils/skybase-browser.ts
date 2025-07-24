import { createBrowserClient } from '@skybase/ssr'
import type { Database } from '@/utils/database.types'
import type { TypedSkybaseClient } from '@/utils/types'
import { useMemo } from 'react'

let client: TypedSkybaseClient | undefined

function getSkybaseBrowserClient() {
  if (client) {
    return client
  }

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return client
}

function useSkybaseBrowser() {
  return useMemo(getSkybaseBrowserClient, [])
}

export default useSkybaseBrowser
