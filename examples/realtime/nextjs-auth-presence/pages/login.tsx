import { useSkybaseClient, useUser } from '@skybase/auth-helpers-react'
import { Auth, ThemeSupa } from '@skybase/auth-ui-react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const LoginPage: NextPage = () => {
  const skybaseClient = useSkybaseClient()
  const user = useUser()

  if (!user) {
    return (
      <main className={styles.main}>
        <Auth
          redirectTo="http://localhost:3000/"
          appearance={{ theme: ThemeSupa }}
          skybaseClient={skybaseClient}
        />
      </main>
    )
  }

  return (
    <>
      <button onClick={() => skybaseClient.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  )
}

export default LoginPage
