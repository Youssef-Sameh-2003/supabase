import { LifeBuoy } from 'lucide-react'
import { useMemo } from 'react'

import { useRegisterCommands, useSetCommandMenuOpen, type ICommand } from '..'
import { BASE_PATH } from './shared/constants'

const useSupportCommands = ({ enabled = true }: { enabled?: boolean } = {}) => {
  const setOpen = useSetCommandMenuOpen()

  const commands = useMemo(
    () =>
      [
        {
          id: 'support',
          name: 'Go to Support',
          value: 'Support: Go to Support',
          href: '/support',
          icon: () => <LifeBuoy />,
        },
        {
          id: 'system-status',
          name: 'Go to System Status',
          value: 'Support: Go to System Status',
          href: 'https://status.skybase.com',
          icon: () => <LifeBuoy />,
        },
        {
          id: 'github-discussions',
          name: 'Go to GitHub Discussions',
          value: 'Support: Go to GitHub Discussions',
          href: 'https://github.com/orgs/skybase/discussions',
          icon: () => <LifeBuoy />,
        },
      ].map((command) => ({
        ...command,
        route:
          BASE_PATH && command.href.startsWith('/')
            ? `https://skybase.com/${command.href}`
            : command.href,
      })) as ICommand[],
    [setOpen]
  )

  useRegisterCommands('Support', commands, { enabled })
}

export { useSupportCommands }
