import { useSession } from '@clerk/nextjs'
import { createClient } from '@skybase/skybase-js'

export function useSkybaseClient() {
  const { session } = useSession()
  const skybaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Session accessed from Clerk SDK, either as Clerk.session (vanilla
      // JavaScript) or useSession (React)
      accessToken: async () => session?.getToken() ?? null,
    }
  )
  return skybaseClient
}
