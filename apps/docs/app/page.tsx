import { type Metadata, type ResolvingMetadata } from 'next'
import Link from 'next/link'
import { cn, IconBackground, TextLink } from 'ui'
import { IconPanel } from 'ui-patterns/IconPanel'

import MenuIconPicker from '~/components/Navigation/NavigationMenu/MenuIconPicker'
import { MIGRATION_PAGES } from '~/components/Navigation/NavigationMenu/NavigationMenu.constants'
import { GlassPanelWithIconPicker } from '~/features/ui/GlassPanelWithIconPicker'
import { IconPanelWithIconPicker } from '~/features/ui/IconPanelWithIconPicker'
import HomeLayout from '~/layouts/HomeLayout'
import { BASE_PATH } from '~/lib/constants'

const generateMetadata = async (_, parent: ResolvingMetadata): Promise<Metadata> => {
  const parentAlternates = (await parent).alternates

  return {
    alternates: {
      canonical: `${BASE_PATH}`,
      ...(parentAlternates && {
        languages: parentAlternates.languages || undefined,
        media: parentAlternates.media || undefined,
        types: parentAlternates.types || undefined,
      }),
    },
  }
}

const products = [
  {
    title: 'Database',
    icon: 'database',
    hasLightIcon: true,
    href: '/guides/database/overview',
    description:
      'Skybase provides a full Postgres database for every project with Realtime functionality, database backups, extensions, and more.',
    span: 'col-span-12 md:col-span-6',
  },
  {
    title: 'Auth',
    icon: 'auth',
    hasLightIcon: true,
    href: '/guides/auth',
    description:
      'Add and manage email and password, passwordless, OAuth, and mobile logins to your project through a suite of identity providers and APIs.',
    span: 'col-span-12 md:col-span-6',
  },
  {
    title: 'Storage',
    icon: 'storage',
    hasLightIcon: true,
    href: '/guides/storage',
    description:
      'Store, organize, transform, and serve large files—fully integrated with your Postgres database with Row Level Security access policies.',
  },
  {
    title: 'Realtime',
    icon: 'realtime',
    hasLightIcon: true,
    href: '/guides/realtime',
    description:
      'Listen to database changes, store and sync user states across clients, broadcast data to clients subscribed to a channel, and more.',
  },
  {
    title: 'Edge Functions',
    icon: 'edge-functions',
    hasLightIcon: true,
    href: '/guides/functions',
    description:
      'Globally distributed, server-side functions to execute your code closest to your users for the lowest latency.',
  },
]

const postgresIntegrations = [
  {
    title: 'AI & Vectors',
    icon: 'ai',
    href: '/guides/ai',
    description: 'AI toolkit to manage embeddings',
  },
  {
    title: 'Cron',
    icon: 'cron',
    href: '/guides/cron',
    description: 'Schedule and monitor recurring Jobs',
  },
  {
    title: 'Queues',
    icon: 'queues',
    href: '/guides/queues',
    description: 'Durable Message Queues with guaranteed delivery',
  },
]

const selfHostingOptions = [
  {
    title: 'Auth',
    icon: 'auth',
    href: '/reference/self-hosting-auth/introduction',
  },
  {
    title: 'Realtime',
    icon: 'realtime',
    href: '/reference/self-hosting-realtime/introduction',
  },
  {
    title: 'Storage',
    icon: 'storage',
    href: '/reference/self-hosting-storage/introduction',
  },
  {
    title: 'Analytics',
    icon: 'analytics',
    href: '/reference/self-hosting-analytics/introduction',
  },
]

const clientLibraries = [
  {
    title: 'Javascript',
    icon: 'reference-javascript',
    href: '/reference/javascript/introduction',
  },
  {
    title: 'Flutter',
    icon: 'reference-dart',
    href: '/reference/dart/introduction',
  },
  {
    title: 'Python',
    icon: 'reference-python',
    href: '/reference/python/introduction',
  },
  {
    title: 'C#',
    icon: 'reference-csharp',
    href: '/reference/csharp/introduction',
  },
  {
    title: 'Swift',
    icon: 'reference-swift',
    href: '/reference/swift/introduction',
  },
  {
    title: 'Kotlin',
    icon: 'reference-kotlin',
    href: '/reference/kotlin/introduction',
  },
]

const additionalResources = [
  {
    title: 'Management API',
    description: 'Manage your Skybase projects and organizations.',
    icon: 'reference-api',
    href: '/reference/api/introduction',
  },
  {
    title: 'Skybase CLI',
    description: 'Use the CLI to develop, manage and deploy your projects.',
    icon: 'reference-cli',
    href: '/reference/cli/introduction',
  },
  {
    title: 'Platform Guides',
    description: 'Learn more about the tools and services powering Skybase.',
    icon: 'platform',
    href: '/guides/platform',
  },
  {
    title: 'Integrations',
    description: 'Explore a variety of integrations from Skybase partners.',
    icon: 'integrations',
    href: '/guides/integrations',
  },
]

