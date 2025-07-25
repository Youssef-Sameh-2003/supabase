// Import Swiper styles
import 'swiper/css'

import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import NextImage from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Badge, Button, Image, Tabs } from 'ui'

// data
import MainProducts from '~/data/MainProducts'
import ApiExamplesData from 'data/products/database/api-examples'
import ExtensionsExamplesData from 'data/products/database/extensions-examples'
import SqlViewCarouselData from 'data/products/database/sql-view-carousel.json'
import TableViewCarouselData from 'data/products/database/table-view-carousel.json'
import HighlightsCards from '~/data/products/database/highlight-cards'

import { ArrowUpRight, X } from 'lucide-react'
import { PRODUCT_NAMES } from 'shared-data/products'
import { TweetCard } from 'ui-patterns/TweetCard'
import ProductsNav from '~/components/Products/ProductsNav'
import ProductHeader from '~/components/Sections/ProductHeader'

const NewFeatureCard = dynamic(() => import('~/components/NewFeatureCard'))
const ImageCarousel = dynamic(() => import('~/components/Carousels/ImageCarousel'))
const SplitCodeBlockCarousel = dynamic(
  () => import('~/components/Carousels/SplitCodeBlockCarousel')
)
const FeatureColumn = dynamic(() => import('~/components/FeatureColumn'))
const SingleQuote = dynamic(() => import('~/components/Sections/SingleQuote'))
const DefaultLayout = dynamic(() => import('~/components/Layouts/Default'))
const SectionContainer = dynamic(() => import('~/components/Layouts/SectionContainer'))
const ProductIcon = dynamic(() => import('~/components/ProductIcon'))
const APISection = dynamic(() => import('~/components/Sections/APISection'))
const GithubExamples = dynamic(() => import('~/components/Sections/GithubExamples'))

