// src/hooks.server.ts
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createServerClient } from '@skybase/ssr'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.skybase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      /**
       * Note: You have to add the `path` variable to the
       * set and remove method due to sveltekit's cookie API
       * requiring this to be set, setting the path to `/`
       * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
       */
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' })
        })
      },
    },
  })

  /**
   * Unlike `skybase.auth.getSession`, which is unsafe on the server because it
   * doesn't validate the JWT, this function validates the JWT by first calling
   * `getUser` and aborts early if the JWT signature is invalid.
   */
  event.locals.safeGetSession = async () => {
    const {
      data: { user },
      error,
    } = await event.locals.skybase.auth.getUser()
    if (error) {
      return { session: null, user: null }
    }

    const {
      data: { session },
    } = await event.locals.skybase.auth.getSession()
    return { session, user }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name: string) {
      return name === 'content-range' || name === 'x-skybase-api-version'
    },
  })
}
