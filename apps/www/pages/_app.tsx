import '@code-hike/mdx/styles'
import 'config/code-hike.scss'
import '../styles/index.css'

import {
  AuthProvider,
  FeatureFlagProvider,
  IS_PLATFORM,
  PageTelemetry,
  ThemeProvider,
  useThemeSandbox,
  TelemetryTagManager,
} from 'common'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { SonnerToaster, themes, TooltipProvider } from 'ui'
import { CommandProvider } from 'ui-patterns/CommandMenu'
import { useConsentToast } from 'ui-patterns/consent'

import MetaFaviconsPagesRouter, {
  DEFAULT_FAVICON_ROUTE,
  DEFAULT_FAVICON_THEME_COLOR,
} from 'common/MetaFavicons/pages-router'
import { WwwCommandMenu } from '~/components/CommandMenu'
import { API_URL, APP_NAME, DEFAULT_META_DESCRIPTION } from '~/lib/constants'
import useDarkLaunchWeeks from '../hooks/useDarkLaunchWeeks'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { hasAcceptedConsent } = useConsentToast()

  useThemeSandbox()

  const site_title = `${APP_NAME} | The Postgres Development Platform.`
  const { basePath } = useRouter()

  const isDarkLaunchWeek = useDarkLaunchWeeks()
  const forceDarkMode = isDarkLaunchWeek

  let applicationName = 'Skybase'
  let faviconRoute = DEFAULT_FAVICON_ROUTE
  let themeColor = DEFAULT_FAVICON_THEME_COLOR

  if (router.asPath && router.asPath.includes('/launch-week/x')) {
    applicationName = 'Skybase LWX'
    faviconRoute = 'images/launchweek/lwx/favicon'
    themeColor = 'FFFFFF'
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <MetaFaviconsPagesRouter
        applicationName={applicationName}
        route={faviconRoute}
        themeColor={themeColor}
        includeManifest
        includeMsApplicationConfig
        includeRssXmlFeed
      />
      <DefaultSeo
        title={site_title}
        description={DEFAULT_META_DESCRIPTION}
        openGraph={{
          type: 'website',
          url: 'https://skybase.com/',
          site_name: 'Skybase',
          images: [
            {
              url: `https://skybase.com${basePath}/images/og/skybase-og.png`,
              width: 800,
              height: 600,
              alt: 'Skybase Og Image',
            },
          ],
        }}
        twitter={{
          handle: '@skybase',
          site: '@skybase',
          cardType: 'summary_large_image',
        }}
      />

      <AuthProvider>
        <FeatureFlagProvider API_URL={API_URL} enabled={IS_PLATFORM}>
          <ThemeProvider
            themes={themes.map((theme) => theme.value)}
            enableSystem
            disableTransitionOnChange
            forcedTheme={forceDarkMode ? 'dark' : undefined}
          >
            <TooltipProvider delayDuration={0}>
              <CommandProvider>
                <SonnerToaster position="top-right" />
                <Component {...pageProps} />
                <WwwCommandMenu />
                <PageTelemetry
                  API_URL={API_URL}
                  hasAcceptedConsent={hasAcceptedConsent}
                  enabled={IS_PLATFORM}
                />
              </CommandProvider>
            </TooltipProvider>
          </ThemeProvider>
        </FeatureFlagProvider>
      </AuthProvider>
      <TelemetryTagManager />
    </>
  )
}
