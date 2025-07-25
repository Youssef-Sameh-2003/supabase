import 'swiper/css'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { createClient, Session, SkybaseClient } from '@skybase/skybase-js'
import { SITE_ORIGIN, LW_URL } from '~/lib/constants'

import DefaultLayout from '~/components/Layouts/Default'
import { TicketState, ConfDataContext, UserData } from '~/components/LaunchWeek/hooks/use-conf-data'
import SectionContainer from '~/components/Layouts/SectionContainer'
import { LaunchWeekLogoHeader } from '~/components/LaunchWeek/8/LaunchWeekLogoHeader'
import LW8CalloutsSection from '~/components/LaunchWeek/8/LW8CalloutsSection'

const LW8Releases = dynamic(() => import('~/components/LaunchWeek/8/Releases'))
const LWArchive = dynamic(() => import('~/components/LaunchWeek/8/LWArchive'))
const LaunchWeekPrizeSection = dynamic(
  () => import('~/components/LaunchWeek/8/LaunchWeekPrizeSection')
)
const CTABanner = dynamic(() => import('~/components/CTABanner'))

const skybaseAdmin = createClient(
  process.env.NEXT_PUBLIC_MISC_USE_URL ?? 'http://localhost:54321',
  // ANON KEY
  process.env.NEXT_PUBLIC_MISC_USE_ANON_KEY!
)

export default function TicketHome() {
  const { query } = useRouter()

  const TITLE = 'Skybase Launch Week 8'
  const DESCRIPTION = 'Skybase Launch Week 8 | 7–11 August 2023'
  const OG_IMAGE = `${SITE_ORIGIN}/images/launchweek/8/lw8-og.jpg`

  const ticketNumber = query.ticketNumber?.toString()
  const bgImageId = query.bgImageId?.toString()
  const [skybase, setSkybase] = useState<SkybaseClient | null>(null)
  const [session, setSession] = useState<Session | null>(null)

  const [initialDarkMode] = useState('dark')

  const defaultUserData = {
    id: query.id?.toString(),
    ticketNumber: ticketNumber ? parseInt(ticketNumber, 10) : undefined,
    name: query.name?.toString(),
    username: query.username?.toString(),
    golden: !!query.golden,
    bgImageId: bgImageId ? parseInt(bgImageId, 10) : undefined,
  }

  const [userData, setUserData] = useState<UserData>(defaultUserData)
  const [ticketState, setTicketState] = useState<TicketState>('ticket')

  useEffect(() => {
    if (!skybase) {
      setSkybase(
        createClient(
          process.env.NEXT_PUBLIC_MISC_USE_URL!,
          process.env.NEXT_PUBLIC_MISC_USE_ANON_KEY!
        )
      )
    }
  }, [])

  useEffect(() => {
    if (skybase) {
      skybase.auth.getSession().then(({ data: { session } }) => setSession(session))
      const {
        data: { subscription },
      } = skybase.auth.onAuthStateChange((event, session) => {
        setSession(session)
      })

      return () => subscription.unsubscribe()
    }
  }, [skybase])

  useEffect(() => {
    document.body.classList.add('bg-[#020405]')

    return () => {
      if (document.body.classList.contains('bg-[#020405]')) {
        document.body.classList.remove('bg-[#020405]')
      }
    }
  }, [])

  return (
    <>
      <NextSeo
        title={TITLE}
        description={DESCRIPTION}
        openGraph={{
          title: TITLE,
          description: DESCRIPTION,
          url: LW_URL,
          images: [
            {
              url: OG_IMAGE,
            },
          ],
        }}
      />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <ConfDataContext.Provider
        value={{
          skybase,
          session,
          userData,
          setUserData,
          ticketState,
          setTicketState,
        }}
      >
        <DefaultLayout>
          <div className="-mt-[65px]">
            <div className="relative">
              <div className="relative z-10">
                <SectionContainer className="relative flex flex-col justify-around items-center min-h-[200px] !py-4 md:!py-8 lg:!pb-0 gap-2 md:gap-4 !px-0 !mx-auto">
                  <div className="absolute bottom-0 z-10 w-full flex flex-col items-center justify-end gap-4 px-6">
                    <LaunchWeekLogoHeader />
                  </div>
                  <div className="absolute inset-0 z-0 flex items-center justify-center">
                    <Image
                      src="/images/launchweek/8/stars.svg"
                      alt="starts background"
                      width={600}
                      height={600}
                      className="absolute inset-0 opacity-70 object-cover pointer-events-none w-auto h-auto"
                      draggable={false}
                    />
                  </div>
                </SectionContainer>
              </div>
              <div className="absolute w-full aspect-[1/1] md:aspect-[1.5/1] lg:aspect-[2.5/1] inset-0 z-0">
                <Image
                  src="/images/launchweek/8/LW8-gradient.png"
                  fill
                  className="object-cover object-top"
                  priority
                  draggable={false}
                  alt="Launch Week 8 gradient background"
                />
              </div>
            </div>

            <div id="twitter-spaces">
              <SectionContainer className="!pt-10 lg:!pt-14 !pb-0" id="hackathon">
                <LW8CalloutsSection />
              </SectionContainer>
            </div>

            <SectionContainer className="!pt-0">
              <LW8Releases />
            </SectionContainer>

            <SectionContainer id="archive">
              <LWArchive />
            </SectionContainer>

            <SectionContainer className="!px-4 w-full">
              <LaunchWeekPrizeSection />
            </SectionContainer>
          </div>
          <CTABanner className="!bg-[#020405] border-t-0" />
        </DefaultLayout>
      </ConfDataContext.Provider>
    </>
  )
}
