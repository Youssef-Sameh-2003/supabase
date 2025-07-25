import { PermissionAction } from '@skybase/shared-types/out/constants'
import { Check, Webhook } from 'lucide-react'
import { Badge, Input, copyToClipboard } from 'ui'

import { ButtonTooltip } from 'components/ui/ButtonTooltip'
import { useCheckPermissions } from 'hooks/misc/useCheckPermissions'
import { Hook } from './hooks.constants'
import { DocsButton } from 'components/ui/DocsButton'

interface HookCardProps {
  hook: Hook
  onSelect: () => void
}

export const HookCard = ({ hook, onSelect }: HookCardProps) => {
  const canUpdateAuthHook = useCheckPermissions(PermissionAction.AUTH_EXECUTE, '*')

  return (
    <div className="bg-surface-100 border-default overflow-hidden border shadow px-5 py-4 flex flex-row first:rounded-t-md last:rounded-b-md space-x-4">
      <div className="">
        <Webhook size={21} strokeWidth="1" />
      </div>
      <div className="flex flex-col flex-0 overflow-y-auto w-full">
        <span className="text-sm text-foreground">{hook.title}</span>
        <span className="text-sm text-foreground-lighter">{hook.subtitle}</span>
        <div className="text-sm flex flex-row space-x-5 py-4">
          {hook.method.type === 'postgres' ? (
            <div className="flex flex-col w-full space-y-2">
              <div className="flex flex-row items-center">
                <span className="text-foreground-light w-20">type</span>
                <span className="text-foreground">Postgres function</span>
              </div>
              <div className="flex flex-row items-center">
                <span className="text-foreground-light w-20">schema</span>
                <Input
                  title={hook.method.schema}
                  copy
                  readOnly
                  disabled
                  className="input-mono [&>div>div>div>input]:text-xs [&>div>div>div>input]:opacity-100 flex-1"
                  value={hook.method.schema}
                  onCopy={() =>
                    hook.method.type === 'postgres' && copyToClipboard(hook.method.schema)
                  }
                />
              </div>
              <div className="flex flex-row items-center">
                <span className="text-foreground-light w-20">function</span>
                <Input
                  title={hook.method.functionName}
                  copy
                  readOnly
                  disabled
                  className="input-mono [&>div>div>div>input]:text-xs [&>div>div>div>input]:opacity-100 flex-1"
                  value={hook.method.functionName}
                  onCopy={() =>
                    hook.method.type === 'postgres' && copyToClipboard(hook.method.functionName)
                  }
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full space-y-2">
              <div className="flex flex-row items-center">
                <span className="text-foreground-light w-20">type</span>
                <span className="text-foreground">HTTPS endpoint</span>
              </div>
              <div className="flex flex-row items-center">
                <span className="text-foreground-light w-20">endpoint</span>
                <Input
                  title={hook.method.url}
                  copy
                  readOnly
                  disabled
                  className="input-mono [&>div>div>div>input]:text-xs [&>div>div>div>input]:opacity-100 flex-1"
                  value={hook.method.url}
                  onCopy={() => hook.method.type === 'https' && copyToClipboard(hook.method.url)}
                />
              </div>
              <div className="flex flex-row items-center">
                <span className="text-foreground-light w-20">secret</span>
                <Input
                  copy
                  title={hook.method.secret}
                  reveal={true}
                  readOnly
                  disabled
                  className="input-mono [&>div>div>div>input]:text-xs [&>div>div>div>input]:opacity-100 flex-1"
                  value={hook.method.secret}
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-row gap-2">
          <ButtonTooltip
            type="default"
            disabled={!canUpdateAuthHook}
            onClick={() => onSelect()}
            tooltip={{
              content: {
                side: 'bottom',
                text: !canUpdateAuthHook
                  ? 'You need additional permissions to configure auth hooks'
                  : undefined,
              },
            }}
          >
            Configure hook
          </ButtonTooltip>
          <DocsButton href={'https://skybase.com/docs/guides/auth/auth-hooks/' + hook.docSlug} />
        </div>
      </div>
      <div className="flex-1">
        {hook.enabled ? (
          <Badge className="space-x-1" variant="brand">
            <div className="h-3.5 w-3.5 bg-brand rounded-full flex justify-center items-center">
              <Check className="h-2 w-2 text-background-overlay " strokeWidth={6} />
            </div>
            <span>Enabled</span>
          </Badge>
        ) : (
          <Badge variant="warning">
            <span>Disabled</span>
          </Badge>
        )}
      </div>
    </div>
  )
}
