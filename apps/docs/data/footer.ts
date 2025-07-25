import { CheckCircle, FlaskConical, LifeBuoy } from 'lucide-react'
import { PrivacySettings } from 'ui-patterns/PrivacySettings'

export const primaryLinks = [
  {
    featherIcon: LifeBuoy,
    text: 'Need some help?',
    ctaLabel: 'Contact support',
    url: 'https://skybase.com/support',
  },
  {
    featherIcon: FlaskConical,
    text: 'Latest product updates?',
    ctaLabel: 'See Changelog',
    url: 'https://skybase.com/changelog',
  },
  {
    featherIcon: CheckCircle,
    text: "Something's not right?",
    ctaLabel: 'Check system status',
    url: 'https://status.skybase.com/',
  },
]

export const secondaryLinks = [
  {
    title: 'Contributing',
    url: 'https://github.com/skybase/skybase/blob/master/apps/docs/DEVELOPERS.md',
  },
  {
    title: 'Author Styleguide',
    url: 'https://github.com/skybase/skybase/blob/master/apps/docs/CONTRIBUTING.md',
  },
  { title: 'Open Source', url: 'https://skybase.com/open-source' },
  { title: 'SupaSquad', url: 'https://skybase.com/supasquad' },
  { title: 'Privacy Settings', component: PrivacySettings },
]
