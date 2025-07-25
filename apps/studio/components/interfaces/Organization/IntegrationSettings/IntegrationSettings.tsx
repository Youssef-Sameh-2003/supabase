import { PermissionAction } from '@skybase/shared-types/out/constants'
import { useCallback } from 'react'
import { toast } from 'sonner'

import { EmptyIntegrationConnection } from 'components/interfaces/Integrations/VercelGithub/IntegrationPanels'
import { Markdown } from 'components/interfaces/Markdown'
import VercelSection from 'components/interfaces/Settings/Integrations/VercelIntegration/VercelSection'
import {
  ScaffoldContainer,
  ScaffoldContainerLegacy,
  ScaffoldDivider,
  ScaffoldSection,
  ScaffoldSectionContent,
  ScaffoldSectionDetail,
  ScaffoldTitle,
} from 'components/layouts/Scaffold'
import NoPermission from 'components/ui/NoPermission'
import { useGitHubAuthorizationQuery } from 'data/integrations/github-authorization-query'
import { useGitHubConnectionDeleteMutation } from 'data/integrations/github-connection-delete-mutation'
import { useGitHubConnectionsQuery } from 'data/integrations/github-connections-query'
import type { IntegrationProjectConnection } from 'data/integrations/integrations.types'
import { useCheckPermissions } from 'hooks/misc/useCheckPermissions'
import { useSelectedOrganization } from 'hooks/misc/useSelectedOrganization'
import { BASE_PATH } from 'lib/constants'
import {
  GITHUB_INTEGRATION_INSTALLATION_URL,
  GITHUB_INTEGRATION_REVOKE_AUTHORIZATION_URL,
} from 'lib/github'
import { useSidePanelsStateSnapshot } from 'state/side-panels'
import { IntegrationConnectionItem } from '../../Integrations/VercelGithub/IntegrationConnection'
import SidePanelVercelProjectLinker from './SidePanelVercelProjectLinker'
import { useRouter } from 'next/router'

const IntegrationImageHandler = ({ title }: { title: 'vercel' | 'github' }) => {
  return (
    <img
      className="border rounded-lg shadow w-full sm:w-48 mt-6 border-body"
      src={`${BASE_PATH}/img/integrations/covers/${title}-cover.png`}
      alt={`${title} cover`}
    />
  )
}

const IntegrationSettings = () => {
  const org = useSelectedOrganization()
  const router = useRouter()

  const canReadGithubConnection = useCheckPermissions(
    PermissionAction.READ,
    'integrations.github_connections'
  )
  const canCreateGitHubConnection = useCheckPermissions(
    PermissionAction.CREATE,
    'integrations.github_connections'
  )
  const canUpdateGitHubConnection = useCheckPermissions(
    PermissionAction.UPDATE,
    'integrations.github_connections'
  )

  const { data: gitHubAuthorization } = useGitHubAuthorizationQuery()
  const { data: connections } = useGitHubConnectionsQuery({ organizationId: org?.id })

  const { mutate: deleteGitHubConnection } = useGitHubConnectionDeleteMutation({
    onSuccess: () => {
      toast.success('Successfully deleted Github connection')
    },
  })

  const sidePanelsStateSnapshot = useSidePanelsStateSnapshot()

  const onAddGitHubConnection = useCallback(() => {
    router.push('/project/_/settings/integrations')
  }, [sidePanelsStateSnapshot])

  const onDeleteGitHubConnection = useCallback(
    async (connection: IntegrationProjectConnection) => {
      if (!org?.id) {
        toast.error('Organization not found')
        return
      }

      deleteGitHubConnection({
        connectionId: connection.id,
        organizationId: org.id,
      })
    },
    [deleteGitHubConnection, org?.id]
  )

  /**
   * GitHub markdown content
   */

  const GitHubTitle = `GitHub Connections`

  const GitHubDetailsSection = `
Connect any of your GitHub repositories to a project.
`

  const GitHubContentSectionTop = `

### How will GitHub connections work?

You will be able to connect a GitHub repository to a Skybase project.
The GitHub app will watch for changes in your repository such as file changes, branch changes as well as pull request activity.
`

  const GitHubContentSectionBottom = gitHubAuthorization
    ? `You are authorized with Skybase GitHub App. You can configure your GitHub App installations and repository access [here](${GITHUB_INTEGRATION_INSTALLATION_URL}). You can revoke your authorization [here](${GITHUB_INTEGRATION_REVOKE_AUTHORIZATION_URL}).`
    : ''

  const GitHubSection = () => (
    <ScaffoldContainer>
      <ScaffoldSection>
        <ScaffoldSectionDetail title={GitHubTitle}>
          <Markdown content={GitHubDetailsSection} />
          <IntegrationImageHandler title="github" />
        </ScaffoldSectionDetail>
        <ScaffoldSectionContent>
          {!canReadGithubConnection ? (
            <NoPermission resourceText="view this organization's GitHub connections" />
          ) : (
            <>
              <Markdown content={GitHubContentSectionTop} />

              <ul className="flex flex-col gap-y-2">
                {connections?.map((connection) => (
                  <IntegrationConnectionItem
                    key={connection.id}
                    disabled={!canUpdateGitHubConnection}
                    connection={{
                      id: String(connection.id),
                      added_by: {
                        id: String(connection.user?.id),
                        primary_email: connection.user?.primary_email ?? '',
                        username: connection.user?.username ?? '',
                      },
                      foreign_project_id: String(connection.repository.id),
                      skybase_project_ref: connection.project.ref,
                      organization_integration_id: 'unused',
                      inserted_at: connection.inserted_at,
                      updated_at: connection.updated_at,
                      metadata: {
                        name: connection.repository.name,
                      } as any,
                    }}
                    type="GitHub"
                    onDeleteConnection={onDeleteGitHubConnection}
                  />
                ))}
              </ul>

              <EmptyIntegrationConnection
                onClick={onAddGitHubConnection}
                showNode={false}
                disabled={!canCreateGitHubConnection}
              >
                Add new project connection
              </EmptyIntegrationConnection>

              {GitHubContentSectionBottom && (
                <Markdown
                  extLinks
                  content={GitHubContentSectionBottom}
                  className="text-foreground-lighter"
                />
              )}
            </>
          )}
        </ScaffoldSectionContent>
      </ScaffoldSection>
    </ScaffoldContainer>
  )

  return (
    <>
      <ScaffoldContainerLegacy>
        <ScaffoldTitle>Integrations</ScaffoldTitle>
      </ScaffoldContainerLegacy>
      <GitHubSection />
      <ScaffoldDivider />
      <VercelSection isProjectScoped={false} />
      <SidePanelVercelProjectLinker />
    </>
  )
}

export default IntegrationSettings
