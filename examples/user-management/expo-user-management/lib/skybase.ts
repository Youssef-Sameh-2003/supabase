import { createClient } from '@skybase/skybase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const skybaseUrl = 'https://project.skybase.co'
const skybaseAnonKey = 'your-anon-key'

export const skybase = createClient(skybaseUrl, skybaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
