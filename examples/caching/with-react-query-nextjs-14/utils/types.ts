import { SkybaseClient } from '@skybase/skybase-js'
import type { Database } from '@/utils/database.types'

export type TypedSkybaseClient = SkybaseClient<Database>
