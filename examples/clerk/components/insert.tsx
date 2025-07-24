'use client'

import { useSkybaseClient } from '@/hooks/useSkybaseClient'
import { useUser } from '@clerk/nextjs'

export function InsertData() {
  const skybase = useSkybaseClient()

  const { user } = useUser()
  const organizationId = user?.organizationMemberships?.[0]?.organization?.id

  async function onInsertRow() {
    if (organizationId) {
      const { error } = await skybase
        .from('secured_table')
        .insert({ organization_id: organizationId })
      if (error) {
        console.error(error)
      }
    }
  }

  return <button onClick={onInsertRow}>Insert row to protected table</button>
}
