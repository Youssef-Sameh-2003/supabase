import { PermissionAction } from '@skybase/shared-types/out/constants'
import { useRouter } from 'next/router'
import {
  DragEvent,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'

import { ChartConfig } from 'components/interfaces/SQLEditor/UtilityPanel/ChartConfig'
import { useSendEventMutation } from 'data/telemetry/send-event-mutation'
import { useCheckPermissions } from 'hooks/misc/useCheckPermissions'
import { useSelectedOrganization } from 'hooks/misc/useSelectedOrganization'
import { useSelectedProject } from 'hooks/misc/useSelectedProject'
import { useProfile } from 'lib/profile'
import Link from 'next/link'
import { useAiAssistantStateSnapshot } from 'state/ai-assistant-state'
import { Dashboards } from 'types'
import {
  Badge,
  Button,
  cn,
  CodeBlock,
  CodeBlockLang,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogTrigger,
} from 'ui'
import { DebouncedComponent } from '../DebouncedComponent'
import { EdgeFunctionBlock } from '../EdgeFunctionBlock/EdgeFunctionBlock'
import { QueryBlock } from '../QueryBlock/QueryBlock'
import { AssistantSnippetProps } from './AIAssistant.types'
import { identifyQueryType } from './AIAssistant.utils'
import { CollapsibleCodeBlock } from './CollapsibleCodeBlock'
import { MessageContext } from './Message'
import { defaultUrlTransform } from './Message.utils'

export const OrderedList = memo(({ children }: { children: ReactNode }) => (
  <ol className="flex flex-col gap-y-4">{children}</ol>
))
OrderedList.displayName = 'OrderedList'

export const ListItem = memo(({ children }: { children: ReactNode }) => (
  <li className="[&>pre]:mt-2">{children}</li>
))
ListItem.displayName = 'ListItem'

export const Heading3 = memo(({ children }: { children: ReactNode }) => (
  <h3 className="underline">{children}</h3>
))
Heading3.displayName = 'Heading3'

export const InlineCode = memo(
  ({ className, children }: { className?: string; children: ReactNode }) => (
    <code className={cn('text-xs', className)}>{children}</code>
  )
)
InlineCode.displayName = 'InlineCode'

export const Hyperlink = memo(({ href, children }: { href?: string; children: ReactNode }) => {
  const isExternalURL = !href?.startsWith('https://skybase.com/dashboard')
  const safeUrl = defaultUrlTransform(href ?? '')
  const isSafeUrl = safeUrl.length > 0

  if (!isSafeUrl) {
    return <span className="text-foreground">{children}</span>
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span
          className={cn(
            '!m-0 text-foreground cursor-pointer transition',
            'underline underline-offset-2 decoration-foreground-muted hover:decoration-foreground-lighter'
          )}
        >
          {children}
        </span>
      </DialogTrigger>
      <DialogContent size="small">
        <DialogHeader className="border-b">
          <DialogTitle>Verify the link before navigating</DialogTitle>
        </DialogHeader>

        <DialogSection className="flex flex-col">
          <p className="text-sm text-foreground-light">
            This link will take you to the following URL:
          </p>
          <p className="text-sm text-foreground">{safeUrl}</p>
          <p className="text-sm text-foreground-light mt-2">Are you sure you want to head there?</p>
        </DialogSection>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="default" className="opacity-100">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button asChild type="primary" className="opacity-100">
              {isExternalURL ? (
                <a href={safeUrl} target="_blank" rel="noreferrer noopener">
                  Head to link
                </a>
              ) : (
                <Link href={safeUrl}>Head to link</Link>
              )}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
})
Hyperlink.displayName = 'Hyperlink'

const MemoizedQueryBlock = memo(
  ({
    sql,
    title,
    xAxis,
    yAxis,
    isChart,
    isLoading,
    isDraggable,
    runQuery,
    results,
    onRunQuery,
    onResults,
    onDragStart,
    onUpdateChartConfig,
  }: {
    sql: string
    title: string
    xAxis?: string
    yAxis?: string
    isChart: boolean
    isLoading: boolean
    isDraggable: boolean
    runQuery: boolean
    results?: any[]
    onRunQuery: (queryType: 'select' | 'mutation') => void
    onResults: (results: any[]) => void
    onDragStart: (e: DragEvent<Element>) => void
    onUpdateChartConfig?: ({
      chart,
      chartConfig,
    }: {
      chart?: Partial<Dashboards.Chart>
      chartConfig: Partial<ChartConfig>
    }) => void
  }) => (
    <DebouncedComponent
      delay={isLoading ? 500 : 0}
      value={sql}
      fallback={
        <div className="bg-surface-100 border-overlay rounded border shadow-sm px-3 py-2 text-xs">
          Writing SQL...
        </div>
      }
    >
      <QueryBlock
        lockColumns
        showRunButtonIfNotReadOnly
        label={title}
        sql={sql}
        chartConfig={{
          type: 'bar',
          cumulative: false,
          xKey: xAxis ?? '',
          yKey: yAxis ?? '',
          view: isChart ? 'chart' : 'table',
        }}
        tooltip={
          isDraggable ? (
            <div className="flex items-center gap-x-2">
              <Badge variant="success" className="text-xs rounded px-1">
                NEW
              </Badge>
              <p>Drag to add this chart into your custom report</p>
            </div>
          ) : undefined
        }
        showSql={!isChart}
        isChart={isChart}
        isLoading={isLoading}
        draggable={isDraggable}
        runQuery={runQuery}
        results={results}
        onRunQuery={onRunQuery}
        onResults={onResults}
        onDragStart={onDragStart}
        onUpdateChartConfig={onUpdateChartConfig}
      />
    </DebouncedComponent>
  )
)
MemoizedQueryBlock.displayName = 'MemoizedQueryBlock'

export const MarkdownPre = ({
  children,
  id,
  onResults,
}: {
  children: any
  id: string
  onResults: ({
    messageId,
    resultId,
    results,
  }: {
    messageId: string
    resultId?: string
    results: any[]
  }) => void
}) => {
  const router = useRouter()
  const { profile } = useProfile()
  const { isLoading, readOnly } = useContext(MessageContext)
  const { mutate: sendEvent } = useSendEventMutation()
  const snap = useAiAssistantStateSnapshot()
  const project = useSelectedProject()
  const org = useSelectedOrganization()

  const canCreateSQLSnippet = useCheckPermissions(PermissionAction.CREATE, 'user_content', {
    resource: { type: 'sql', owner_id: profile?.id },
    subject: { id: profile?.id },
  })

  // [Joshen] Using a ref as this data doesn't need to trigger a re-render
  const chartConfig = useRef<ChartConfig>({
    view: 'table',
    type: 'bar',
    xKey: '',
    yKey: '',
    cumulative: false,
  })

  const language = children[0].props.className?.replace('language-', '') || 'sql'
  const rawContent = children[0].props.children[0]
  const propsMatch = rawContent.match(/(?:--|\/\/)\s*props:\s*(\{[^}]+\})/)

  const snippetProps: AssistantSnippetProps = useMemo(() => {
    try {
      if (propsMatch) {
        return JSON.parse(propsMatch[1])
      }
    } catch {}
    return {}
  }, [propsMatch])

  const { xAxis, yAxis } = snippetProps
  const snippetId = snippetProps.id
  const title = snippetProps.title || (language === 'edge' ? 'Edge Function' : 'SQL Query')
  const isChart = snippetProps.isChart === 'true'
  const runQuery = snippetProps.runQuery === 'true'
  const results = snap.getCachedSQLResults({ messageId: id, snippetId })

  // Strip props from the content for both SQL and edge functions
  const cleanContent = rawContent.replace(/(?:--|\/\/)\s*props:\s*\{[^}]+\}/, '').trim()

  const isDraggableToReports = canCreateSQLSnippet && router.pathname.endsWith('/reports/[id]')

  useEffect(() => {
    chartConfig.current = {
      ...chartConfig.current,
      view: isChart ? 'chart' : 'table',
      xKey: xAxis ?? '',
      yKey: yAxis ?? '',
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snippetProps])

  const onResultsReturned = useCallback(
    (results: any[]) => {
      onResults({ messageId: id, resultId: snippetProps.id, results })
    },
    [onResults, snippetProps.id]
  )

  const onRunQuery = async (queryType: 'select' | 'mutation') => {
    sendEvent({
      action: 'assistant_suggestion_run_query_clicked',
      properties: {
        queryType,
        ...(queryType === 'mutation'
          ? { category: identifyQueryType(cleanContent) ?? 'unknown' }
          : {}),
      },
      groups: {
        project: project?.ref ?? 'Unknown',
        organization: org?.slug ?? 'Unknown',
      },
    })
  }

  return (
    <div className="w-auto overflow-x-hidden not-prose">
      {language === 'edge' ? (
        <EdgeFunctionBlock
          label={title}
          code={cleanContent}
          functionName={snippetProps.name || 'my-function'}
          showCode={!readOnly}
        />
      ) : language === 'sql' ? (
        readOnly ? (
          <CollapsibleCodeBlock value={cleanContent} language="sql" hideLineNumbers />
        ) : (
          <MemoizedQueryBlock
            sql={cleanContent}
            title={title}
            xAxis={xAxis}
            yAxis={yAxis}
            isChart={isChart}
            isLoading={isLoading}
            isDraggable={isDraggableToReports}
            runQuery={!results && runQuery}
            results={results}
            onRunQuery={onRunQuery}
            onResults={onResultsReturned}
            onUpdateChartConfig={({ chartConfig: config }) => {
              chartConfig.current = { ...chartConfig.current, ...config }
            }}
            onDragStart={(e: DragEvent<Element>) => {
              e.dataTransfer.setData(
                'application/json',
                JSON.stringify({ label: title, sql: cleanContent, config: chartConfig.current })
              )
            }}
          />
        )
      ) : (
        <CodeBlock
          hideLineNumbers
          value={cleanContent}
          language={language as CodeBlockLang}
          className={cn(
            'max-h-96 max-w-none block border rounded !bg-transparent !py-3 !px-3.5 prose dark:prose-dark text-foreground',
            '[&>code]:m-0 [&>code>span]:flex [&>code>span]:flex-wrap [&>code]:block [&>code>span]:text-foreground'
          )}
        />
      )}
    </div>
  )
}
