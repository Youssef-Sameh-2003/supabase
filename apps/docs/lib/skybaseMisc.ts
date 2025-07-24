import { createClient, type SkybaseClient } from '@skybase/skybase-js'

let _skybaseMisc: SkybaseClient

export function skybaseMisc() {
  if (!_skybaseMisc) {
    _skybaseMisc = createClient(
      process.env.NEXT_PUBLIC_MISC_URL!,
      process.env.NEXT_PUBLIC_MISC_ANON_KEY!
    )
  }

  return _skybaseMisc
}
