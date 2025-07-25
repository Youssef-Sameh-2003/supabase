import { DatabaseUpgradeProgress, DatabaseUpgradeStatus } from '@skybase/shared-types/out/events'
import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import {
  AlertCircle,
  Check,
  CheckCircle,
  Circle,
  Loader,
  Maximize2,
  Minimize2,
  Settings,
} from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { useParams } from 'common'
import { useProjectUpgradingStatusQuery } from 'data/config/project-upgrade-status-query'
import { invalidateProjectDetailsQuery } from 'data/projects/project-detail-query'
import { IS_PLATFORM } from 'lib/constants'
import { Button, Tooltip, TooltipContent, TooltipTrigger } from 'ui'
import { useProjectContext } from '../ProjectContext'
import { DATABASE_UPGRADE_MESSAGES } from './UpgradingState.constants'

const UpgradingState = () => {
  const { ref } = useParams()
  const queryParams = useSearchParams()
  const queryClient = useQueryClient()
  const { project } = useProjectContext()
  const [loading, setLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const { data } = useProjectUpgradingStatusQuery(
    {
      projectRef: ref,
      projectStatus: project?.status,
      trackingId: queryParams.get('trackingId'),
    },
    {
      enabled: IS_PLATFORM,
    }
  )

  const { initiated_at, status, progress, target_version, error } =
    data?.databaseUpgradeStatus ?? {}
  const progressStage = Number((progress || '').split('_')[0])

  const isFailed = status === DatabaseUpgradeStatus.Failed
  const isCompleted = status === DatabaseUpgradeStatus.Upgraded

  const isPerformingFullPhysicalBackup =
    status === DatabaseUpgradeStatus.Upgrading &&
    progress === DatabaseUpgradeProgress.CompletedUpgrade

  const initiatedAtUTC = dayjs.utc(initiated_at ?? 0).format('DD MMM YYYY HH:mm:ss')
  const initiatedAt = dayjs
    .utc(initiated_at ?? 0)
    .local()
    .format('DD MMM YYYY HH:mm:ss (ZZ)')

  const refetchProjectDetails = async () => {
    setLoading(true)

    if (ref) await invalidateProjectDetailsQuery(queryClient, ref)
  }

  const subject = 'Upgrade%20failed%20for%20project'
  const message = `Upgrade information:%0A• Initiated at: ${initiated_at}%0A• Target Version: ${target_version}%0A• Error: ${error}`

  return (
    <div className="w-full mx-auto my-16 space-y-16 max-w-7xl">
      <div className="mx-6 space-y-16">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-6">
          <h1 className="text-3xl">{project?.name}</h1>
        </div>
        <div className="w-full mx-auto mt-8 mb-16 max-w-7xl">
          <div className="flex h-[500px] items-center justify-center rounded border border-muted bg-surface-100 p-8">
            {isCompleted ? (
              <div className="grid gap-4">
                <div className="relative mx-auto max-w-[300px]">
                  <CheckCircle className="text-brand" size={40} strokeWidth={1.5} />
                </div>
                <div className="space-y-2">
                  <p className="text-center">Upgrade completed!</p>
                  <p className="mt-4 text-center text-sm text-foreground-light w-[300px] mx-auto">
                    Your project has been successfully upgraded to Postgres {target_version} and is
                    now back online.
                  </p>
                </div>
                <div className="mx-auto">
                  <Button loading={loading} disabled={loading} onClick={refetchProjectDetails}>
                    Return to project
                  </Button>
                </div>
              </div>
            ) : isFailed ? (
              <div className="grid gap-4">
                <div className="relative mx-auto max-w-[300px]">
                  <AlertCircle className="text-amber-900" size={40} strokeWidth={1.5} />
                </div>
                <div className="space-y-2">
                  <p className="text-center">We ran into an issue while upgrading your project</p>
                  <p className="mt-4 text-center text-sm text-foreground-light w-full md:w-[450px] mx-auto">
                    Your project is back online and its data is not affected. Please reach out to us
                    via our support form for assistance with the upgrade.
                  </p>
                </div>
                <div className="flex items-center mx-auto space-x-2">
                  <Button asChild type="default">
                    <Link
                      href={`/support/new?category=Database_unresponsive&ref=${ref}&subject=${subject}&message=${message}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Contact support
                    </Link>
                  </Button>
                  <Button loading={loading} disabled={loading} onClick={refetchProjectDetails}>
                    Return to project
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid w-[480px] gap-4">
                <div className="relative mx-auto max-w-[300px]">
                  <div className="absolute flex items-center justify-center w-full h-full">
                    <Settings className="animate-spin" size={20} strokeWidth={2} />
                  </div>
                  <Circle className="text-foreground-lighter" size={50} strokeWidth={1.5} />
                </div>
                <div className="space-y-2">
                  {isPerformingFullPhysicalBackup ? (
                    <div>
                      <p className="text-center">Performing a full backup</p>
                      <p className="text-sm text-center text-foreground-light">
                        Upgrade is now complete, and your project is online. A full backup is now
                        being performed to ensure that there is a proper base backup available
                        post-upgrade. This can take from a few minutes up to several hours depending
                        on the size of your database.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-center">Upgrading in progress</p>
                      <p className="text-sm text-center text-foreground-light">
                        Upgrades can take from a few minutes up to several hours depending on the
                        size of your database. Your project will be offline while it is being
                        upgraded.
                      </p>
                    </div>
                  )}

                  <div
                    className="!mt-4 !mb-2 py-3 px-4 transition-all overflow-hidden border rounded relative"
                    style={{ maxHeight: isExpanded ? '500px' : '110px' }}
                  >
                    {isExpanded ? (
                      <Minimize2
                        size={14}
                        strokeWidth={2}
                        className="absolute z-10 cursor-pointer top-3 right-3"
                        onClick={() => setIsExpanded(false)}
                      />
                    ) : (
                      <Maximize2
                        size={14}
                        strokeWidth={2}
                        className="absolute z-10 cursor-pointer top-3 right-3"
                        onClick={() => setIsExpanded(true)}
                      />
                    )}
                    <div
                      className="space-y-2 transition-all"
                      style={{
                        translate: isExpanded
                          ? '0px 0px'
                          : `0px ${
                              (progressStage - 2 <= 0
                                ? 0
                                : progressStage > 6
                                  ? 5
                                  : progressStage - 2) * -28
                            }px`,
                      }}
                    >
                      {DATABASE_UPGRADE_MESSAGES.map((message, idx: number) => {
                        const isCurrent = message.key === progress
                        const isCompleted = progressStage > idx
                        return (
                          <div key={message.key} className="flex items-center space-x-4">
                            {isCurrent ? (
                              <div className="flex items-center justify-center w-5 h-5 rounded-full">
                                <Loader
                                  size={20}
                                  className="animate-spin text-foreground-light"
                                  strokeWidth={2}
                                />
                              </div>
                            ) : isCompleted ? (
                              <div className="flex items-center justify-center w-5 h-5 border rounded-full bg-brand border-brand">
                                <Check size={12} className="text-white" strokeWidth={3} />
                              </div>
                            ) : (
                              <div className="flex items-center justify-center w-5 h-5 border rounded-full bg-overlay-hover" />
                            )}
                            <p
                              className={`text-sm ${
                                isCurrent
                                  ? 'text-foreground'
                                  : isCompleted
                                    ? 'text-foreground-light'
                                    : 'text-foreground-lighter'
                              } hover:text-foreground transition`}
                            >
                              {isCurrent
                                ? message.progress
                                : isCompleted
                                  ? message.completed
                                  : message.initial}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {initiated_at !== undefined && (
                    <Tooltip>
                      <TooltipTrigger>
                        <p className="text-sm text-center text-foreground-light">
                          Started on: {initiatedAtUTC} (UTC)
                        </p>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">{initiatedAt}</TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpgradingState
