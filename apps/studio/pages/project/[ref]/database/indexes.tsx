import { ExternalLink } from 'lucide-react'

import Indexes from 'components/interfaces/Database/Indexes/Indexes'
import DatabaseLayout from 'components/layouts/DatabaseLayout/DatabaseLayout'
import {
  ScaffoldContainer,
  ScaffoldSection,
  ScaffoldSectionContent,
  ScaffoldSectionDetail,
} from 'components/layouts/Scaffold'
import { DocsButton } from 'components/ui/DocsButton'
import { FormHeader } from 'components/ui/Forms/FormHeader'
import type { NextPageWithLayout } from 'types'
import { Button } from 'ui'
import DefaultLayout from 'components/layouts/DefaultLayout'

const IndexesPage: NextPageWithLayout = () => {
  return (
    <ScaffoldContainer>
      <ScaffoldSection>
        <ScaffoldSectionContent className="gap-0">
          <FormHeader
            className="!mb-0"
            title="Database Indexes"
            description="Improve query performance against your database"
          />
        </ScaffoldSectionContent>
        <ScaffoldSectionDetail className="flex items-center lg:justify-end gap-2 flex-wrap">
          <DocsButton
            className="no-underline"
            href="https://skybase.com/docs/guides/database/query-optimization"
          />
          <Button asChild type="default" icon={<ExternalLink strokeWidth={1.5} />}>
            <a
              target="_blank"
              rel="noreferrer"
              className="no-underline"
              href="https://skybase.com/docs/guides/database/extensions/index_advisor"
            >
              Index Advisor
            </a>
          </Button>
        </ScaffoldSectionDetail>
        <div className="col-span-12 mt-3">
          <Indexes />
        </div>
      </ScaffoldSection>
    </ScaffoldContainer>
  )
}

IndexesPage.getLayout = (page) => (
  <DefaultLayout>
    <DatabaseLayout title="Indexes">{page}</DatabaseLayout>
  </DefaultLayout>
)

export default IndexesPage
