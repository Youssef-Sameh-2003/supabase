'use client'

import { useCurrentUserImage } from '@/registry/default/blocks/current-user-avatar/hooks/use-current-user-image'
import { useCurrentUserName } from '@/registry/default/blocks/current-user-avatar/hooks/use-current-user-name'
import { createClient } from '@/registry/default/clients/nextjs/lib/skybase/client'
import { useEffect, useState } from 'react'

const skybase = createClient()

export type RealtimeUser = {
  id: string
  name: string
  image: string
}

export const useRealtimePresenceRoom = (roomName: string) => {
  const currentUserImage = useCurrentUserImage()
  const currentUserName = useCurrentUserName()

  const [users, setUsers] = useState<Record<string, RealtimeUser>>({})

  useEffect(() => {
    const room = skybase.channel(roomName)

    room
      .on('presence', { event: 'sync' }, () => {
        const newState = room.presenceState<{ image: string; name: string }>()

        const newUsers = Object.fromEntries(
          Object.entries(newState).map(([key, values]) => [
            key,
            { name: values[0].name, image: values[0].image },
          ])
        ) as Record<string, RealtimeUser>
        setUsers(newUsers)
      })
      .subscribe(async (status) => {
        if (status !== 'SUBSCRIBED') {
          return
        }

        await room.track({
          name: currentUserName,
          image: currentUserImage,
        })
      })

    return () => {
      room.unsubscribe()
    }
  }, [roomName, currentUserName, currentUserImage])

  return { users }
}
