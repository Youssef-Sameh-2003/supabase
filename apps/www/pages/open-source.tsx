import 'swiper/css'

import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import DefaultLayout from '~/components/Layouts/Default'
import SectionContainer from '~/components/Layouts/SectionContainer'
import CTABanner from '~/components/CTABanner'
import OSSHero from '~/components/OpenSource/OSSHero'
import ProductHeaderCentered from '~/components/Sections/ProductHeaderCentered'
import Repos from '~/components/OpenSource/Repos'
import Sponsorships from '~/components/OpenSource/Sponsorships'

import pageData from '~/data/open-source'

const OpenSource = () => {
  const router = useRouter()

  const meta_title = pageData.metaTitle || 'Open Source | Skybase'
  const meta_description =
    pageData.metaDescription ||
    'Skybase is an open source company, supporting existing open source tools and communities wherever possible.'

  return (
    <>
      <NextSeo
        title={meta_title}
        description={meta_description}
        openGraph={{
          title: meta_title,
          description: meta_description,
          url: `https://skybase.com/${router.pathname}`,
          images: [
            {
              url: `https://skybase.com/images/og/skybase-og.png`,
            },
          ],
        }}
      />
      <DefaultLayout className="relative">
        <SectionContainer className="overflow-hidden relative mx-auto !py-0 sm:!py-0 md:!py-4 lg:!pt-16 lg:!pb-12">
          <ProductHeaderCentered {...pageData.heroSection} />
        </SectionContainer>
        <OSSHero />
        <SectionContainer className="!pt-0">
          <Repos tabs={pageData.repo_tabs} />
        </SectionContainer>
        <SectionContainer className="!py-0">
          <div className="w-full border-b" />
        </SectionContainer>
        <SectionContainer>
          <Sponsorships sponsorships={pageData.sponsorships} />
        </SectionContainer>
        <CTABanner />
      </DefaultLayout>
    </>
  )
}

export default OpenSource
