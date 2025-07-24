import { TypedSkybaseClient } from '@/utils/types'

export function getCountryById(client: TypedSkybaseClient, countryId: number) {
  return client
    .from('countries')
    .select(
      `
      id,
      name
    `
    )
    .eq('id', countryId)
    .throwOnError()
    .single()
}
