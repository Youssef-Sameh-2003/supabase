import dayjs from 'dayjs'
import { Check, Clipboard } from 'lucide-react'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { useParams } from 'common/hooks'
import { useProjectContext } from 'components/layouts/ProjectLayout/ProjectContext'
import Table from 'components/to-be-cleaned/Table'
import { useCustomDomainsQuery } from 'data/custom-domains/custom-domains-query'
import type { EdgeFunctionsResponse } from 'data/edge-functions/edge-functions-query'
import { copyToClipboard, Tooltip, TooltipContent, TooltipTrigger } from 'ui'

interface EdgeFunctionsListItemProps {
  function: EdgeFunctionsResponse
}

export const EdgeFunctionsListItem = ({ function: item }: EdgeFunctionsListItemProps) => {
  const router = useRouter()
  const { ref } = useParams()
  const { project } = useProjectContext()
  const [isCopied, setIsCopied] = useState(false)

  const { data: customDomainData } = useCustomDomainsQuery({ projectRef: ref })

  // get the .co or .net TLD from the restUrl
  const restUrl = project?.restUrl
  const restUrlTld = restUrl !== undefined ? new URL(restUrl).hostname.split('.').pop() : 'co'
  const functionUrl = `https://${ref}.skybase.${restUrlTld}/functions/v1/${item.slug}`

  const endpoint =
    customDomainData?.customDomain?.status === 'active'
      ? `https://${customDomainData.customDomain.hostname}/functions/v1/${item.slug}`
      : functionUrl

  return (
    <Table.tr
      key={item.id}
      onClick={() => {
        router.push(`/project/${ref}/functions/${item.slug}`)
      }}
    >
      <Table.td>
        <div className="flex items-center gap-2">
          <p className="text-sm text-foreground">{item.name}</p>
        </div>
      </Table.td>
      <Table.td>
        <div className="text-xs text-foreground-light flex gap-2 items-center truncate">
          <p title={endpoint} className="font-mono truncate hidden md:inline max-w-[30rem]">
            {endpoint}
          </p>
          <button
            type="button"
            className="text-foreground-lighter hover:text-foreground transition"
            onClick={(event: any) => {
              function onCopy(value: any) {
                setIsCopied(true)
                copyToClipboard(value)
                setTimeout(() => setIsCopied(false), 3000)
              }
              event.stopPropagation()
              onCopy(endpoint)
            }}
          >
            {isCopied ? (
              <div className="text-brand">
                <Check size={14} strokeWidth={3} />
              </div>
            ) : (
              <div className="relative">
                <div className="block">
                  <Clipboard size={14} strokeWidth={1.5} />
                </div>
              </div>
            )}
          </button>
        </div>
      </Table.td>
      <Table.td className="hidden 2xl:table-cell">
        <p className="text-foreground-light">
          {dayjs(item.created_at).format('DD MMM, YYYY HH:mm')}
        </p>
      </Table.td>
      <Table.td className="lg:table-cell">
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-foreground-light">{dayjs(item.updated_at).fromNow()}</p>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Last updated on {dayjs(item.updated_at).format('DD MMM, YYYY HH:mm')}
          </TooltipContent>
        </Tooltip>
      </Table.td>
      <Table.td className="lg:table-cell">
        <p className="text-foreground-light">{item.version}</p>
      </Table.td>
    </Table.tr>
  )
}
