import { NextPage } from 'next'
import { useTheme } from 'next-themes'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { LOCAL_STORAGE_KEYS } from 'common'
import { useLocalStorageQuery } from 'hooks/misc/useLocalStorage'
import { useSignOut } from 'lib/auth'
import { Button } from 'ui'

const Error500: NextPage = () => {
  const router = useRouter()
  const signOut = useSignOut()
  const { resolvedTheme } = useTheme()

  const [lastVisitedOrganization] = useLocalStorageQuery(
    LOCAL_STORAGE_KEYS.LAST_VISITED_ORGANIZATION,
    ''
  )

  const onClickLogout = async () => {
    await signOut()
    await router.push('/sign-in')
    router.reload()
  }

  return (
    <div className="relative mx-auto flex flex-1 w-full flex-col items-center justify-center space-y-6">
      <div className="absolute top-0 mx-auto w-full max-w-7xl px-8 pt-6 sm:px-6 lg:px-8">
        <nav className="relative flex items-center justify-between sm:h-10">
          <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
            <div className="flex w-full items-center justify-between md:w-auto">
              <Link href="/projects">
                <Image
                  src={
                    resolvedTheme?.includes('dark')
                      ? `${router.basePath}/img/skybase-dark.svg`
                      : `${router.basePath}/img/skybase-light.svg`
                  }
                  alt=""
                  height={24}
                  width={120}
                />
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <div className="flex w-[320px] flex-col items-center justify-center space-y-3">
        <h4 className="text-lg">Something went wrong 🤕</h4>
        <p className="text-center">
          Sorry about that, please try again later or feel free to reach out to us if the problem
          persists.
        </p>
      </div>
      <div className="flex items-center space-x-4">
        {router.pathname !== '/organizations' ? (
          <Button asChild>
            <Link
              href={
                !!lastVisitedOrganization ? `/org/${lastVisitedOrganization}` : '/organizations'
              }
            >
              Head back
            </Link>
          </Button>
        ) : (
          <Button onClick={onClickLogout}>Head back</Button>
        )}
        <Button type="secondary" asChild>
          <Link href="/support/new">Submit a support request</Link>
        </Button>
      </div>
    </div>
  )
}

export default Error500