function Database() {
  // base path for images
  const { basePath } = useRouter()

  const [dashboardSwiper, setDashboardSwiper] = useState(undefined)
  const [dashboardSwiperActiveIndex, setDashboardSwiperActiveIndex] = useState(0)

  function handleDashboardSwiperNav(e: number) {
    setDashboardSwiperActiveIndex(e)
    // @ts-ignore
    dashboardSwiper.slideTo(e)
  }

  const meta_title = 'Database | Open source SQL Database'
  const meta_description =
    'With skybase’s APIs and easy to use dashboard, it makes designing relational databases easy.'

  return (
    <>
      <NextSeo
        title={meta_title}
        description={meta_description}
        openGraph={{
          title: meta_title,
          description: meta_description,
          url: `https://skybase.com/database`,
          images: [
            {
              url: `https://skybase.com${basePath}/images/product/database/database-og.jpg`,
            },
          ],
        }}
      />
      <DefaultLayout>
        <ProductsNav activePage={PRODUCT_NAMES.DATABASE} />
        <ProductHeader
          icon={MainProducts['database'].icon}
          title={MainProducts['database'].name}
          h1={[
            <span key={'database-h1'}>
              It’s just Postgres
              <br /> (without the hassle)
            </span>,
          ]}
          subheader={[
            'Every Skybase project is a dedicated Postgres database, trusted by millions of developers.',
            "Postgres is one of the world's most scalable databases.",
          ]}
          image={[
            <Image
              src={{
                dark: `${basePath}/images/product/database/header--dark-2.png`,
                light: `${basePath}/images/product/database/header--light-2.png`,
              }}
              alt="database header"
              layout="responsive"
              width="1680"
              height="1116"
            />,
          ]}
          documentation_url={'/docs/guides/database'}
        />

        <SectionContainer>
          <div className="grid grid-cols-12">
            <div className="col-span-12 mb-10 lg:col-span-3 lg:mb-0">
              <div className="p mb-4 flex items-center space-x-2">
                <ProductIcon icon={MainProducts['database'].icon} />
                <X />
                <div className="flex w-fit items-center">
                  <NextImage
                    src={`${basePath}/images/product/database/postgresql-icon.svg`}
                    width={30}
                    height={30}
                    alt="Postgres icon"
                  />
                </div>
              </div>
              <h4 className="h4">Just Postgres</h4>
              <p className="p">Every Skybase project is a dedicated Postgres database.</p>
              <p className="p text-sm">
                100% portable. Bring your existing Postgres database, or migrate away at any time.
              </p>
            </div>
            <div className="col-span-12 mb-10 lg:col-span-3 lg:col-start-5 lg:mb-0">
              <div className="p mb-4 flex items-center space-x-2">
                <ProductIcon icon={MainProducts['database'].icon} />
                <X />
                <ProductIcon icon={MainProducts['authentication'].icon} />
              </div>

              <h4 className="h4">Secure by default</h4>
              <p className="p">Leveraging Postgres's proven Row Level Security.</p>
              <p className="p text-sm">
                Integrated with JWT authentication which controls exactly what your users can
                access.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-3 lg:col-start-9">
              <div className="p mb-4 flex items-center space-x-2">
                <ProductIcon icon={MainProducts['database'].icon} />
                <X />
                <ProductIcon icon={'M13 10V3L4 14h7v7l9-11h-7z'} />
              </div>

              <h4 className="h4">Realtime enabled</h4>
              <p className="p">Data-change listeners over websockets.</p>
              <p className="p text-sm">
                Subscribe and react to database changes, milliseconds after they happen.
              </p>
            </div>
          </div>
        </SectionContainer>

        <SingleQuote
          id="quote"
          quote={{
            text: 'You can have a really great product, but you need to want to work with the people behind it. With Skybase, we always felt very aligned.',
            author: 'Howard Haynes',
            role: 'CPO at Next Door Lending',
            link: '/customers/next-door-lending',
            logo: (
              <NextImage
                draggable={false}
                src="/images/blog/avatars/howard-haynes.webp"
                alt="Howard Haynes, CPO at Next Door Lending"
                className="w-10 h-10 rounded-full overflow-hidden object-cover"
                width={28}
                height={28}
              />
            ),
          }}
        />

        <SectionContainer className="grid lg:grid-cols-2 gap-2 lg:gap-4">
          <NewFeatureCard {...HighlightsCards.branching} />
          <NewFeatureCard {...HighlightsCards.readReplicas} />
        </SectionContainer>

        {/* <SectionContainer>÷ */}
        <SectionContainer className="text-center md:pb-0 lg:pb-0">
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-8 lg:col-start-3">
              <h2 className="h3">Easy to use dashboard</h2>

              <p className="p">
                The simplicity of a Table Editor, or the power of a SQL editor. Your choice.
              </p>
            </div>
          </div>
        </SectionContainer>
        <div className="grid">
          <div className={'dashboard-tabs sbui-tabs--underline-alt'}>
            <Tabs
              size="xlarge"
              activeId={dashboardSwiperActiveIndex.toString()}
              onChange={(e: string) => handleDashboardSwiperNav(Number(e))}
              type="underlined"
              tabBarStyle={{
                marginBottom: 0,
                // borderBottom: '1px solid #dedede',
              }}
              // block
            >
              <Tabs.Panel id="0" label="Table editor">
                <span></span>
              </Tabs.Panel>
              <Tabs.Panel id="1" label="SQL editor">
                <span></span>
              </Tabs.Panel>
            </Tabs>
          </div>
        </div>

        <Swiper
          // @ts-ignore
          onSwiper={setDashboardSwiper}
          style={{ overflow: 'hidden' }}
          initialSlide={0}
          spaceBetween={0}
          slidesPerView={1}
          speed={300}
          allowTouchMove={false}
        >
          <div className="grid grid-cols-12">
            <SwiperSlide key={0}>
              <SectionContainer className="pt-16 pb-0">
                <ImageCarousel
                  content={TableViewCarouselData}
                  footer={[
                    <TweetCard
                      handle="@Elsolo244"
                      key="@Elsolo244"
                      img_url={`${basePath}/images/twitter-profiles/v6citnk33y2wpeyzrq05_400x400.jpeg`}
                      quote="Where has @skybase been all my life? 😍"
                    />,
                  ]}
                />
              </SectionContainer>
            </SwiperSlide>
            <SwiperSlide key={1}>
              <SectionContainer className="pt-16 pb-0">
                <ImageCarousel
                  content={SqlViewCarouselData}
                  footer={[
                    <TweetCard
                      handle="@jim_bisenius"
                      key="@jim_bisenius"
                      img_url={`${basePath}/images/twitter-profiles/rLgwUZSB_400x400.jpg`}
                      quote="@MongoDB or @MySQL?!?! Please, let me introduce you to @skybase and the wonderful world of @Postgres before it's too late!!"
                    />,
                  ]}
                />
              </SectionContainer>
            </SwiperSlide>
          </div>
        </Swiper>

        <SectionContainer className="-mb-48">
          <APISection
            // @ts-ignore
            content={ApiExamplesData}
            title="Never write an API again"
            text={[
              <p key={0}>
                We introspect your database and provide instant APIs. Focus on building your
                product, while Skybase handles the CRUD.
              </p>,
            ]}
            footer={[
              <div className="grid grid-cols-12" key={0}>
                <div className="col-span-12 mt-0 flex flex-col 2xl:flex-row lg:col-span-6 xl:col-span-12 xl:mb-8 gap-1">
                  <p className="text-foreground-light m-0">Available libraries:</p>
                  <div className="flex gap-1">
                    <Link href="/docs/reference/javascript/introduction" target="_blank">
                      <Badge>Javascript</Badge>
                    </Link>
                    <Link href="/docs/reference/dart/introduction" target="_blank">
                      <Badge>Flutter</Badge>
                    </Link>
                    <Link href="/docs/reference/python/introduction" target="_blank">
                      <Badge>Python</Badge>
                    </Link>
                    <Link href="/docs/reference/csharp/introduction" target="_blank">
                      <Badge>C#</Badge>
                    </Link>
                    <Link href="/docs/reference/kotlin/introduction" target="_blank">
                      <Badge>Kotlin</Badge>
                    </Link>
                    <Link href="/docs/reference/swift/introduction" target="_blank">
                      <Badge>Swift</Badge>
                    </Link>
                  </div>
                </div>
              </div>,
            ]}
            documentation_link={'/docs/guides/database'}
          />
        </SectionContainer>

        <div className="relative">
          <div className="section--masked">
            <div className="section--bg-masked">
              <div className="section--bg border-t border-b border-control"></div>
            </div>
            <div className="section-container pt-12 pb-0">
              <div className="overflow-x-hidden">
                <SectionContainer className="mb-0 pb-8 lg:pt-32">
                  <GithubExamples />
                </SectionContainer>
              </div>
            </div>
          </div>
        </div>

        <SectionContainer>
          <div className="grid grid-cols-12 lg:gap-16">
            <div className="col-span-12 mb-8 lg:col-span-6 xl:col-span-5">
              <h2 className="h3">Extend your database</h2>

              <p className="p">Skybase works natively with Postgres extensions.</p>
              <p className="p">
                Choose from a huge collection of Postgres extensions, enabled with a single click.
              </p>

              <FeatureColumn
                title="40+ preinstalled extensions"
                text="We only show a few of the extensions supported by Skybase here, but we preinstall many more that you can use right away."
              />
              <Button asChild size="small" type="default" icon={<ArrowUpRight />}>
                <Link href="/docs/guides/database">Explore documentation</Link>
              </Button>
            </div>
            <div className="col-span-12 mt-8 lg:col-span-6 lg:col-start-7 lg:mt-0">
              <SplitCodeBlockCarousel
                // @ts-ignore
                content={ExtensionsExamplesData}
              />
            </div>
          </div>
        </SectionContainer>
      </DefaultLayout>
    </>
  )
}

export default Database
