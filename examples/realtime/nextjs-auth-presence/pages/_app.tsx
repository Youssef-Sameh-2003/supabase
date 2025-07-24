import { createBrowserSkybaseClient, Session } from '@skybase/auth-helpers-nextjs'
import { SessionContextProvider } from '@skybase/auth-helpers-react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import '../styles/globals.css'

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {
  const router = useRouter()
  const [skybaseClient] = useState(() => createBrowserSkybaseClient())

  useEffect(() => {
    const {
      data: { subscription },
    } = skybaseClient.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case 'SIGNED_IN':
          router.push('/')
          return
        case 'SIGNED_OUT':
          router.push('/login')
          return
      }
    })
    return subscription.unsubscribe
  }, [])

  return (
    <SessionContextProvider
      skybaseClient={skybaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}

export default MyApp
