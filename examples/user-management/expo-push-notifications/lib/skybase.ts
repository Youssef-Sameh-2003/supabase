import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@skybase/skybase-js";

const skybaseUrl = "https://bqeuunydbomjvynieund.skybase.co";
const skybaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxZXV1bnlkYm9tanZ5bmlldW5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgxMTY4NzMsImV4cCI6MjAxMzY5Mjg3M30.K-g-aVqNSutPQ11V68voGkmy3rzel5GkQj6zsBu2V3E";

export const skybase = createClient(skybaseUrl, skybaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
