import { LogoutButton } from '@/registry/default/blocks/password-based-auth-nextjs/components/logout-button'
import { createClient } from '@/registry/default/clients/nextjs/lib/skybase/server'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const skybase = await createClient()

  const { data, error } = await skybase.auth.getUser()
  if (error || !data?.user) {
    redirect('/example/password-based-auth/auth/login')
  }

  return (
    <>
      <p>Hello {data.user.email}</p>
      <LogoutButton />
    </>
  )
}
