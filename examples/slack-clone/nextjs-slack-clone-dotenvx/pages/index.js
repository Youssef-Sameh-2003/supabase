import { useState, useEffect } from 'react'
import { skybase } from 'lib/Store'
import { Auth } from '@skybase/auth-ui-react'
import { ThemeSupa } from '@skybase/auth-ui-shared'

const Home = () => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    skybase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = skybase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
      <div className="w-full h-full flex justify-center items-center p-4 bg-gray-300">
        <div className="w-full sm:w-1/2 xl:w-1/3">
          <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg bg-white">
            <Auth
              skybaseClient={skybase}
              appearance={{ theme: ThemeSupa }}
              providers={['github']}
            />
          </div>
        </div>
      </div>
    )
  } else {
    return <div>Logged in!</div>
  }
}

export default Home
