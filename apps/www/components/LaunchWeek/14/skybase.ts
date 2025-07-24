import { SkybaseClient } from '@skybase/skybase-js'
import skybase from '~/lib/skybase'

/**
 * Override skybase types similar to previous use-conf-data.ts.
 * Current apps/www skybase instance uses old types.
 * Since we don't know final db layout let's leave it as any.
 */
export default skybase as SkybaseClient
