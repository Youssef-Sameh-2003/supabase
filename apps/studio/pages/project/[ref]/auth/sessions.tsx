import { PermissionAction } from '@skybase/shared-types/out/constants'

import { SessionsAuthSettingsForm } from 'components/interfaces/Auth'
import AuthLayout from 'components/layouts/AuthLayout/AuthLayout'
import DefaultLayout from 'components/layouts/DefaultLayout'
import { PageLayout } from 'components/layouts/PageLayout/PageLayout'
import { ScaffoldContainer } from 'components/layouts/Scaffold'
import NoPermission from 'components/ui/NoPermission'
import { GenericSkeletonLoader } from 'components/ui/ShimmeringLoader'
import { useCheckPermissions, usePermissionsLoaded } from 'hooks/misc/useCheckPermissions'
import type { NextPageWithLayout } from 'types'

const SessionsPage: NextPageWithLayout = () => {
  const isPermissionsLoaded = usePermissionsLoaded()
  const canReadAuthSettings = useCheckPermissions(PermissionAction.READ, 'custom_config_gotrue')

  if (isPermissionsLoaded && !canReadAuthSettings) {
    return <NoPermission isFullPage resourceText="access your project's authentication settings" />
  }

  return (
    <ScaffoldContainer>
      {!isPermissionsLoaded ? (
        <div className="mt-12">
          <GenericSkeletonLoader />
        </div>
      ) : (
        <SessionsAuthSettingsForm />
      )}
    </ScaffoldContainer>
  )
}

SessionsPage.getLayout = (page) => (
  <DefaultLayout>
    <AuthLayout>
      <PageLayout
        title="User Sessions"
        subtitle="Configure settings for user sessions and refresh tokens"
      >
        {page}
      </PageLayout>
    </AuthLayout>
  </DefaultLayout>
)

export default SessionsPage
