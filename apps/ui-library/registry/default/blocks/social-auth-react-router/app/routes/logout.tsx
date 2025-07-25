import { createClient } from '@/registry/default/clients/react-router/lib/skybase/server'
import { type ActionFunctionArgs, redirect } from 'react-router'

export async function loader({ request }: ActionFunctionArgs) {
  const { skybase, headers } = createClient(request)

  const { error } = await skybase.auth.signOut()

  if (error) {
    console.error(error)
    return { success: false, error: error.message }
  }

  // Redirect to dashboard or home page after successful sign-in
  return redirect('/', { headers })
}
