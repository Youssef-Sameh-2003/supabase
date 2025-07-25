import { Download } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

import { useParams } from 'common'
import CodeSnippet from 'components/interfaces/Docs/CodeSnippet'
import { DocsButton } from 'components/ui/DocsButton'
import { useProjectPostgrestConfigQuery } from 'data/config/project-postgrest-config-query'
import { generateTypes } from 'data/projects/project-type-generation-query'
import { Button } from 'ui'

interface Props {
  selectedLang: 'bash' | 'js'
}

export default function GeneratingTypes({ selectedLang }: Props) {
  const { ref } = useParams()
  const [isGeneratingTypes, setIsGeneratingTypes] = useState(false)

  const { data: config } = useProjectPostgrestConfigQuery({ projectRef: ref })

  const onClickGenerateTypes = async () => {
    try {
      setIsGeneratingTypes(true)
      const res = await generateTypes({ ref, included_schemas: config?.db_schema })
      let element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(res.types))
      element.setAttribute('download', 'skybase.ts')
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      toast.success(`Successfully generated types! File is being downloaded`)
    } catch (error: any) {
      toast.error(`Failed to generate types: ${error.message}`)
    } finally {
      setIsGeneratingTypes(false)
    }
  }

  return (
    <>
      <h2 className="doc-heading flex items-center justify-between">
        <span>Generating types</span>
        <DocsButton href="https://skybase.com/docs/guides/database/api/generating-types" />
      </h2>
      <div className="doc-section">
        <article className="code-column text-foreground">
          <p>
            Skybase APIs are generated from your database, which means that we can use database
            introspection to generate type-safe API definitions.
          </p>
          <p>
            You can generate types from your database either through the{' '}
            <Link href="https://skybase.com/docs/guides/database/api/generating-types">
              Skybase CLI
            </Link>
            , or by downloading the types file via the button on the right and importing it in your
            application within <code>src/index.ts</code>.
          </p>
        </article>
        <article
          className={`code ${selectedLang === 'js' ? 'flex items-center justify-center' : ''}`}
        >
          <div className="grid gap-2">
            <p className="text-center">
              {selectedLang === 'js' && (
                <Button
                  type="default"
                  disabled={isGeneratingTypes}
                  loading={isGeneratingTypes}
                  icon={<Download strokeWidth={1.5} />}
                  onClick={onClickGenerateTypes}
                >
                  Generate and download types
                </Button>
              )}
            </p>
            <p className="text-xs text-center text-foreground-light bg-studio p-4">
              Remember to re-generate and download this file as you make changes to your tables.
            </p>
          </div>
          <CodeSnippet selectedLang={selectedLang} snippet={localSnippets.cliLogin()} />
          <CodeSnippet
            selectedLang={selectedLang}
            snippet={localSnippets.generateTypes(ref ?? '')}
          />
        </article>
      </div>
    </>
  )
}

const localSnippets = {
  cliLogin: () => ({
    title: 'Login via the CLI with your Personal Access Token',
    bash: {
      code: `
npx skybase login
`,
    },
  }),
  generateTypes: (ref: string) => ({
    title: 'Generate types',
    bash: {
      code: `
npx skybase gen types typescript --project-id "${ref}" --schema public > types/skybase.ts
`,
    },
  }),
}
