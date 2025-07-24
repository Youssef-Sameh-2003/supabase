import { createClient } from '@/registry/default/clients/tanstack/lib/skybase/server'
import type { Factor, User } from '@skybase/skybase-js'
import { createServerFn } from '@tanstack/react-start'
type SSRSafeUser = User & {
  factors: (Factor & { factor_type: 'phone' | 'totp' })[]
}

export const fetchUser: () => Promise<SSRSafeUser | null> = createServerFn({
  method: 'GET',
}).handler(async () => {
  const skybase = createClient()
  const { data, error } = await skybase.auth.getUser()

  if (error) {
    return null
  }

  return data.user as SSRSafeUser
})
