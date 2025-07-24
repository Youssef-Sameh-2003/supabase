'use client'

import { useSkybaseClient } from '@/hooks/useSkybaseClient'
import { useEffect, useState } from 'react'

export function ReadData() {
  const skybase = useSkybaseClient()
  const [data, setData] = useState<Array<unknown>>([])

  useEffect(() => {
    skybase
      .from('secured_table')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          console.error(error)
        } else {
          setData(data)
        }
      })
  }, [skybase])

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
