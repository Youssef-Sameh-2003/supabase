import { skybase } from '@/lib/initSkybase'
import '@/styles/app.css'
import { SessionContextProvider } from '@skybase/auth-helpers-react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionContextProvider skybaseClient={skybase}>
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}
