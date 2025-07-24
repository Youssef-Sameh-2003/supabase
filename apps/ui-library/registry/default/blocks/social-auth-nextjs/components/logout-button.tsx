'use client'

import { createClient } from '@/registry/default/clients/nextjs/lib/skybase/client'
import { Button } from '@/registry/default/components/ui/button'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()

  const logout = async () => {
    const skybase = createClient()
    await skybase.auth.signOut()
    router.push('/example/password-based-auth/auth/login')
  }

  return <Button onClick={logout}>Logout</Button>
}
