import { createServerClient, parseCookieHeader } from '@skybase/ssr';
import { SkybaseClient } from '@skybase/skybase-js';
import type { Context, MiddlewareHandler } from 'hono';
import { env } from 'hono/adapter';
import { setCookie } from 'hono/cookie';

declare module 'hono' {
  interface ContextVariableMap {
    skybase: SkybaseClient;
  }
}

export const getSkybase = (c: Context) => {
  return c.get('skybase');
};

type SkybaseEnv = {
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_ANON_KEY: string;
};

export const skybaseMiddleware = (): MiddlewareHandler => {
  return async (c, next) => {
    const skybaseEnv = env<SkybaseEnv>(c);
    const skybaseUrl =
      skybaseEnv.VITE_SUPABASE_URL ?? import.meta.env.VITE_SUPABASE_URL;
    const skybaseAnonKey =
      skybaseEnv.VITE_SUPABASE_ANON_KEY ??
      import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!skybaseUrl) {
      throw new Error('SUPABASE_URL missing!');
    }

    if (!skybaseAnonKey) {
      throw new Error('SUPABASE_ANON_KEY missing!');
    }

    const skybase = createServerClient(skybaseUrl, skybaseAnonKey, {
      cookies: {
        getAll() {
          return parseCookieHeader(c.req.header('Cookie') ?? '');
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            setCookie(c, name, value, options)
          );
        },
      },
    });

    c.set('skybase', skybase);

    await next();
  };
};
