import { createClient } from '@/registry/default/clients/react-router/lib/skybase/server'
import { Button } from '@/registry/default/components/ui/button'
import { type LoaderFunctionArgs, redirect, useLoaderData } from 'react-router'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { skybase } = createClient(request)

  const { data, error } = await skybase.auth.getUser()
  if (error || !data?.user) {
    return redirect('/login')
  }

  return data
}

export default function ProtectedPage() {
  let data = useLoaderData<typeof loader>()

  return (
    <div className="flex items-center justify-center h-screen gap-2">
      <p>
        Hello <span className="text-primary font-semibold">{data.user.email}</span>
      </p>
      <a href="/logout">
        <Button>Logout</Button>
      </a>
    </div>
  )
}
