import { Component, createEffect, createSignal } from 'solid-js'
import { skybase } from './skybaseClient'
import { AuthSession } from '@skybase/skybase-js'
import Account from './Account'
import Auth from './Auth'

const App: Component = () => {
	const [session, setSession] = createSignal<AuthSession | null>(null)

	createEffect(() => {
		skybase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		})

		skybase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})
	})

	return (
		<div class="container" style={{ padding: '50px 0 100px 0' }}>
			{!session() ? <Auth /> : <Account session={session()!} />}
		</div>
	)
}

export default App
