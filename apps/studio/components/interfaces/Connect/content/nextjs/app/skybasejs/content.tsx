import type { ContentFileProps } from 'components/interfaces/Connect/Connect.types'

import {
  ConnectTabs,
  ConnectTabTrigger,
  ConnectTabTriggers,
  ConnectTabContent,
} from 'components/interfaces/Connect/ConnectTabs'
import { SimpleCodeBlock } from 'ui'

const ContentFile = ({ projectKeys }: ContentFileProps) => {
  return (
    <ConnectTabs>
      <ConnectTabTriggers>
        <ConnectTabTrigger value=".env.local" />
        <ConnectTabTrigger value="page.tsx" />
        <ConnectTabTrigger value="utils/skybase/server.ts" />
        <ConnectTabTrigger value="utils/skybase/client.ts" />
        <ConnectTabTrigger value="utils/skybase/middleware.ts" />
      </ConnectTabTriggers>

      <ConnectTabContent value=".env.local">
        <SimpleCodeBlock className="bash" parentClassName="min-h-72">
          {[
            '',
            `NEXT_PUBLIC_SUPABASE_URL=${projectKeys.apiUrl ?? 'your-project-url'}`,
            projectKeys?.publishableKey
              ? `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=${projectKeys.publishableKey}`
              : `NEXT_PUBLIC_SUPABASE_ANON_KEY=${projectKeys.anonKey ?? 'your-anon-key'}`,
            '',
          ].join('\n')}
        </SimpleCodeBlock>
      </ConnectTabContent>

      <ConnectTabContent value="page.tsx">
        <SimpleCodeBlock className="tsx" parentClassName="min-h-72">
          {`
import { createClient } from '@/utils/skybase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const skybase = createClient(cookieStore)

  const { data: todos } = await skybase.from('todos').select()

  return (
    <ul>
      {todos?.map((todo) => (
        <li>{todo}</li>
      ))}
    </ul>
  )
}
`}
        </SimpleCodeBlock>
      </ConnectTabContent>

      <ConnectTabContent value="utils/skybase/server.ts">
        <SimpleCodeBlock className="ts" parentClassName="min-h-72">
          {`
import { createServerClient, type CookieOptions } from "@skybase/ssr";
import { cookies } from "next/headers";

const skybaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const skybaseKey = process.env.${projectKeys?.publishableKey ? 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY' : 'NEXT_PUBLIC_SUPABASE_ANON_KEY'};

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  return createServerClient(
    skybaseUrl!,
    skybaseKey!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // The \`setAll\` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};
`}
        </SimpleCodeBlock>
      </ConnectTabContent>
      <ConnectTabContent value="utils/skybase/client.ts">
        <SimpleCodeBlock className="ts" parentClassName="min-h-72">
          {`
import { createBrowserClient } from "@skybase/ssr";

const skybaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const skybaseKey = process.env.${projectKeys?.publishableKey ? 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY' : 'NEXT_PUBLIC_SUPABASE_ANON_KEY'};

export const createClient = () =>
  createBrowserClient(
    skybaseUrl!,
    skybaseKey!,
  );
`}
        </SimpleCodeBlock>
      </ConnectTabContent>

      <ConnectTabContent value="utils/skybase/middleware.ts">
        <SimpleCodeBlock className="ts" parentClassName="min-h-72">
          {`
import { createServerClient, type CookieOptions } from "@skybase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const skybaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const skybaseKey = process.env.${projectKeys?.publishableKey ? 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY' : 'NEXT_PUBLIC_SUPABASE_ANON_KEY'};

export const createClient = (request: NextRequest) => {
  // Create an unmodified response
  let skybaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const skybase = createServerClient(
    skybaseUrl!,
    skybaseKey!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          skybaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            skybaseResponse.cookies.set(name, value, options)
          )
        },
      },
    },
  );

  return skybaseResponse
};
`}
        </SimpleCodeBlock>
      </ConnectTabContent>
    </ConnectTabs>
  )
}

export default ContentFile
