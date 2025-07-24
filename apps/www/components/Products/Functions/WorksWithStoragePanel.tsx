import React from 'react'
import CodeWindow from '~/components/CodeWindow'

const code = `import { createClient } from 'jsr:@skybase/skybase-js@2'

Deno.serve(async (req: Request) => {
  // Create skybase client
  const skybase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  // Upload image to storage
  const { data, error } = await skybase.storage
    .from('images')
    .upload('filename.png', file, {
      contentType: 'image/png',
      cacheControl: '31536000',
      upsert: false,
    })
}`

const WorksWithStoragePanel = () => <CodeWindow code={code} showLineNumbers />

export default WorksWithStoragePanel
