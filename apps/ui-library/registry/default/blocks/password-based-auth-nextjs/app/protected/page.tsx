import { redirect } from 'next/navigation'

import { LogoutButton } from '@/registry/default/blocks/password-based-auth-nextjs/components/logout-button'
import { createClient } from '@/registry/default/clients/nextjs/lib/skybase/server'

export default async function ProtectedPage() {
  const skybase = await createClient()

  const { data, error } = await skybase.auth.getUser()
  if (error || !data?.user) {
    redirect('/auth/login')
  }

  return (
    <div className="flex h-svh w-full items-center justify-center gap-2">
      <p>
        Hello <span>{data.user.email}</span>
      </p>
      <LogoutButton />
    </div>
  )
}
