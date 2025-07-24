import AccountForm from './account-form'
import { createClient } from '@/utils/skybase/server'

export default async function Account() {
  const skybase = await createClient()

  const {
    data: { user },
  } = await skybase.auth.getUser()

  return <AccountForm user={user} />
}
