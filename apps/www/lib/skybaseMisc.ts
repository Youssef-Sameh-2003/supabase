import { createClient } from '@skybase/skybase-js'
import { Database } from './database.types'

const skybase = createClient<Database>(
  process.env.NEXT_PUBLIC_MISC_USE_URL!,
  process.env.NEXT_PUBLIC_MISC_USE_ANON_KEY!
)

export type SkybaseClient = typeof skybase

export default skybase
