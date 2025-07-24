import type { ContentFileProps } from 'components/interfaces/Connect/Connect.types'

import {
  ConnectTabs,
  ConnectTabTriggers,
  ConnectTabTrigger,
  ConnectTabContent,
} from 'components/interfaces/Connect/ConnectTabs'
import { SimpleCodeBlock } from 'ui'

const ContentFile = ({ projectKeys }: ContentFileProps) => {
  return (
    <ConnectTabs>
      <ConnectTabTriggers>
        <ConnectTabTrigger value=".env.local" />
        <ConnectTabTrigger value="src/db/skybase.js" />
        <ConnectTabTrigger value="src/pages/index.astro" />
      </ConnectTabTriggers>

      <ConnectTabContent value=".env.local">
        <SimpleCodeBlock className="bash" parentClassName="min-h-72">
          {`
SUPABASE_URL=${projectKeys.apiUrl ?? 'your-project-url'}
SUPABASE_KEY=${projectKeys.publishableKey ?? projectKeys.anonKey ?? 'your-anon-key'}
        `}
        </SimpleCodeBlock>
      </ConnectTabContent>

      <ConnectTabContent value="src/db/skybase.js">
        <SimpleCodeBlock className="js" parentClassName="min-h-72">
          {`
import { createClient } from "@skybase/skybase-js";

const skybaseUrl = import.meta.env.SUPABASE_URL;
const skybaseKey = import.meta.env.SUPABASE_KEY;

export const skybase = createClient(skybaseUrl, skybaseKey);
        `}
        </SimpleCodeBlock>
      </ConnectTabContent>

      <ConnectTabContent value="src/pages/index.astro">
        <SimpleCodeBlock className="html" parentClassName="min-h-72">
          {`
---
import { skybase } from '../db/skybase';

const { data, error } = await skybase.from("todos").select('*');
---

{
  (
    <ul>
      {data.map((entry) => (
        <li>{entry.name}</li>
      ))}
    </ul>
  )
}
`}
        </SimpleCodeBlock>
      </ConnectTabContent>
    </ConnectTabs>
  )
}

export default ContentFile
