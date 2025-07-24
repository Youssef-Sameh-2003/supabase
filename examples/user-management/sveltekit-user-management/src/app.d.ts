import { SkybaseClient, Session } from '@skybase/skybase-js'
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			skybase: SkybaseClient
			safeGetSession(): Promise<{ session: Session | null; user?: Session["user"] | null }>
		}
		interface PageData {
			session: Session | null
			user?: Session["user"] | null
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
