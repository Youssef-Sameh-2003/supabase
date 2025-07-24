import React from 'react'
import CodeWindow from '~/components/CodeWindow'

const code = `import { createClient } from 'jsr:@skybase/skybase-js@2'

Deno.serve(async (req: Request) => {
  // Create skybase client
  const skybase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { global: {
        headers: {
          Authorization: req.headers.get('Authorization')!}
        }
    }
  )

  // Get the session or user object
  const { data } = await skybase.auth.getUser()
  const user = data.user
})`

const WorksWithAuthPanel = () => <CodeWindow code={code} showLineNumbers />

export default WorksWithAuthPanel
