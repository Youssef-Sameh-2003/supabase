import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { Session } from '@skybase/skybase-js'
import { SITE_ORIGIN } from '~/lib/constants'
import skybase from '~/lib/skybaseMisc'

import DefaultLayout from '~/components/Layouts/Default'
import { TicketState, ConfDataContext, UserData } from '~/components/LaunchWeek/hooks/use-conf-data'
import SectionContainer from '~/components/Layouts/SectionContainer'
import LW11StickyNav from '~/components/LaunchWeek/11/Releases/LW11StickyNav'
import LW11Header from '~/components/LaunchWeek/11/Releases/LW11Header'
import MainStage from '~/components/LaunchWeek/11/Releases/MainStage'

const BuildStage = dynamic(() => import('~/components/LaunchWeek/11/Releases/BuildStage'))
const LW11Meetups = dynamic(() => import('~/components/LaunchWeek/11/LW11Meetups'))
const LaunchWeekPrizeSection = dynamic(
  () => import('~/components/LaunchWeek/11/LaunchWeekPrizeSection')
)

export default function GAWeekIndex() {
  const { query } = useRouter()

  const TITLE = 'Skybase GA Week | 15-19 April 2024'
  const DESCRIPTION = 'Join us for a week of announcing new features, every day at 7 AM PT.'
  const OG_IMAGE = `${SITE_ORIGIN}/images/launchweek/11/lw11-og-ga.png`

  const ticketNumber = query.ticketNumber?.toString()
  const bgImageId = query.bgImageId?.toString()
  const [session, setSession] = useState<Session | null>(null)
  const [showCustomizationForm, setShowCustomizationForm] = useState<boolean>(false)

  const defaultUserData = {
    id: query.id?.toString(),
    ticketNumber: ticketNumber ? parseInt(ticketNumber, 10) : undefined,
    name: query.name?.toString(),
    username: query.username?.toString(),
    golden: !!query.golden,
    bgImageId: bgImageId ? parseInt(bgImageId, 10) : undefined,
  }

  const [userData, setUserData] = useState<UserData>(defaultUserData)
  const [ticketState, setTicketState] = useState<TicketState>('loading')

  useEffect(() => {
    if (skybase) {
      skybase.auth.getSession().then(({ data: { session } }) => setSession(session))
      const {
        data: { subscription },
      } = skybase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

      return () => subscription.unsubscribe()
    }
  }, [skybase])

  useEffect(() => {
    if (session?.user) {
      if (userData?.id) {
        return setTicketState('ticket')
      }
      return setTicketState('loading')
    }
    if (!session) return setTicketState('registration')
  }, [session, userData])

  return (
    <>
      <NextSeo
        title={TITLE}
        description={DESCRIPTION}
        openGraph={{
          title: TITLE,
          description: DESCRIPTION,
          url: 'https://skybase.com/ga-week',
          images: [
            {
              url: OG_IMAGE,
            },
          ],
        }}
      />
      <ConfDataContext.Provider
        value={{
          skybase,
          session,
          userData,
          setUserData,
          ticketState,
          setTicketState,
          showCustomizationForm,
          setShowCustomizationForm,
        }}
      >
        <DefaultLayout className="bg-alternative">
          <LW11StickyNav />
          <LW11Header className="pb-20 z-0" />
          <MainStage className="relative -mt-20 z-10" />
          <BuildStage />
          <SectionContainer id="meetups" className="scroll-mt-[66px]">
            <LW11Meetups meetups={[]} />
          </SectionContainer>
          <SectionContainer className="lg:pb-40" id="awards">
            <LaunchWeekPrizeSection />
          </SectionContainer>
        </DefaultLayout>
      </ConfDataContext.Provider>
    </>
  )
}
