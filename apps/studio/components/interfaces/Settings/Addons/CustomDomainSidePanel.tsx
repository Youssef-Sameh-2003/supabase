import { PermissionAction } from '@skybase/shared-types/out/constants'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useParams } from 'common'
import { useProjectAddonRemoveMutation } from 'data/subscriptions/project-addon-remove-mutation'
import { useProjectAddonUpdateMutation } from 'data/subscriptions/project-addon-update-mutation'
import { useProjectAddonsQuery } from 'data/subscriptions/project-addons-query'
import type { AddonVariantId } from 'data/subscriptions/types'
import { useCheckPermissions } from 'hooks/misc/useCheckPermissions'
import { useSelectedOrganization } from 'hooks/misc/useSelectedOrganization'
import { useFlag } from 'hooks/ui/useFlag'
import { formatCurrency } from 'lib/helpers'
import { useAddonsPagePanel } from 'state/addons-page'
import {
  Alert,
  AlertDescription_Shadcn_,
  AlertTitle_Shadcn_,
  Alert_Shadcn_,
  Button,
  Radio,
  SidePanel,
  cn,
} from 'ui'
import { ExternalLink, AlertCircle } from 'lucide-react'

const CustomDomainSidePanel = () => {
  const { ref: projectRef } = useParams()
  const organization = useSelectedOrganization()
  const customDomainsDisabledDueToQuota = useFlag('customDomainsDisabledDueToQuota')

  const [selectedOption, setSelectedOption] = useState<string>('cd_none')

  const canUpdateCustomDomain = useCheckPermissions(
    PermissionAction.BILLING_WRITE,
    'stripe.subscriptions'
  )

  const { panel, closePanel } = useAddonsPagePanel()
  const visible = panel === 'customDomain'

  const { data: addons, isLoading } = useProjectAddonsQuery({ projectRef })
  const { mutate: updateAddon, isLoading: isUpdating } = useProjectAddonUpdateMutation({
    onSuccess: () => {
      toast.success(`Successfully enabled custom domain`)
      closePanel()
    },
    onError: (error) => {
      toast.error(`Unable to enable custom domain: ${error.message}`)
    },
  })
  const { mutate: removeAddon, isLoading: isRemoving } = useProjectAddonRemoveMutation({
    onSuccess: () => {
      toast.success(`Successfully disabled custom domain`)
      closePanel()
    },
    onError: (error) => {
      toast.error(`Unable to disable custom domain: ${error.message}`)
    },
  })
  const isSubmitting = isUpdating || isRemoving

  const subscriptionCDOption = (addons?.selected_addons ?? []).find(
    (addon) => addon.type === 'custom_domain'
  )
  const availableOptions =
    (addons?.available_addons ?? []).find((addon) => addon.type === 'custom_domain')?.variants ?? []

  const isFreePlan = organization?.plan?.id === 'free'
  const hasChanges = selectedOption !== (subscriptionCDOption?.variant.identifier ?? 'cd_none')
  const selectedCustomDomain = availableOptions.find(
    (option) => option.identifier === selectedOption
  )

  useEffect(() => {
    if (visible) {
      if (subscriptionCDOption !== undefined) {
        setSelectedOption(subscriptionCDOption.variant.identifier)
      } else {
        setSelectedOption('cd_none')
      }
    }
  }, [visible, isLoading])

  const onConfirm = async () => {
    if (!projectRef) return console.error('Project ref is required')
    if (selectedOption === 'cd_none' && subscriptionCDOption !== undefined) {
      removeAddon({ projectRef, variant: subscriptionCDOption.variant.identifier })
    } else {
      updateAddon({ projectRef, type: 'custom_domain', variant: selectedOption as AddonVariantId })
    }
  }

  return (
    <SidePanel
      size="large"
      visible={visible}
      onCancel={closePanel}
      onConfirm={onConfirm}
      loading={isLoading || isSubmitting}
      disabled={
        isFreePlan ||
        isLoading ||
        !hasChanges ||
        isSubmitting ||
        !canUpdateCustomDomain ||
        // Allow disabling, but do not allow opting in
        (subscriptionCDOption === undefined && customDomainsDisabledDueToQuota)
      }
      tooltip={
        isFreePlan
          ? 'Unable to enable custom domain on a Free Plan'
          : !canUpdateCustomDomain
            ? 'You do not have permission to update custom domain'
            : undefined
      }
      header={
        <div className="flex items-center justify-between">
          <h4>Custom domains</h4>
          <Button asChild type="default" icon={<ExternalLink strokeWidth={1.5} />}>
            <Link
              href="https://skybase.com/docs/guides/platform/custom-domains"
              target="_blank"
              rel="noreferrer"
            >
              About custom domains
            </Link>
          </Button>
        </div>
      }
    >
      <SidePanel.Content>
        <div className="py-6 space-y-4">
          {subscriptionCDOption === undefined &&
            selectedCustomDomain !== undefined &&
            customDomainsDisabledDueToQuota && (
              <Alert_Shadcn_ variant="default" className="mb-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle_Shadcn_>
                  Adding new custom domains temporarily disabled
                </AlertTitle_Shadcn_>
                <AlertDescription_Shadcn_ className="flex flex-col gap-3">
                  We are working with our upstream DNS provider before we are able to sign up new
                  custom domains. Please check back in a few hours.
                </AlertDescription_Shadcn_>
              </Alert_Shadcn_>
            )}
          <p className="text-sm">
            Custom domains allow you to present a branded experience to your users. You may set up
            your custom domain in the{' '}
            <Link href={`/project/${projectRef}/settings/general`} className="text-brand">
              General Settings
            </Link>{' '}
            page after enabling the add-on.
          </p>

          <div className={cn('!mt-8 pb-4', isFreePlan && 'opacity-75')}>
            <Radio.Group
              type="large-cards"
              size="tiny"
              id="custom-domain"
              onChange={(event: any) => setSelectedOption(event.target.value)}
            >
              <Radio
                name="custom-domain"
                checked={selectedOption === 'cd_none'}
                className="col-span-4 !p-0"
                label="No custom domain"
                value="cd_none"
              >
                <div className="w-full group">
                  <div className="border-b border-default px-4 py-2 group-hover:border-control">
                    <p className="text-sm">No custom domain</p>
                  </div>
                  <div className="px-4 py-2">
                    <p className="text-foreground-light">
                      Use the default skybase domain for your API
                    </p>
                    <div className="flex items-center space-x-1 mt-2">
                      <p className="text-foreground text-sm" translate="no">
                        $0
                      </p>
                      <p className="text-foreground-light translate-y-[1px]"> / month</p>
                    </div>
                  </div>
                </div>
              </Radio>
              {availableOptions.map((option) => (
                <Radio
                  className="col-span-4 !p-0"
                  name="custom-domain"
                  key={option.identifier}
                  disabled={isFreePlan}
                  checked={selectedOption === option.identifier}
                  label={option.name}
                  value={option.identifier}
                >
                  <div className="w-full group">
                    <div className="border-b border-default px-4 py-2 group-hover:border-control">
                      <p className="text-sm">{option.name}</p>
                    </div>
                    <div className="px-4 py-2">
                      <p className="text-foreground-light">
                        Present a branded experience to your users
                      </p>
                      <div className="flex items-center space-x-1 mt-2">
                        <p className="text-foreground text-sm" translate="no">
                          {formatCurrency(option.price)}
                        </p>
                        <p className="text-foreground-light translate-y-[1px]"> / month</p>
                      </div>
                    </div>
                  </div>
                </Radio>
              ))}
            </Radio.Group>
          </div>

          {hasChanges && selectedOption !== 'cd_none' && (
            <p className="text-sm text-foreground-light">
              There are no immediate charges. The addon is billed at the end of your billing cycle
              based on your usage and prorated to the hour.
            </p>
          )}

          {isFreePlan && (
            <Alert
              withIcon
              variant="info"
              title="Custom domains are unavailable on the Free Plan"
              actions={
                <Button asChild type="default">
                  <Link
                    href={`/org/${organization?.slug}/billing?panel=subscriptionPlan&source=customDomainSidePanel`}
                  >
                    View available plans
                  </Link>
                </Button>
              }
            >
              Upgrade your plan to add a custom domain to your project
            </Alert>
          )}
        </div>
      </SidePanel.Content>
    </SidePanel>
  )
}

export default CustomDomainSidePanel
