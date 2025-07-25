import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { Session } from '@skybase/skybase-js'
import { LW12_DATE, LW12_TITLE, LW_URL, SITE_ORIGIN } from '~/lib/constants'
import skybase from '~/lib/skybase'

import DefaultLayout from '~/components/Layouts/Default'
import { TicketState, ConfDataContext, UserData } from '~/components/LaunchWeek/hooks/use-conf-data'
import SectionContainer from '~/components/Layouts/SectionContainer'
import LWStickyNav from '~/components/LaunchWeek/12/Releases/LWStickyNav'
import LWHeader from '~/components/LaunchWeek/12/Releases/LWHeader'
import MainStage from '~/components/LaunchWeek/12/Releases/MainStage'

const BuildStage = dynamic(() => import('~/components/LaunchWeek/12/Releases/BuildStage'))
const CTABanner = dynamic(() => import('~/components/CTABanner'))
const LaunchWeekPrizeSection = dynamic(
  () => import('~/components/LaunchWeek/12/LaunchWeekPrizeSection')
)
const LW12Meetups = dynamic(() => import('~/components/LaunchWeek/12/LWMeetups'))

export default function LaunchWeekIndex() {
  const { query } = useRouter()

  const TITLE = `${LW12_TITLE} | ${LW12_DATE}`
  const DESCRIPTION = 'Join us for a week of announcing new features, every day at 7 AM PT.'
  const OG_IMAGE = `${SITE_ORIGIN}/images/launchweek/12/lw12-og.png?lw=12`

  const ticketNumber = query.ticketNumber?.toString()
  const [session, setSession] = useState<Session | null>(null)
  const [showCustomizationForm, setShowCustomizationForm] = useState<boolean>(false)

  const defaultUserData = {
    id: query.id?.toString(),
    ticket_number: ticketNumber ? parseInt(ticketNumber, 10) : undefined,
    name: query.name?.toString(),
    username: query.username?.toString(),
    platinum: !!query.platinum,
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
          url: LW_URL,
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
        <DefaultLayout>
          <LWStickyNav />
          <LWHeader />
          <MainStage className="relative z-10" />
          <BuildStage />
          <SectionContainer id="meetups" className="scroll-mt-[60px] lw-nav-anchor">
            <LW12Meetups meetups={[]} />
          </SectionContainer>
          <SectionContainer className="!pt-8 scroll-mt-[60px] lw-nav-anchor" id="awards">
            <LaunchWeekPrizeSection />
          </SectionContainer>
          <CTABanner />
        </DefaultLayout>
      </ConfDataContext.Provider>
    </>
  )
}
