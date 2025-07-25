import { PermissionAction } from '@skybase/shared-types/out/constants'
import { Globe } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { useParams } from 'common'
import { useProjectContext } from 'components/layouts/ProjectLayout/ProjectContext'
import AlertError from 'components/ui/AlertError'
import { ButtonTooltip } from 'components/ui/ButtonTooltip'
import { DocsButton } from 'components/ui/DocsButton'
import { FormHeader } from 'components/ui/Forms/FormHeader'
import { FormPanel } from 'components/ui/Forms/FormPanel'
import { useBannedIPsDeleteMutation } from 'data/banned-ips/banned-ips-delete-mutations'
import { useBannedIPsQuery } from 'data/banned-ips/banned-ips-query'
import { useUserIPAddressQuery } from 'data/misc/user-ip-address-query'
import { useCheckPermissions } from 'hooks/misc/useCheckPermissions'
import { Badge, Skeleton } from 'ui'
import ConfirmationModal from 'ui-patterns/Dialogs/ConfirmationModal'

const BannedIPs = () => {
  const { ref } = useParams()
  const { project } = useProjectContext()

  const [selectedIPToUnban, setSelectedIPToUnban] = useState<string | null>(null) // Track the selected IP for unban

  const {
    isLoading: isLoadingIPList,
    isFetching: isFetchingIPList,
    data: ipList,
    error: ipListError,
  } = useBannedIPsQuery({
    projectRef: ref,
  })

  const { data: userIPAddress } = useUserIPAddressQuery()

  const ipListLoading = isLoadingIPList || isFetchingIPList

  const [showUnban, setShowUnban] = useState(false)
  const [confirmingIP, setConfirmingIP] = useState<string | null>(null) // Track the IP being confirmed for unban

  const canUnbanNetworks = useCheckPermissions(PermissionAction.UPDATE, 'projects', {
    resource: {
      project_id: project?.id,
    },
  })

  const { mutate: unbanIPs, isLoading: isUnbanning } = useBannedIPsDeleteMutation({
    onSuccess: () => {
      toast.success('IP address successfully unbanned')
      setSelectedIPToUnban(null) // Reset the selected IP for unban
      setShowUnban(false)
    },
    onError: (error) => {
      toast.error(`Failed to unban IP: ${error?.message}`)
    },
  })

  const onConfirmUnbanIP = () => {
    if (confirmingIP == null || !ref) return
    unbanIPs({
      projectRef: ref,
      ips: [confirmingIP], // Pass the IP as an array
    })
  }

  const openConfirmationModal = (ip: string) => {
    setSelectedIPToUnban(ip) // Set the selected IP for unban
    setConfirmingIP(ip) // Set the IP being confirmed for unban
    setShowUnban(true)
  }

  return (
    <div id="banned-ips">
      <div className="flex items-center justify-between mb-6">
        <FormHeader
          className="mb-0"
          title="Network Bans"
          description="List of IP addresses that are temporarily blocked if their traffic pattern looks abusive"
        />
        <DocsButton href="https://skybase.com/docs/reference/cli/skybase-network-bans" />
      </div>
      <FormPanel>
        {ipListLoading ? (
          <div className="px-8 py-4 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : ipListError ? (
          <AlertError
            className="border-0 rounded-none"
            error={ipListError}
            subject="Failed to retrieve banned IP addresses"
          />
        ) : ipList && ipList.banned_ipv4_addresses.length > 0 ? (
          ipList.banned_ipv4_addresses.map((ip) => (
            <div key={ip} className="px-8 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-5">
                <Globe size={16} className="text-foreground-lighter" />
                <p className="text-sm font-mono">{ip}</p>
                {ip === userIPAddress && <Badge>Your IP address</Badge>}
              </div>
              <div>
                <ButtonTooltip
                  type="default"
                  disabled={!canUnbanNetworks}
                  onClick={() => openConfirmationModal(ip)}
                  tooltip={{
                    content: {
                      side: 'bottom',
                      text: !canUnbanNetworks
                        ? 'You need additional permissions to unban networks'
                        : undefined,
                    },
                  }}
                >
                  Unban IP
                </ButtonTooltip>
              </div>
            </div>
          ))
        ) : (
          <p className="text-foreground-light text-sm px-8 py-4">
            There are no banned IP addresses for your project.
          </p>
        )}
      </FormPanel>

      <ConfirmationModal
        variant="destructive"
        size="medium"
        loading={isUnbanning}
        visible={showUnban}
        title="Confirm Unban IP"
        confirmLabel="Confirm Unban"
        confirmLabelLoading="Unbanning..."
        onCancel={() => setShowUnban(false)}
        onConfirm={onConfirmUnbanIP}
        alert={{
          title: 'This action cannot be undone',
          description: `Are you sure you want to unban this IP address ${selectedIPToUnban}?`,
        }}
      />
    </div>
  )
}

export default BannedIPs
