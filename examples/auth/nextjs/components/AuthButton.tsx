import { createClient } from '@/utils/skybase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AuthButton() {
  const skybase = await createClient()

  const {
    data: { user },
  } = await skybase.auth.getUser()

  const signOut = async () => {
    'use server'

    const skybase = await createClient()
    await skybase.auth.signOut()
    return redirect('/login')
  }

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  )
}
