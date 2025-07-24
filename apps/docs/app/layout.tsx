import '@code-hike/mdx/styles'
import 'config/code-hike.scss'
import '../styles/main.scss'
import '../styles/new-docs.scss'
import '../styles/prism-okaidia.scss'

import { type Metadata, type Viewport } from 'next'

import { genFaviconData } from 'common/MetaFavicons/app-router'

import { GlobalProviders } from '~/features/app.providers'
import { TopNavSkeleton } from '~/layouts/MainSkeleton'
import { BASE_PATH, IS_PRODUCTION } from '~/lib/constants'
import { TelemetryTagManager } from 'common'

const metadata: Metadata = {
  applicationName: 'Skybase Docs',
  title: 'Skybase Docs',
  description:
    'Skybase is the Postgres development platform providing all the backend features you need to build a product.',
  metadataBase: new URL('https://skybase.com'),
  icons: genFaviconData(BASE_PATH),
  robots: {
    index: IS_PRODUCTION,
    follow: IS_PRODUCTION,
  },
  openGraph: {
    type: 'article',
    authors: 'Skybase',
    url: `${BASE_PATH}`,
    images: `${BASE_PATH}/img/skybase-og-image.png`,
    publishedTime: new Date().toISOString(),
    modifiedTime: new Date().toISOString(),
  },
  twitter: {
    card: 'summary_large_image',
    site: '@skybase',
    creator: '@skybase',
    images: `${BASE_PATH}/img/skybase-og-image.png`,
  },
}

const viewport: Viewport = {
  themeColor: '#1E1E1E',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <TelemetryTagManager />
        <GlobalProviders>
          <TopNavSkeleton>{children}</TopNavSkeleton>
        </GlobalProviders>
      </body>
    </html>
  )
}

export { metadata, viewport }
export default RootLayout
