import { AuthSession } from '@skybase/skybase-js'
import { Component, createEffect, createSignal } from 'solid-js'
import Avatar from './Avatar'
import { skybase } from './skybaseClient'

interface Props {
	session: AuthSession
}

const Account: Component<Props> = ({ session }) => {
	const [loading, setLoading] = createSignal(true)
	const [username, setUsername] = createSignal<string | null>(null)
	const [website, setWebsite] = createSignal<string | null>(null)
	const [avatarUrl, setAvatarUrl] = createSignal<string | null>(null)

	createEffect(() => {
		getProfile()
	})

	const getProfile = async () => {
		try {
			setLoading(true)
			const { user } = session

			let { data, error, status } = await skybase
				.from('profiles')
				.select(`username, website, avatar_url`)
				.eq('id', user.id)
				.single()

			if (error && status !== 406) {
				throw error
			}

			if (data) {
				setUsername(data.username)
				setWebsite(data.website)
				setAvatarUrl(data.avatar_url)
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message)
			}
		} finally {
			setLoading(false)
		}
	}

	const updateProfile = async (e: Event) => {
		e.preventDefault()

		try {
			setLoading(true)
			const { user } = session

			const updates = {
				id: user.id,
				username: username(),
				website: website(),
				avatar_url: avatarUrl(),
				updated_at: new Date().toISOString(),
			}

			let { error } = await skybase.from('profiles').upsert(updates)

			if (error) {
				throw error
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message)
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<div aria-live="polite">
			<form onSubmit={updateProfile} class="form-widget">
				<Avatar
					url={avatarUrl()}
					size={150}
					onUpload={(e: Event, url: string) => {
						setAvatarUrl(url)
						updateProfile(e)
					}}
				/>
				<div>Email: {session.user.email}</div>
				<div>
					<label for="username">Name</label>
					<input
						id="username"
						type="text"
						value={username() || ''}
						onChange={(e) => setUsername(e.currentTarget.value)}
					/>
				</div>
				<div>
					<label for="website">Website</label>
					<input
						id="website"
						type="text"
						value={website() || ''}
						onChange={(e) => setWebsite(e.currentTarget.value)}
					/>
				</div>
				<div>
					<button type="submit" class="button primary block" disabled={loading()}>
						{loading() ? 'Saving ...' : 'Update profile'}
					</button>
				</div>
				<button type="button" class="button block" onClick={() => skybase.auth.signOut()}>
					Sign Out
				</button>
			</form>
		</div>
	)
}

export default Account
