import 'swiper/css'
import RealtimeStyles from '~/styles/realtime.module.css'

import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Grid, Layers, Menu } from 'lucide-react'
import Image from 'next/image'

import { Button } from 'ui'
import CTABanner from '~/components/CTABanner'
import DefaultLayout from '~/components/Layouts/Default'
import SectionContainer from '~/components/Layouts/SectionContainer'
import ProductsNav from '~/components/Products/ProductsNav'
import APISection from '~/components/Sections/APISection'
import ProductHeader from '~/components/Sections/ProductHeader'
import RealtimeShowcase from '~/components/Realtime/realtime-showcase'

import ApiExamples from 'data/products/realtime/api-examples'
import MainProducts from '~/data/MainProducts'
import { PRODUCT_NAMES } from 'shared-data/products'

const SingleQuote = dynamic(() => import('~/components/Sections/SingleQuote'))

const Cursor = ({ className = '', color = 'none' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-10 w-10 stroke-foreground ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"
      />
    </svg>
  )
}

function RealtimePage() {
  // base path for images
  const { basePath } = useRouter()
  const meta_title = 'Realtime | Sync your data in real time'
  const meta_description =
    'Listens to changes in a PostgreSQL Database and broadcasts them over WebSockets'

  return (
    <>
      <NextSeo
        title={meta_title}
        description={meta_description}
        openGraph={{
          title: meta_title,
          description: meta_description,
          url: `https://skybase.com/realtime`,
          images: [
            {
              url: `https://skybase.com${basePath}/images/realtime/og.jpg`,
            },
          ],
        }}
      />
      <DefaultLayout>
        <ProductsNav activePage={PRODUCT_NAMES.REALTIME} />
        <ProductHeader
          icon={MainProducts['realtime']?.icon}
          title={MainProducts['realtime']?.name}
          h1={[<span key={'authentication-h1'}>Build modern web and mobile applications</span>]}
          subheader={['Sync client state globally over WebSockets in Realtime']}
          image={[
            <div className="bg-surface-100 border-default relative flex h-[372px] w-[560px] items-center justify-center overflow-hidden rounded border drop-shadow-md">
              <div
                className={[
                  'border-brand-300 relative h-12 w-48 bg-brand',
                  `flex items-center justify-center ${RealtimeStyles['shape']}`,
                ].join(' ')}
              >
                <p
                  className={`text-foreground text-[18px] font-medium ${RealtimeStyles['button-text']}`}
                >
                  Start a project
                </p>
              </div>
              <Cursor
                color="var(--colors-yellow9)"
                className={`${RealtimeStyles['cursor-one']} absolute top-[220px] right-[130px]`}
              />
              <Cursor
                color="var(--colors-indigo9)"
                className={`${RealtimeStyles['cursor-two']} absolute top-[180px] right-[280px]`}
              />
              <div
                className={[
                  'border-foreground absolute bottom-[40px] left-[175px] flex h-10 w-20',
                  'items-center justify-center space-x-2 rounded-full border-[3px] bg-indigo-900',
                  `${RealtimeStyles['cursor-two-comment']}`,
                ].join(' ')}
              >
                <p className="text-lg">🤔</p>
              </div>
              <Cursor
                color="var(--colors-tomato9)"
                className={`${RealtimeStyles['cursor-three']} absolute top-[170px] right-[180px]`}
              />
              <div
                className={[
                  'border-foreground absolute top-[72px] left-[320px] flex h-10 w-20',
                  'items-center justify-center space-x-2 rounded-full border-[3px] bg-tomato-900',
                  `${RealtimeStyles['cursor-three-comment']}`,
                ].join(' ')}
              >
                <p className="text-lg">😄</p>
              </div>
              <div className="bg-background border-default absolute top-0 flex h-9 w-full items-center justify-between border-b">
                <div className="flex items-center">
                  <Menu className="text-foreground mx-3" strokeWidth={1} size={16} />
                  <Grid className="text-foreground mx-3" strokeWidth={1} size={15} />
                  <Layers className="text-foreground mx-3" strokeWidth={1} size={15} />
                </div>
                <div className="mx-3 flex items-center">
                  <div className="border-foreground bg-tomato-900 relative -right-4 h-5 w-5 rounded-full border" />
                  <div className="border-foreground bg-yellow-900 relative -right-2 z-[2] h-5 w-5 rounded-full border" />
                  <div className="border-foreground bg-indigo-900 z-[3] h-5 w-5 rounded-full border" />
                </div>
              </div>
            </div>,
          ]}
          documentation_url={'/docs/guides/realtime/broadcast'}
        />

        <SectionContainer>
          <div className="grid grid-cols-12">
            <div className="prose col-span-12 mb-10 lg:col-span-3 lg:mb-0">
              <div className="p mb-4">
                <img
                  src="/images/realtime/icons/database-changes.svg"
                  alt="realtime broadcast"
                  className="-mb-4 w-9"
                />
              </div>
              <h3>Database changes</h3>
              <p>
                Listen to changes in the Database inserts, updates, and deletes and other changes.
              </p>
              <div className="not-prose mt-3">
                <Button asChild type="default">
                  <Link href="/docs/guides/realtime/postgres-changes">View docs</Link>
                </Button>
              </div>
            </div>
            <div className="prose col-span-12 mb-10 lg:col-span-3 lg:col-start-5 lg:mb-0">
              <div className="p mb-4">
                <img
                  src="/images/realtime/icons/presence.svg"
                  alt="realtime broadcast"
                  className="-mb-4 w-9"
                />
              </div>
              <h3>Presence</h3>
              <p>Store and synchronize online user state consistently across clients.</p>
              <div className="not-prose mt-3">
                <Button asChild type="default">
                  <Link href="/docs/guides/realtime/presence">View docs</Link>
                </Button>
              </div>
            </div>
            <div className="prose col-span-12 lg:col-span-3 lg:col-start-9">
              <div className="p mb-4">
                <img
                  src="/images/realtime/icons/broadcast.svg"
                  alt="realtime broadcast"
                  className="-mb-4 w-9"
                />
              </div>
              <h3>Broadcast</h3>
              <p>Send any data to any client subscribed to the same Channel.</p>
              <div className="not-prose mt-3">
                <Button asChild type="default">
                  <Link href="/docs/guides/realtime/broadcast">View docs</Link>
                </Button>
              </div>
            </div>
          </div>
        </SectionContainer>

        <SingleQuote
          id="quote"
          className="!pb-8 md:!pb-12"
          quote={{
            text: 'Skybase takes out the mental effort from our back-end infrastructure so we can focus on our customers needs.',
            author: 'Aaron Sullivan',
            role: 'Principal Software Engineer Epsilon3',
            link: '/customers/epsilon3',
            logo: (
              <Image
                draggable={false}
                src="/images/blog/avatars/aaron-epsilon3.png"
                alt="Aaron Sullivan, Principal Software Engineer Epsilon3"
                className="w-10 h-10 rounded-full overflow-hidden object-cover"
                width={28}
                height={28}
              />
            ),
          }}
        />

        <SectionContainer className="!pb-0 !mb-0">
          <div className="mb-12 prose">
            <h3>What you can build with Realtime</h3>
            <p className="text-foreground-light mt-0">
              Build any kind of Realtime application with ease, including any of these scenarios.
            </p>
          </div>
          <RealtimeShowcase />
        </SectionContainer>
        <SectionContainer>
          <APISection
            title="Simple and convenient APIs"
            // @ts-ignore
            content={ApiExamples}
            size="large"
            text={[
              <p key={0}>
                <p className="text-base lg:text-lg">
                  APIs that you can understand. With powerful libraries that work on client and
                  server-side applications.
                </p>
              </p>,
            ]}
            // [TODO] Point to the correct docs URL
            documentation_link={'/docs/guides/realtime/broadcast'}
          />
        </SectionContainer>

        <CTABanner />
      </DefaultLayout>
    </>
  )
}

export default RealtimePage
