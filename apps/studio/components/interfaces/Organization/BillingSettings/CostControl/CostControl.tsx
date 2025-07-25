import { PermissionAction } from '@skybase/shared-types/out/constants'
import { ExternalLink } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'

import { useParams } from 'common'
import {
  ScaffoldSection,
  ScaffoldSectionContent,
  ScaffoldSectionDetail,
} from 'components/layouts/Scaffold'
import AlertError from 'components/ui/AlertError'
import NoPermission from 'components/ui/NoPermission'
import ShimmeringLoader from 'components/ui/ShimmeringLoader'
import { useOrgSubscriptionQuery } from 'data/subscriptions/org-subscription-query'
import { useAsyncCheckProjectPermissions } from 'hooks/misc/useCheckPermissions'
import { useFlag } from 'hooks/ui/useFlag'
import { BASE_PATH } from 'lib/constants'
import { useOrgSettingsPageStateSnapshot } from 'state/organization-settings'
import { Alert, Button } from 'ui'
import ProjectUpdateDisabledTooltip from '../ProjectUpdateDisabledTooltip'
import SpendCapSidePanel from './SpendCapSidePanel'

export interface CostControlProps {}

const CostControl = ({}: CostControlProps) => {
  const { slug } = useParams()
  const { resolvedTheme } = useTheme()

  const { isSuccess: isPermissionsLoaded, can: canReadSubscriptions } =
    useAsyncCheckProjectPermissions(PermissionAction.BILLING_READ, 'stripe.subscriptions')

  const snap = useOrgSettingsPageStateSnapshot()
  const projectUpdateDisabled = useFlag('disableProjectCreationAndUpdate')
  const {
    data: subscription,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useOrgSubscriptionQuery({ orgSlug: slug }, { enabled: canReadSubscriptions })

  const currentPlan = subscription?.plan
  const isUsageBillingEnabled = subscription?.usage_billing_enabled ?? false

  const canChangeTier =
    !projectUpdateDisabled && !['team', 'enterprise'].includes(currentPlan?.id || '')

  return (
    <>
      <ScaffoldSection>
        <ScaffoldSectionDetail>
          <div className="sticky space-y-6 top-12">
            <div className="space-y-2">
              <p className="text-foreground text-base m-0">Cost Control</p>
              <p className="text-sm text-foreground-light m-0">
                Allow scaling beyond your plan's{' '}
                <Link
                  href={`/org/${slug}/usage`}
                  className="text-green-900 transition hover:text-green-1000"
                >
                  included quota
                </Link>
                .
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-foreground-light m-0">More information</p>
              <div>
                <Link
                  href="https://skybase.com/docs/guides/platform/cost-control#spend-cap"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex items-center space-x-2 opacity-50 hover:opacity-100 transition">
                    <p className="text-sm m-0">Spend cap</p>
                    <ExternalLink size={16} strokeWidth={1.5} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </ScaffoldSectionDetail>
        <ScaffoldSectionContent>
          {isPermissionsLoaded && !canReadSubscriptions ? (
            <NoPermission resourceText="update this organization's cost control" />
          ) : (
            <>
              {isLoading && (
                <div className="space-y-2">
                  <ShimmeringLoader />
                  <ShimmeringLoader className="w-3/4" />
                  <ShimmeringLoader className="w-1/2" />
                </div>
              )}

              {isError && <AlertError subject="Failed to retrieve subscription" error={error} />}

              {isSuccess && (
                <div className="space-y-6">
                  {['team', 'enterprise'].includes(currentPlan?.id || '') ? (
                    <Alert
                      withIcon
                      variant="info"
                      title={`You will be charged for any additional usage on the ${
                        currentPlan?.name || ''
                      } plan`}
                    >
                      {currentPlan?.name || ''} plan requires you to have spend cap off at all
                      times. Your projects will never become unresponsive. Only when your{' '}
                      <Link
                        href={`/org/${slug}/usage`}
                        className="text-green-900 transition hover:text-green-1000"
                      >
                        included usage
                      </Link>{' '}
                      is exceeded will you be charged for any additional usage.
                    </Alert>
                  ) : (
                    <p className="text-sm text-foreground-light">
                      If you need to go beyond the included quota, simply switch off your spend cap
                      to pay for additional usage.
                    </p>
                  )}

                  <div className="flex flex-col md:flex-row gap-6">
                    <div>
                      <div className="rounded-md bg-surface-200 w-[160px] h-[96px] shadow">
                        <Image
                          alt="Spend Cap"
                          width={160}
                          height={96}
                          src={
                            isUsageBillingEnabled
                              ? `${BASE_PATH}/img/spend-cap-off${
                                  resolvedTheme?.includes('dark') ? '' : '--light'
                                }.png?v=3`
                              : `${BASE_PATH}/img/spend-cap-on${
                                  resolvedTheme?.includes('dark') ? '' : '--light'
                                }.png?v=3`
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <p className="mb-1">
                        Spend cap is {isUsageBillingEnabled ? 'disabled' : 'enabled'}
                      </p>
                      <p className="text-sm text-foreground-light">
                        {isUsageBillingEnabled ? (
                          <span>You will be charged for usage beyond the included quota.</span>
                        ) : (
                          <span>
                            You won't be charged any extra for usage. However, your projects could
                            become unresponsive or enter read only mode if you exceed the included
                            quota.
                          </span>
                        )}
                      </p>
                      <ProjectUpdateDisabledTooltip projectUpdateDisabled={projectUpdateDisabled}>
                        <Button
                          type="default"
                          className="mt-4 pointer-events-auto"
                          disabled={!canChangeTier}
                          onClick={() => snap.setPanelKey('costControl')}
                        >
                          Change spend cap
                        </Button>
                      </ProjectUpdateDisabledTooltip>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </ScaffoldSectionContent>
      </ScaffoldSection>
      <SpendCapSidePanel />
    </>
  )
}

export default CostControl
