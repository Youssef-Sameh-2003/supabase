import { PermissionAction } from '@skybase/shared-types/out/constants'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { useParams } from 'common'
import {
  ScaffoldSection,
  ScaffoldSectionDescription,
  ScaffoldSectionTitle,
} from 'components/layouts/Scaffold'
import AlertError from 'components/ui/AlertError'
import { DocsButton } from 'components/ui/DocsButton'
import { InlineLink } from 'components/ui/InlineLink'
import { useDeleteThirdPartyAuthIntegrationMutation } from 'data/third-party-auth/integration-delete-mutation'
import {
  ThirdPartyAuthIntegration,
  useThirdPartyAuthIntegrationsQuery,
} from 'data/third-party-auth/integrations-query'
import { useCheckPermissions } from 'hooks/misc/useCheckPermissions'
import { cn } from 'ui'
import ConfirmationModal from 'ui-patterns/Dialogs/ConfirmationModal'
import { AddIntegrationDropdown } from './AddIntegrationDropdown'
import { CreateAuth0IntegrationDialog } from './CreateAuth0Dialog'
import { CreateAwsCognitoAuthIntegrationDialog } from './CreateAwsCognitoAuthDialog'
import { CreateClerkAuthIntegrationDialog } from './CreateClerkAuthDialog'
import { CreateFirebaseAuthIntegrationDialog } from './CreateFirebaseAuthDialog'
import { CreateWorkOSIntegrationDialog } from './CreateWorkOSDialog'
import { IntegrationCard } from './IntegrationCard'
import {
  getIntegrationType,
  getIntegrationTypeLabel,
  INTEGRATION_TYPES,
} from './ThirdPartyAuthForm.utils'

export const ThirdPartyAuthForm = () => {
  const { ref: projectRef } = useParams()
  const {
    data: integrationsData,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useThirdPartyAuthIntegrationsQuery({ projectRef })
  const integrations = integrationsData || []

  const [selectedIntegration, setSelectedIntegration] = useState<INTEGRATION_TYPES>()
  const [selectedIntegrationForDeletion, setSelectedIntegrationForDeletion] =
    useState<ThirdPartyAuthIntegration>()

  const { mutateAsync: deleteIntegration } = useDeleteThirdPartyAuthIntegrationMutation()
  const canUpdateConfig = useCheckPermissions(PermissionAction.UPDATE, 'custom_config_gotrue')

  if (isError) {
    return (
      <AlertError
        error={error}
        subject="Failed to retrieve auth configuration for Third Party Auth Integrations"
      />
    )
  }

  return (
    <ScaffoldSection isFullWidth>
      <div className="flex justify-between gap-4">
        <div>
          <ScaffoldSectionTitle>Third Party Auth</ScaffoldSectionTitle>
          <ScaffoldSectionDescription className="mb-6">
            Use third-party authentication (TPA) systems based on JWTs to access your project.
            <br />
            Billing is based on the number of monthly active users (MAUs) requesting your API
            throughout the billing period. Refer to our{' '}
            <InlineLink href="https://skybase.com/docs/guides/platform/manage-your-usage/monthly-active-users-third-party">
              billing docs
            </InlineLink>{' '}
            for more information.
          </ScaffoldSectionDescription>
        </div>
        <div className="flex items-center gap-2 ">
          <DocsButton href="https://skybase.com/docs/guides/auth/third-party/overview" />
          {integrations.length !== 0 && (
            <AddIntegrationDropdown onSelectIntegrationType={setSelectedIntegration} />
          )}
        </div>
      </div>

      {isLoading && (
        <div
          className={cn(
            'border rounded border-default px-20 py-16 flex flex-col items-center justify-center space-y-4'
          )}
        >
          <Loader2 size={24} className="animate-spin" />
        </div>
      )}

      {isSuccess ? (
        integrations.length === 0 ? (
          <div
            className={cn(
              'border rounded border-default px-20 py-16 flex flex-col items-center justify-center space-y-4'
            )}
          >
            <p className="text-sm text-foreground-light">No providers configured yet</p>
            <AddIntegrationDropdown
              align="center"
              buttonText="Add a new integration"
              onSelectIntegrationType={setSelectedIntegration}
            />
          </div>
        ) : (
          <div className="-space-y-px">
            {integrations.map((integration) => {
              return (
                <IntegrationCard
                  key={integration.id}
                  integration={integration}
                  canUpdateConfig={canUpdateConfig}
                  onDelete={() => {
                    setSelectedIntegrationForDeletion(integration)
                  }}
                />
              )
            })}
          </div>
        )
      ) : null}

      <CreateFirebaseAuthIntegrationDialog
        visible={selectedIntegration === 'firebase'}
        onDelete={() => {}}
        onClose={() => setSelectedIntegration(undefined)}
      />

      <CreateAwsCognitoAuthIntegrationDialog
        visible={selectedIntegration === 'awsCognito'}
        onDelete={() => {}}
        onClose={() => setSelectedIntegration(undefined)}
      />

      <CreateAuth0IntegrationDialog
        visible={selectedIntegration === 'auth0'}
        onDelete={() => {}}
        onClose={() => setSelectedIntegration(undefined)}
      />

      <CreateClerkAuthIntegrationDialog
        visible={selectedIntegration === 'clerk'}
        onDelete={() => {}}
        onClose={() => setSelectedIntegration(undefined)}
      />

      <CreateWorkOSIntegrationDialog
        visible={selectedIntegration === 'workos'}
        onDelete={() => {}}
        onClose={() => setSelectedIntegration(undefined)}
      />

      <ConfirmationModal
        size="medium"
        visible={!!selectedIntegrationForDeletion}
        variant="destructive"
        title="Confirm to delete integration"
        confirmLabel="Delete"
        confirmLabelLoading="Deleting"
        onCancel={() => setSelectedIntegrationForDeletion(undefined)}
        onConfirm={async () => {
          if (!selectedIntegrationForDeletion) {
            return
          }
          const type = getIntegrationType(selectedIntegrationForDeletion)
          try {
            await deleteIntegration({
              projectRef: projectRef!,
              tpaId: selectedIntegrationForDeletion.id,
            })
            toast.success(`Successfully deleted ${getIntegrationTypeLabel(type)}.`)
            setSelectedIntegrationForDeletion(undefined)
            setSelectedIntegration(undefined)
          } catch (error) {
            toast.error(`Failed to delete ${getIntegrationTypeLabel(type)}.`)
            console.error(error)
          }
        }}
      >
        <p className="text-sm text-foreground-light">
          Are you sure you want to delete the{' '}
          {getIntegrationTypeLabel(getIntegrationType(selectedIntegrationForDeletion))} integration?
        </p>
      </ConfirmationModal>
    </ScaffoldSection>
  )
}
