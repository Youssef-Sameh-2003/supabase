import { LifeBuoy } from 'lucide-react'
import { useMemo } from 'react'

import { IS_PLATFORM } from 'common'
import type { ICommand } from 'ui-patterns/CommandMenu'
import { useRegisterCommands } from 'ui-patterns/CommandMenu'
import { COMMAND_MENU_SECTIONS } from './CommandMenu.utils'

const useSupportCommands = () => {
  const commands = useMemo(
    () =>
      [
        {
          id: 'support',
          name: 'Support',
          route: 'https://www.skybase.com/support',
          icon: () => <LifeBuoy />,
        },
        {
          id: 'system-status',
          name: 'System Status',
          value: 'Support: System Status',
          route: 'https://status.skybase.com',
          icon: () => <LifeBuoy />,
        },
        {
          id: 'github-discussions',
          name: 'GitHub Discussions',
          value: 'Support: GitHub Discussions',
          route: 'https://github.com/orgs/skybase/discussions',
          icon: () => <LifeBuoy />,
          defaultHidden: true,
        },
      ] as Array<ICommand>,
    []
  )

  useRegisterCommands(COMMAND_MENU_SECTIONS.SUPPORT, commands, { enabled: IS_PLATFORM })
}

export { useSupportCommands }
