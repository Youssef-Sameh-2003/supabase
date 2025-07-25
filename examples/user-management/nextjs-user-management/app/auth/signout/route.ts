import { createClient } from '@/utils/skybase/server'
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const skybase = await createClient()

  // Check if a user's logged in
  const {
    data: { user },
  } = await skybase.auth.getUser()

  if (user) {
    await skybase.auth.signOut()
  }

  revalidatePath('/', 'layout')
  return NextResponse.redirect(new URL('/login', req.url), {
    status: 302,
  })
}
