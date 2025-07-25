import type { PostgresPolicy } from '@skybase/postgres-meta'
import { ChevronDown, PanelLeftClose, PanelRightClose, X } from 'lucide-react'
import { useState } from 'react'

import {
  CollapsibleContent_Shadcn_,
  CollapsibleTrigger_Shadcn_,
  Collapsible_Shadcn_,
  SheetClose,
  SheetHeader,
  SheetTitle,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  cn,
} from 'ui'

export const PolicyEditorPanelHeader = ({
  selectedPolicy,
  showTools,
  setShowTools,
}: {
  selectedPolicy?: PostgresPolicy
  showTools: boolean
  setShowTools: (v: boolean) => void
}) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <SheetHeader className={cn('py-3 flex flex-row justify-between items-start border-b')}>
      <div className="flex flex-row gap-3 max-w-[75%] items-start">
        <SheetClose
          className={cn(
            'text-muted hover:text ring-offset-background transition-opacity hover:opacity-100',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'transition disabled:pointer-events-none data-[state=open]:bg-secondary',
            'mt-1.5'
          )}
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Close</span>
        </SheetClose>
        <div className="h-[24px] w-[1px] bg-border-overlay" />
        <div>
          <SheetTitle className="truncate">
            {selectedPolicy !== undefined
              ? `Update policy: ${selectedPolicy.name}`
              : 'Create a new Row Level Security policy'}
          </SheetTitle>
          {selectedPolicy !== undefined && (
            <Collapsible_Shadcn_
              className="-mt-1.5 pb-1.5"
              open={showDetails}
              onOpenChange={setShowDetails}
            >
              <CollapsibleTrigger_Shadcn_ className="group  font-normal p-0 [&[data-state=open]>div>svg]:!-rotate-180">
                <div className="flex items-center gap-x-2 w-full">
                  <p className="text-xs text-foreground-light group-hover:text-foreground transition">
                    View policy details
                  </p>
                  <ChevronDown
                    className="transition-transform duration-200"
                    strokeWidth={1.5}
                    size={14}
                  />
                </div>
              </CollapsibleTrigger_Shadcn_>
              <CollapsibleContent_Shadcn_ className="grid gap-1.5">
                <div className="flex my-2">
                  <div>
                    <div className="text-xs flex items-start space-x-2 border-b py-1.5">
                      <p className="w-[110px] text-foreground-light">Name:</p>
                      <p className="pr-4">{selectedPolicy?.name}</p>
                    </div>
                    <div className="text-xs flex items-start space-x-2 border-b py-1.5">
                      <p className="w-[110px] text-foreground-light">Action:</p>
                      <p className="font-mono pr-4">{selectedPolicy?.action}</p>
                    </div>
                    <div className="text-xs flex items-start space-x-2 border-b py-1.5">
                      <p className="w-[110px] text-foreground-light">Command:</p>
                      <p className="font-mono pr-4">{selectedPolicy?.command}</p>
                    </div>
                    <div className="text-xs flex items-start space-x-2 border-b py-1.5">
                      <p className="w-[110px] text-foreground-light">Target roles:</p>
                      <p className="font-mono pr-4">{selectedPolicy?.roles.join(', ')}</p>
                    </div>
                    <div className="text-xs flex items-start space-x-2 border-b py-1.5">
                      <p className="w-[110px] text-foreground-light">USING expression:</p>
                      <p className="font-mono pr-4">{selectedPolicy?.definition}</p>
                    </div>
                    <div className="text-xs flex items-start space-x-2 pt-1.5">
                      <p className="w-[110px] text-foreground-light">CHECK expression:</p>
                      <p
                        className={`${selectedPolicy?.check ? '' : 'text-foreground-light'} font-mono pr-4`}
                      >
                        {selectedPolicy?.check ?? 'None'}
                      </p>
                    </div>
                  </div>
                </div>
              </CollapsibleContent_Shadcn_>
            </Collapsible_Shadcn_>
          )}
        </div>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            aria-expanded={showTools}
            aria-controls="ai-chat-assistant"
            className={cn(
              !showTools ? 'text-foreground-lighter' : 'text-light',
              'mt-1 hover:text-foreground transition'
            )}
            onClick={() => setShowTools(!showTools)}
          >
            {!showTools ? (
              <PanelLeftClose size={19} strokeWidth={1} />
            ) : (
              <PanelRightClose size={19} strokeWidth={1} />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="left">{showTools ? 'Hide' : 'Show'} tools</TooltipContent>
      </Tooltip>
    </SheetHeader>
  )
}
