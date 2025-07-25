import { Plus } from 'lucide-react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import ShimmeringCard from 'components/interfaces/Home/ProjectList/ShimmeringCard'
import CardButton from 'components/ui/CardButton'
import { useOrganizationsQuery } from 'data/organizations/organizations-query'
import { withAuth } from 'hooks/misc/withAuth'
import { BASE_PATH } from 'lib/constants'
import { Button, cn } from 'ui'

const Header = () => {
  return (
    <div className="border-default border-b p-3">
      <div className="flex items-center space-x-2">
        <Link href="/projects">
          <img
            src={`${BASE_PATH}/img/skybase-logo.svg`}
            alt="Skybase"
            className="border-default rounded border p-1 hover:border-white"
            style={{ height: 24 }}
          />
        </Link>
      </div>
    </div>
  )
}

// [Joshen] Thinking we can deprecate this page in favor of /organizations
const GenericOrganizationPage: NextPage = () => {
  const router = useRouter()

  const { data: organizations, isLoading } = useOrganizationsQuery()
  const { routeSlug, ...queryParams } = router.query
  const queryString =
    Object.keys(queryParams).length > 0
      ? new URLSearchParams(queryParams as Record<string, string>).toString()
      : ''

  const urlRewriterFactory = (slug: string | string[] | undefined) => {
    return (orgSlug: string) => {
      if (!Array.isArray(slug)) {
        return `/org/${orgSlug}/general?${queryString}`
      } else {
        const slugPath = slug.reduce((a: string, b: string) => `${a}/${b}`, '').slice(1)
        return `/org/${orgSlug}/${slugPath}?${queryString}`
      }
    }
  }

  return (
    <>
      <Header />
      <div className="flex flex-col mx-auto w-full space-y-3">
        <h3 className="mt-8 text-2xl w-full max-w-5xl mx-auto">
          Select an organization to continue
        </h3>
        <div
          className="flex-grow py-6 overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 49px - 64px)' }}
        >
          <div className="w-full max-w-5xl mx-auto flex flex-col gap-y-8">
            {isLoading ? (
              <ul
                className={cn(
                  'mx-auto grid grid-cols-1 gap-4',
                  'sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
                )}
              >
                <ShimmeringCard />
                <ShimmeringCard />
              </ul>
            ) : organizations?.length === 0 ? (
              <div className="col-span-4 space-y-4 rounded-lg border border-dashed border-muted p-6 text-center">
                <div className="space-y-1">
                  <p>You are not part of any organizations yet</p>
                  <p className="text-sm text-foreground-light">
                    Get started by creating a new organization.
                  </p>
                </div>
                <div>
                  <Button asChild icon={<Plus />}>
                    <Link href="/new">New organization</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <ul
                className={cn(
                  'w-full mx-auto grid grid-cols-1 gap-4',
                  'sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
                )}
              >
                {organizations?.map((organization) => (
                  <li key={organization.slug} className="col-span-1">
                    <CardButton
                      linkHref={urlRewriterFactory(routeSlug)(organization.slug)}
                      title={
                        <div className="flex w-full flex-row justify-between gap-1">
                          <span className="flex-shrink truncate">{organization.name}</span>
                        </div>
                      }
                      footer={
                        <div className="flex items-end justify-between">
                          <span className="text-sm lowercase text-foreground-light">
                            {organization.slug}
                          </span>
                        </div>
                      }
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default withAuth(GenericOrganizationPage)
