import { InformationCircleIcon } from '@heroicons/react/16/solid'
import { X } from 'lucide-react'
import { parseAsString, useQueryStates } from 'nuqs'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

import { LOCAL_STORAGE_KEYS, useParams } from 'common'
import { useProjectContext } from 'components/layouts/ProjectLayout/ProjectContext'
import { useReadReplicasQuery } from 'data/read-replicas/replicas-query'
import { formatDatabaseID } from 'data/read-replicas/replicas.utils'
import { executeSql } from 'data/sql/execute-sql-query'
import { DbQueryHook } from 'hooks/analytics/useDbQuery'
import { useLocalStorageQuery } from 'hooks/misc/useLocalStorage'
import { IS_PLATFORM } from 'lib/constants'
import { useDatabaseSelectorStateSnapshot } from 'state/database-selector'
import {
  Button,
  LoadingLine,
  TabsList_Shadcn_,
  TabsTrigger_Shadcn_,
  Tabs_Shadcn_,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  cn,
} from 'ui'
import ConfirmationModal from 'ui-patterns/Dialogs/ConfirmationModal'
import ShimmeringLoader from 'ui-patterns/ShimmeringLoader'
import { Markdown } from '../Markdown'
import { useQueryPerformanceQuery } from '../Reports/Reports.queries'
import { PresetHookResult } from '../Reports/Reports.utils'
import { QUERY_PERFORMANCE_REPORT_TYPES } from './QueryPerformance.constants'
import { QueryPerformanceFilterBar } from './QueryPerformanceFilterBar'
import { QueryPerformanceGrid } from './QueryPerformanceGrid'

interface QueryPerformanceProps {
  queryHitRate: PresetHookResult
  queryPerformanceQuery: DbQueryHook<any>
}

