import { useParams } from 'common'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { AlertDescription_Shadcn_, AlertTitle_Shadcn_, Alert_Shadcn_, Button } from 'ui'

import OrganizationPicker from 'components/interfaces/Integrations/Vercel/OrganizationPicker'
import { Markdown } from 'components/interfaces/Markdown'
import { getHasInstalledObject } from 'components/layouts/IntegrationsLayout/Integrations.utils'
import VercelIntegrationWindowLayout from 'components/layouts/IntegrationsLayout/VercelIntegrationWindowLayout'
import { ScaffoldColumn, ScaffoldContainer } from 'components/layouts/Scaffold'
import { useIntegrationsQuery } from 'data/integrations/integrations-query'
import { useVercelIntegrationCreateMutation } from 'data/integrations/vercel-integration-create-mutation'
import { useOrganizationsQuery } from 'data/organizations/organizations-query'
import { useIntegrationInstallationSnapshot } from 'state/integration-installation'
import type { NextPageWithLayout, Organization } from 'types'
import { AlertTriangle, Info } from 'lucide-react'

/**
 * Variations of the Vercel integration flow.
 * They require different UI and logic.
 *
 * Deploy Button - the flow that starts from the Deploy Button - https://vercel.com/docs/integrations#deploy-button
 * Marketplace - the flow that starts from the Marketplace - https://vercel.com/integrations
 *
 */
export type VercelIntegrationFlow = 'deploy-button' | 'marketing'

