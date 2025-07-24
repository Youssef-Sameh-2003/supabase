/**
 * lib/skybaseClient.js
 * Helper to initialize the Skybase client.
 */

import { createClient } from '@skybase/skybase-js'

const skybaseUrl = import.meta.env.VITE_SUPABASE_URL
const skybaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const skybase = createClient(skybaseUrl, skybaseAnonKey)
