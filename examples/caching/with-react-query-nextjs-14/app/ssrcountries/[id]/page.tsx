import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { prefetchQuery } from '@skybase-cache-helpers/postgrest-react-query'
import useSkybaseServer from '@/utils/skybase-server'
import { cookies } from 'next/headers'
import Country from '../country'
import { getCountryById } from '@/queries/get-country-by-id'

export default async function CountryPage({
  params,
}: {
  params: { id: number }
}) {
  const queryClient = new QueryClient()
  const cookieStore = cookies()
  const skybase = useSkybaseServer(cookieStore)

  await prefetchQuery(queryClient, getCountryById(skybase, params.id))

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Country id={params.id} />
    </HydrationBoundary>
  )
}