const VercelIntegration: NextPageWithLayout = () => {
  const router = useRouter()
  const { code, configurationId, teamId, source, externalId } = useParams()
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null)

  const snapshot = useIntegrationInstallationSnapshot()

  /**
   * Fetch the list of organization based integration installations for Vercel.
   *
   * Array of integrations installed on all
   */
  const { data: integrationData } = useIntegrationsQuery()

  const {
    data: organizationsData,
    isLoading: isLoadingOrganizationsQuery,
    isSuccess: isOrganizationsDataSuccess,
  } = useOrganizationsQuery()

  useEffect(() => {
    if (organizationsData !== undefined && integrationData !== undefined) {
      const firstOrg = organizationsData[0]

      if (firstOrg && selectedOrg === null) {
        setSelectedOrg(firstOrg)
        router.query.organizationSlug = firstOrg.slug
      }
    }
  }, [organizationsData, integrationData])

  /**
   * Organizations with extra `installationInstalled` attribute
   *
   * Used to show label/badge and allow/disallow installing
   *
   */
  const installed = useMemo(
    () =>
      integrationData && organizationsData
        ? getHasInstalledObject({
            integrationName: 'Vercel',
            integrationData,
            organizationsData,
            installationId: configurationId,
          })
        : {},
    [configurationId, integrationData, organizationsData]
  )

  /**
   * Handle the correct route change based on whether the vercel integration
   * is following the 'marketplace/external' flow or 'deploy button' flow.
   * See:
   * - https://vercel.com/docs/integrations/create-integration/submit-integration#query-parameters-for-marketplace
   * - https://vercel.com/docs/integrations/create-integration/submit-integration#query-parameters-for-external-flow
   * - https://vercel.com/docs/integrations/create-integration/submit-integration#query-parameters-for-deploy-button
   */
  function handleRouteChange() {
    const orgSlug = selectedOrg?.slug

    switch (source) {
      case 'deploy-button': {
        router.push({
          pathname: `/integrations/vercel/${orgSlug}/deploy-button/new-project`,
          query: router.query,
        })
        break
      }
      case 'marketplace':
      case 'external': {
        router.push({
          pathname: `/integrations/vercel/${orgSlug}/marketplace/choose-project`,
          query: router.query,
        })
        break
      }
      default:
        toast.error(
          `Unsupported Vercel installation source: ${source}. Please contact support if this error persists.`
        )
    }
  }

  const { mutate, isLoading: isLoadingVercelIntegrationCreateMutation } =
    useVercelIntegrationCreateMutation({
      onMutate() {
        snapshot.setLoading(true)
      },
      onSuccess() {
        handleRouteChange()
        snapshot.setLoading(false)
      },
      onError(error) {
        toast.error(`Creating Vercel integration failed: ${error.message}`)
      },
    })

  function onInstall() {
    const orgSlug = selectedOrg?.slug

    const isIntegrationInstalled = orgSlug ? installed[orgSlug] : false

    if (!orgSlug) {
      return toast.error('Please select an organization')
    }

    if (!code) {
      return toast.error('Vercel code missing')
    }

    if (!configurationId) {
      return toast.error('Vercel Configuration ID missing')
    }

    if (!source) {
      return toast.error('Vercel Configuration source missing')
    }

    /**
     * Only install if integration hasn't already been installed
     */
    if (!isIntegrationInstalled) {
      mutate({
        code,
        configurationId,
        orgSlug,
        metadata: {},
        source,
        teamId: teamId,
      })
    } else {
      handleRouteChange()
    }
  }

  const dataLoading = isLoadingVercelIntegrationCreateMutation || isLoadingOrganizationsQuery

  const noOrganizations = useMemo(() => {
    return isOrganizationsDataSuccess && organizationsData?.length === 0 ? true : false
  }, [isOrganizationsDataSuccess, organizationsData])

  const alreadyInstalled = useMemo(() => {
    return selectedOrg && installed[selectedOrg.slug] && source === 'marketplace' && !dataLoading
      ? true
      : false
  }, [installed, selectedOrg, source, dataLoading])

  const disableInstallationForm =
    (isLoadingVercelIntegrationCreateMutation && !dataLoading) ||
    // disables installation button if integration is already installed and it is Marketplace flow
    alreadyInstalled ||
    noOrganizations

  const isLoading = useMemo(() => {
    return isLoadingVercelIntegrationCreateMutation || isLoadingOrganizationsQuery
  }, [isLoadingVercelIntegrationCreateMutation, isLoadingOrganizationsQuery])

  return (
    <>
      <ScaffoldContainer className="flex flex-col gap-6 grow py-8">
        <ScaffoldColumn className="mx-auto w-full max-w-md">
          <h1 className="text-xl text-foreground">Choose organization</h1>
          <>
            <Markdown content={`Choose the Skybase organization you wish to install in`} />
            <OrganizationPicker
              integrationName="Vercel"
              selectedOrg={selectedOrg}
              disabled={noOrganizations || isLoading}
              onSelectedOrgChange={(org) => {
                setSelectedOrg(org)
                router.query.organizationSlug = org.slug
              }}
              configurationId={configurationId}
            />
            {alreadyInstalled && (
              <Alert_Shadcn_ variant="warning">
                <AlertTriangle className="h-4 w-4" strokeWidth={2} />
                <AlertTitle_Shadcn_>Vercel Integration is already installed.</AlertTitle_Shadcn_>
                <AlertDescription_Shadcn_>
                  You will need to choose another organization to install the integration.
                </AlertDescription_Shadcn_>
              </Alert_Shadcn_>
            )}
            {noOrganizations && (
              <Alert_Shadcn_ variant="warning">
                <AlertTriangle className="h-4 w-4" strokeWidth={2} />
                <AlertTitle_Shadcn_>
                  No Skybase Organizations to install Integration.
                </AlertTitle_Shadcn_>
                <AlertDescription_Shadcn_ className="prose">
                  You will need to create a Skybase Organization before you can install the Vercel
                  Integration. You can create a new organization{' '}
                  <Link href="https://skybase.com/dashboard/new" target="_blank">
                    here
                  </Link>
                  .
                </AlertDescription_Shadcn_>
              </Alert_Shadcn_>
            )}
            <div className="flex flex-row w-full justify-end">
              <Button
                size="medium"
                className="self-end"
                disabled={disableInstallationForm || isLoadingVercelIntegrationCreateMutation}
                loading={isLoadingVercelIntegrationCreateMutation}
                onClick={onInstall}
              >
                Install integration
              </Button>
            </div>
          </>
        </ScaffoldColumn>
      </ScaffoldContainer>
      <ScaffoldContainer className="flex flex-col gap-6 py-3">
        <Alert_Shadcn_ variant="default">
          <Info className="h-4 w-4" strokeWidth={2} />
          <AlertTitle_Shadcn_>You can uninstall this Integration at any time.</AlertTitle_Shadcn_>
          <AlertDescription_Shadcn_>
            Remove this integration at any time from Vercel or the Skybase dashboard.
          </AlertDescription_Shadcn_>
        </Alert_Shadcn_>
      </ScaffoldContainer>
    </>
  )
}

VercelIntegration.getLayout = (page) => (
  <VercelIntegrationWindowLayout>{page}</VercelIntegrationWindowLayout>
)

export default VercelIntegration
