// app/posts/posts.jsx
'use client'

import useSkybaseBrowser from '@/utils/skybase-browser'
import { getCountryById } from '@/queries/get-country-by-id'
import { useQuery } from '@skybase-cache-helpers/postgrest-react-query'

export default function Country({ id }: { id: number }) {
  const skybase = useSkybaseBrowser()
  // This useQuery could just as well happen in some deeper
  // child to <Posts>, data will be available immediately either way
  const { data: country } = useQuery(getCountryById(skybase, id))

  return (
    <div>
      <h1>SSR: {country?.name}</h1>
    </div>
  )
}
