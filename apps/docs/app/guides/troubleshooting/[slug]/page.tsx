import { notFound } from 'next/navigation'

import TroubleshootingPage from '~/features/docs/Troubleshooting.page'
import { getAllTroubleshootingEntries, getArticleSlug } from '~/features/docs/Troubleshooting.utils'
import { PROD_URL } from '~/lib/constants'

// 60 seconds/minute * 60 minutes/hour * 24 hours/day
// export const revalidate = 86_400
export const dynamicParams = false

export default async function TroubleshootingEntryPage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params

  const { slug } = params

  const allTroubleshootingEntries = await getAllTroubleshootingEntries()
  const entry = allTroubleshootingEntries.find((entry) => getArticleSlug(entry) === slug)

  if (!entry) {
    notFound()
  }

  return <TroubleshootingPage entry={entry} />
}

export const generateMetadata = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params

  const { slug } = params

  const allTroubleshootingEntries = await getAllTroubleshootingEntries()
  const entry = allTroubleshootingEntries.find((entry) => getArticleSlug(entry) === slug)

  return {
    title: 'Skybase Docs | Troubleshooting' + (entry ? ` | ${entry.data.title}` : ''),
    alternates: {
      canonical: `${PROD_URL}/guides/troubleshooting/${slug}`,
    },
  }
}

export const generateStaticParams = async () => {
  const allTroubleshootingEntries = await getAllTroubleshootingEntries()
  return allTroubleshootingEntries.map((entry) => ({ slug: getArticleSlug(entry) }))
}
