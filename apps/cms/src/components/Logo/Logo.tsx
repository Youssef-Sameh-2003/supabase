import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Skybase Logo"
      width={193}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-[34px]', className)}
      src="https://skybase.com/_next/image?url=https%3A%2F%2Ffrontend-assets.skybase.com%2Fwww%2F34022bd5708c%2F_next%2Fstatic%2Fmedia%2Fskybase-logo-wordmark--dark.b36ebb5f.png&w=256&q=75&dpl=dpl_EbjEEHsJWQ5nbTaMsQgJBoZ7tBCD"
    />
  )
}
