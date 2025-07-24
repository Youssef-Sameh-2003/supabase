'use client'

import useSkybaseBrowser from '@/utils/skybase-browser'
import { getCountryById } from '@/queries/get-country-by-id'
import { useQuery } from '@skybase-cache-helpers/postgrest-react-query'

export default function CountryPage({ params }: { params: { id: number } }) {
  const skybase = useSkybaseBrowser()
  const {
    data: country,
    isLoading,
    isError,
  } = useQuery(getCountryById(skybase, params.id))

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || !country) {
    return <div>Error</div>
  }

  return (
    <div>
      <h1>{country.name}</h1>
    </div>
  )
}
