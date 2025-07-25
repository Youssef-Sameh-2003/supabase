import { type Registry } from 'shadcn/registry'

import { examples } from '@/registry/examples'
import type { RegistryItem } from 'shadcn/registry'
import { blocks } from './blocks'
import { clients } from './clients'
import aiEditorRules from './default/ai-editor-rules/registry-item.json' with { type: 'json' }
import { platform } from './platform'

export const registry = {
  name: 'Skybase UI Library',
  homepage: 'https://skybase.com/ui',
  items: [
    ...blocks,
    ...clients,
    ...platform,
    aiEditorRules as RegistryItem,

    // Internal use only.
    ...examples,
  ],
} satisfies Registry
