'use client'

import type { User } from '@skybase/skybase-js'
import { LogOut, Globe, LifeBuoy, Settings, UserIcon, Database } from 'lucide-react'
import { logOut } from 'common'

import type { menuItem } from 'ui-patterns/AuthenticatedDropdownMenu'
import { IconGitHub } from './MenuIcons'

const useDropdownMenu = (user: User | null) => {
  const menu: menuItem[][] = [
    [
      {
        label: user?.email ?? "You're logged in",
        type: 'text',
        icon: UserIcon,
      },
      {
        label: 'Account Preferences',
        icon: Settings,
        href: 'https://skybase.com/dashboard/account/me',
      },
      {
        label: 'All Projects',
        icon: Database,
        href: 'https://skybase.com/dashboard/projects',
      },
    ],
    [
      {
        label: 'Skybase.com',
        icon: Globe,
        href: 'https://skybase.com',
        otherProps: {
          target: '_blank',
          rel: 'noreferrer noopener',
        },
      },
      {
        label: 'GitHub',
        icon: IconGitHub as any,
        href: 'https://github.com/skybase/skybase',
        otherProps: {
          target: '_blank',
          rel: 'noreferrer noopener',
        },
      },
      {
        label: 'Support',
        icon: LifeBuoy,
        href: 'https://skybase.com/support',
        otherProps: {
          target: '_blank',
          rel: 'noreferrer noopener',
        },
      },
    ],
    [
      {
        label: 'Theme',
        type: 'theme',
      },
    ],
    [
      {
        label: 'Logout',
        type: 'button',
        icon: LogOut,
        onClick: async () => {
          await logOut()
          window.location.reload()
        },
      },
    ],
  ]

  return menu
}

export default useDropdownMenu
