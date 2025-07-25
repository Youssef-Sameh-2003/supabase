import {
  ScaffoldSection,
  ScaffoldSectionContent,
  ScaffoldSectionDetail,
} from 'components/layouts/Scaffold'
import { ExternalLink } from 'lucide-react'
import { Button } from 'ui'

const TIA = () => {
  return (
    <ScaffoldSection>
      <ScaffoldSectionDetail className="sticky space-y-6 top-12">
        <p className="text-base m-0">Transfer Impact Assessment (TIA)</p>
        <div className="space-y-2 text-sm text-foreground-light m-0">
          <p>
            All organizations can access and use our TIA as part of their GDPR-compliant data
            transfer process.
          </p>
        </div>
      </ScaffoldSectionDetail>
      <ScaffoldSectionContent className="flex items-center justify-center h-full">
        <a
          href="https://skybase.com/downloads/docs/Skybase+TIA+250314.pdf"
          target="_blank"
          rel="noreferrer noopener"
          download={true}
        >
          <Button type="default" iconRight={<ExternalLink />}>
            View TIA
          </Button>
        </a>
      </ScaffoldSectionContent>
    </ScaffoldSection>
  )
}

export default TIA