export const QueryPerformance = ({
  queryHitRate,
  queryPerformanceQuery,
}: QueryPerformanceProps) => {
  const { ref } = useParams()
  const { project } = useProjectContext()
  const state = useDatabaseSelectorStateSnapshot()

  const [{ preset }, setSearchParams] = useQueryStates({
    sort: parseAsString,
    search: parseAsString,
    order: parseAsString,
    preset: parseAsString.withDefault(QUERY_PERFORMANCE_REPORT_TYPES.MOST_TIME_CONSUMING),
  })

  const { isLoading, isRefetching } = queryPerformanceQuery
  const isPrimaryDatabase = state.selectedDatabaseId === ref
  const formattedDatabaseId = formatDatabaseID(state.selectedDatabaseId ?? '')

  const [showResetgPgStatStatements, setShowResetgPgStatStatements] = useState(false)

  const [showBottomSection, setShowBottomSection] = useLocalStorageQuery(
    LOCAL_STORAGE_KEYS.QUERY_PERF_SHOW_BOTTOM_SECTION,
    true
  )

  const handleRefresh = () => {
    queryPerformanceQuery.runQuery()
    queryHitRate.runQuery()
  }

  const { data: databases } = useReadReplicasQuery({ projectRef: ref })

  const { data: mostTimeConsumingQueries, isLoading: isLoadingMTC } = useQueryPerformanceQuery({
    preset: 'mostTimeConsuming',
  })
  const { data: mostFrequentlyInvoked, isLoading: isLoadingMFI } = useQueryPerformanceQuery({
    preset: 'mostFrequentlyInvoked',
  })
  const { data: slowestExecutionTime, isLoading: isLoadingMMF } = useQueryPerformanceQuery({
    preset: 'slowestExecutionTime',
  })

  const QUERY_PERFORMANCE_TABS = useMemo(() => {
    return [
      {
        id: QUERY_PERFORMANCE_REPORT_TYPES.MOST_TIME_CONSUMING,
        label: 'Most time consuming',
        description: 'Lists queries ordered by their cumulative total execution time.',
        isLoading: isLoadingMTC,
        max:
          (mostTimeConsumingQueries ?? []).length > 0
            ? Math.max(...(mostTimeConsumingQueries ?? []).map((x: any) => x.total_time)).toFixed(2)
            : undefined,
      },
      {
        id: QUERY_PERFORMANCE_REPORT_TYPES.MOST_FREQUENT,
        label: 'Most frequent',
        description: 'Lists queries in order of their execution count',
        isLoading: isLoadingMFI,
        max:
          (mostFrequentlyInvoked ?? []).length > 0
            ? Math.max(...(mostFrequentlyInvoked ?? []).map((x: any) => x.calls)).toFixed(2)
            : undefined,
      },
      {
        id: QUERY_PERFORMANCE_REPORT_TYPES.SLOWEST_EXECUTION,
        label: 'Slowest execution',
        description: 'Lists queries ordered by their maximum execution time',
        isLoading: isLoadingMMF,
        max:
          (slowestExecutionTime ?? []).length > 0
            ? Math.max(...(slowestExecutionTime ?? []).map((x: any) => x.max_time)).toFixed(2)
            : undefined,
      },
    ]
  }, [
    isLoadingMFI,
    isLoadingMMF,
    isLoadingMTC,
    mostFrequentlyInvoked,
    mostTimeConsumingQueries,
    slowestExecutionTime,
  ])

  useEffect(() => {
    state.setSelectedDatabaseId(ref)
  }, [ref])

  return (
    <>
      <Tabs_Shadcn_
        value={preset}
        defaultValue={preset}
        onValueChange={(value) => setSearchParams({ preset: value })}
      >
        <TabsList_Shadcn_ className={cn('flex gap-0 border-0 items-end z-10')}>
          {QUERY_PERFORMANCE_TABS.map((tab) => {
            const tabMax = Number(tab.max)
            const maxValue =
              tab.id !== QUERY_PERFORMANCE_REPORT_TYPES.MOST_FREQUENT
                ? tabMax > 1000
                  ? (tabMax / 1000).toFixed(2)
                  : tabMax.toFixed(0)
                : tabMax.toLocaleString()

            return (
              <TabsTrigger_Shadcn_
                key={tab.id}
                value={tab.id}
                className={cn(
                  'group relative',
                  'px-6 py-3 border-b-0 flex flex-col items-start !shadow-none border-default border-t',
                  'even:border-x last:border-r even:!border-x-strong last:!border-r-strong',
                  tab.id === preset ? '!bg-surface-200' : '!bg-surface-200/[33%]',
                  'hover:!bg-surface-100',
                  'data-[state=active]:!bg-surface-200',
                  'hover:text-foreground-light',
                  'transition'
                )}
              >
                {tab.id === preset && (
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-foreground" />
                )}

                <div className="flex items-center gap-x-2">
                  <span className="">{tab.label}</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InformationCircleIcon className="transition text-foreground-muted w-3 h-3 data-[state=delayed-open]:text-foreground-light" />
                    </TooltipTrigger>
                    <TooltipContent side="top">{tab.description}</TooltipContent>
                  </Tooltip>
                </div>
                {tab.isLoading ? (
                  <ShimmeringLoader className="w-32 pt-1" />
                ) : tab.max === undefined ? (
                  <span className="text-xs text-foreground-muted group-hover:text-foreground-lighter group-data-[state=active]:text-foreground-lighter transition">
                    No data yet
                  </span>
                ) : (
                  <span className="text-xs text-foreground-muted group-hover:text-foreground-lighter group-data-[state=active]:text-foreground-lighter transition">
                    {maxValue}
                    {tab.id !== QUERY_PERFORMANCE_REPORT_TYPES.MOST_FREQUENT
                      ? tabMax > 1000
                        ? 's'
                        : 'ms'
                      : ' calls'}
                  </span>
                )}

                {tab.id === preset && (
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-surface-200"></div>
                )}
              </TabsTrigger_Shadcn_>
            )
          })}
        </TabsList_Shadcn_>
      </Tabs_Shadcn_>

      <QueryPerformanceFilterBar
        queryPerformanceQuery={queryPerformanceQuery}
        onResetReportClick={() => setShowResetgPgStatStatements(true)}
      />
      <LoadingLine loading={isLoading || isRefetching} />

      <QueryPerformanceGrid queryPerformanceQuery={queryPerformanceQuery} />

      <div
        className={cn('px-6 py-6 flex gap-x-4 border-t relative', {
          hidden: showBottomSection === false,
        })}
      >
        <Button
          className="absolute top-1.5 right-3 px-1.5"
          type="text"
          size="tiny"
          onClick={() => setShowBottomSection(false)}
        >
          <X size="14" />
        </Button>
        <div className="w-[33%] flex flex-col gap-y-1 text-sm">
          <p>Reset report</p>
          <p className="text-xs text-foreground-light">
            Consider resetting the analysis after optimizing any queries
          </p>
          <Button
            type="default"
            className="!mt-3 w-min"
            onClick={() => setShowResetgPgStatStatements(true)}
          >
            Reset report
          </Button>
        </div>

        <div className="w-[33%] flex flex-col gap-y-1 text-sm">
          <p>How is this report generated?</p>
          <Markdown
            className="text-xs"
            content="This report uses the pg_stat_statements table, and pg_stat_statements extension. [Learn more here](https://skybase.com/docs/guides/platform/performance#examining-query-performance)."
          />
        </div>

        <div className="w-[33%] flex flex-col gap-y-1 text-sm">
          <p>Inspect your database for potential issues</p>
          <Markdown
            className="text-xs"
            content="The Skybase CLI comes with a range of tools to help inspect your Postgres instances for
            potential issues. [Learn more here](https://skybase.com/docs/guides/database/inspect)."
          />
        </div>
      </div>

      <ConfirmationModal
        visible={showResetgPgStatStatements}
        size="medium"
        variant="destructive"
        title="Reset query performance analysis"
        confirmLabel="Reset report"
        confirmLabelLoading="Resetting report"
        onCancel={() => setShowResetgPgStatStatements(false)}
        onConfirm={async () => {
          const connectionString = databases?.find(
            (db) => db.identifier === state.selectedDatabaseId
          )?.connectionString

          if (IS_PLATFORM && !connectionString) {
            return toast.error('Unable to run query: Connection string is missing')
          }

          try {
            await executeSql({
              projectRef: project?.ref,
              connectionString,
              sql: `SELECT pg_stat_statements_reset();`,
            })
            handleRefresh()
            setShowResetgPgStatStatements(false)
          } catch (error: any) {
            toast.error(`Failed to reset analysis: ${error.message}`)
          }
        }}
      >
        <p className="text-foreground-light text-sm">
          This will reset the pg_stat_statements table in the extensions schema on your{' '}
          <span className="text-foreground">
            {isPrimaryDatabase ? 'primary database' : `read replica (ID: ${formattedDatabaseId})`}
          </span>
          , which is used to calculate query performance. This data will repopulate immediately
          after.
        </p>
      </ConfirmationModal>
    </>
  )
}
