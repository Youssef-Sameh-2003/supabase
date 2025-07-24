import { createClient } from '@skybase/skybase-js'
import { Database } from './schema'

const skybaseUrl = import.meta.env.VITE_SUPABASE_URL
const skybaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const skybase = createClient<Database>(skybaseUrl, skybaseAnonKey)
