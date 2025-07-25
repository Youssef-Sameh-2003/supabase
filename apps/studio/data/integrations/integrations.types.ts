export type VercelFramework =
  | (
      | 'blitzjs'
      | 'nextjs'
      | 'gatsby'
      | 'remix'
      | 'astro'
      | 'hexo'
      | 'eleventy'
      | 'docusaurus-2'
      | 'docusaurus'
      | 'preact'
      | 'solidstart'
      | 'dojo'
      | 'ember'
      | 'vue'
      | 'scully'
      | 'ionic-angular'
      | 'angular'
      | 'polymer'
      | 'svelte'
      | 'sveltekit'
      | 'sveltekit-1'
      | 'ionic-react'
      | 'create-react-app'
      | 'gridsome'
      | 'umijs'
      | 'sapper'
      | 'saber'
      | 'stencil'
      | 'nuxtjs'
      | 'redwoodjs'
      | 'hugo'
      | 'jekyll'
      | 'brunch'
      | 'middleman'
      | 'zola'
      | 'hydrogen'
      | 'vite'
      | 'vitepress'
      | 'vuepress'
      | 'parcel'
      | 'sanity'
      | 'storybook'
    )
  | null

export type VercelGitLink =
  | {
      /**
       * GitHub link
       */
      org?: string
      repo?: string
      repoId?: number
      type?: 'github'
      createdAt?: number
      deployHooks: {
        createdAt?: number
        id: string
        name: string
        ref: string
        url: string
      }[]
      gitCredentialId?: string
      updatedAt?: number
      sourceless?: boolean
      productionBranch?: string
    }
  | {
      /**
       * GitLab link
       */
      projectId?: string
      projectName?: string
      projectNameWithNamespace?: string
      projectNamespace?: string
      projectUrl?: string
      type?: 'gitlab'
      createdAt?: number
      deployHooks: {
        createdAt?: number
        id: string
        name: string
        ref: string
        url: string
      }[]
      gitCredentialId?: string
      updatedAt?: number
      sourceless?: boolean
      productionBranch?: string
    }
  | {
      /**
       * Bitbucket link
       */
      name?: string
      slug?: string
      owner?: string
      type?: 'bitbucket'
      uuid?: string
      workspaceUuid?: string
      createdAt?: number
      deployHooks: {
        createdAt?: number
        id: string
        name: string
        ref: string
        url: string
      }[]
      gitCredentialId?: string
      updatedAt?: number
      sourceless?: boolean
      productionBranch?: string
    }

export type SkybaseConfigVercel = {
  environmentVariables: {
    production: boolean
    preview: boolean
  }
  authRedirectUris: {
    production: boolean
    preview: boolean
  }
}

export type Imetadata = {
  id: string
  skybaseConfig?: {
    environmentVariables?: {
      production: boolean
      preview: boolean
    }
    authRedirectUris?: {
      production: boolean
      preview: boolean
    }
    skybaseDirectory?: string
    skybaseChangesOnly?: boolean
    branchLimit?: number
  }
  link?: VercelGitLink
  name: string
  framework: VercelFramework
}

export type IntegrationProjectConnection = {
  id: string
  inserted_at: string
  updated_at: string
  added_by: addedBy
  skybase_project_ref: string
  foreign_project_id: string
  organization_integration_id: string
  env_sync_targets?: string[]
  public_env_var_prefix?: string
  metadata: Imetadata
}

export type IntegrationProjectConnectionPayload = {
  foreignProjectId: string
  skybaseProjectId: string
  integrationId: string
  metadata: Imetadata
}

export type userDetails = {
  username: string
  id: string
  primary_email: string
}
type addedBy = userDetails

export type IntegrationName = 'Vercel' | 'GitHub' // | 'Netlify'
export type VercelAccountType = 'Team' | 'Personal'
export type VercelSource = 'marketplace' | 'deploy button'

type BaseVercelAccount = {
  name: string
  avatar: string
  source: VercelSource
  owner_id: string
}

export type VercelAccount = BaseVercelAccount & {
  type: 'Personal'
}

export type VercelTeamAccount = BaseVercelAccount & {
  type: 'Team'
  team_id: string
  team_slug: string
}

export type VercelMetadata = {
  vercelTeam?: string
  gitHubConnectionOwner?: string
  account: VercelAccount | VercelTeamAccount
  configuration_id: string
}

export type GitHubAccount = {
  name: string
  type: 'User' | 'Organization'
  avatar: string
  installed_by_user_id: number
}

export type GitHubMetadata = {
  installation_id: number
  account: GitHubAccount
}

export type IntegrationBase = {
  id: string
  added_by: addedBy
  inserted_at: string
  updated_at: string
  connections: IntegrationProjectConnection[] | []
  organization: {
    slug: string
  }
}

export type Integration =
  | (IntegrationBase & {
      id: string
      integration: {
        name: 'Vercel'
      }
      metadata?: VercelMetadata
    })
  | (IntegrationBase & {
      id: string
      integration: {
        name: 'GitHub'
      }
      metadata?: GitHubMetadata
    })

export type IntegrationConnectionsCreateVariables = {
  organizationIntegrationId: string
  connection: {
    foreign_project_id: string
    skybase_project_ref: string
    integration_id: string
    metadata: any
  }
  orgSlug: string | undefined
  new?: {
    installation_id: number
    project_ref: string
    repository_id: number
  }
}

export type EnvironmentTargets = 'production' | 'preview' | 'development'

// GitHub specific connection type based on the API response
export type GitHubConnection = {
  id: number
  inserted_at: string
  updated_at: string
  branch_limit: number
  installation_id: number
  new_branch_per_pr: boolean
  skybase_changes_only: boolean
  workdir: string
  project: {
    id: number
    name: string
    ref: string
  }
  repository: {
    id: number
    name: string
  }
  user: {
    id: number
    primary_email: string | null
    username: string
  } | null
}