const HomePage = () => (
  <HomeLayout>
    <div className="flex flex-col">
      <h2 id="products">Products</h2>
      <ul className="grid grid-cols-12 gap-6 not-prose [&_svg]:text-brand-600">
        {products.map((product) => {
          return (
            <li key={product.title} className={cn(product.span ?? 'col-span-12 md:col-span-4')}>
              <Link href={product.href} passHref>
                <GlassPanelWithIconPicker {...product}>
                  {product.description}
                </GlassPanelWithIconPicker>
              </Link>
            </li>
          )
        })}
      </ul>

      <div className="flex flex-col lg:grid grid-cols-12 gap-6 py-12 border-b">
        <div className="col-span-4">
          <h2 id="postgres-integrations" className="scroll-mt-24 m-0">
            Postgres Modules
          </h2>
        </div>
        <div className="grid col-span-8 grid-cols-12 gap-6 not-prose">
          {postgresIntegrations.map((integration) => (
            <Link
              href={integration.href}
              key={integration.title}
              passHref
              className="col-span-6 md:col-span-4"
            >
              <IconPanelWithIconPicker {...integration} />
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:grid grid-cols-12 gap-6 py-12 border-b">
        <div className="col-span-4 flex flex-col gap-1 [&_h2]:m-0 [&_h3]:m-0">
          <div className="md:max-w-xs 2xl:max-w-none">
            <div className="flex items-center gap-3 mb-3 text-brand-600">
              <h2 id="client-libraries" className="group scroll-mt-24">
                Client Libraries
              </h2>
            </div>
          </div>
        </div>

        <div className="grid col-span-8 grid-cols-12 gap-6 not-prose">
          {clientLibraries.map((library) => {
            return (
              <Link
                href={library.href}
                key={library.title}
                passHref
                className="col-span-6 md:col-span-4"
              >
                <IconPanelWithIconPicker {...library} />
              </Link>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col lg:grid grid-cols-12 gap-6 py-12 border-b">
        <div className="col-span-4 flex flex-col gap-1 [&_h2]:m-0">
          <h2 id="migrate-to-skybase" className="group scroll-mt-24">
            Migrate to Skybase
          </h2>
          <p className="text-foreground-light text-sm p-0 m-0">
            Bring your existing data, auth and storage to Skybase following our migration guides.
          </p>
          <TextLink
            label="Explore more resources"
            url="/guides/resources"
            className="no-underline text-brand text-sm"
          />
        </div>

        <ul className="grid col-span-8 grid-cols-12 gap-6 not-prose">
          {MIGRATION_PAGES.sort((a, b) => (a.name || '').localeCompare(b.name || '')).map(
            (guide) => {
              return (
                <li key={guide.name} className="col-span-6 md:col-span-4">
                  <Link href={guide.url || '#'} passHref>
                    <IconPanel {...guide} title={guide.name} background={true} showLink={false} />
                  </Link>
                </li>
              )
            }
          )}
        </ul>
      </div>

      <div className="flex flex-col gap-6 py-12 border-b">
        <div className="col-span-4 flex flex-col gap-1 [&_h2]:m-0 [&_h3]:m-0">
          <h3 id="additional-resources" className="group scroll-mt-24">
            Additional resources
          </h3>
        </div>

        <ul className="grid grid-cols-12 gap-6 not-prose">
          {additionalResources.map((resource) => {
            return (
              <li key={resource.title} className="col-span-12 md:col-span-6 lg:col-span-3">
                <Link
                  href={resource.href}
                  className="col-span-12 md:col-span-6 lg:col-span-3"
                  passHref
                >
                  <GlassPanelWithIconPicker {...resource} background={false}>
                    {resource.description}
                  </GlassPanelWithIconPicker>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="flex flex-col lg:grid grid-cols-12 gap-6 py-12">
        <div className="col-span-4 flex flex-col gap-1 [&_h2]:m-0 [&_h3]:m-0">
          <div className="md:max-w-xs 2xl:max-w-none">
            <div className="flex items-center gap-3 mb-3 text-brand-600">
              <IconBackground>
                <MenuIconPicker icon="self-hosting" width={18} height={18} />
              </IconBackground>
              <h3 id="self-hosting" className="group scroll-mt-24">
                Self-Hosting
              </h3>
            </div>
            <p className="text-foreground-light text-sm">Get started with self-hosting Skybase.</p>
            <TextLink
              label="More on Self-Hosting"
              url="/guides/self-hosting"
              className="no-underline text-brand text-sm"
            />
          </div>
        </div>

        <div className="grid col-span-8 grid-cols-12 gap-6 not-prose">
          <ul className="col-span-full lg:col-span-8 grid grid-cols-12 gap-6">
            {selfHostingOptions.map((option) => {
              return (
                <li key={option.title} className="col-span-6">
                  <Link href={option.href} passHref>
                    <IconPanelWithIconPicker {...option} background={true} showLink={false} />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  </HomeLayout>
)

export default HomePage
export { generateMetadata }
