import dayjs from 'dayjs'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { forwardRef, HTMLAttributes, ReactNode, RefAttributes } from 'react'

import { Markdown } from 'components/interfaces/Markdown'
import { ButtonTooltip } from 'components/ui/ButtonTooltip'
import type {
  Integration,
  IntegrationProjectConnection,
} from 'data/integrations/integrations.types'
import { useProjectsQuery } from 'data/projects/projects-query'
import { BASE_PATH } from 'lib/constants'
import { getIntegrationConfigurationUrl } from 'lib/integration-utils'
import { Badge, Button, cn } from 'ui'

const ICON_STROKE_WIDTH = 2
const ICON_SIZE = 14

export interface IntegrationInstallationProps extends RefAttributes<HTMLLIElement> {
  title: string
  integration: Integration
  disabled?: boolean
}

type HandleIconType = Integration['integration']['name'] | 'Skybase'

const HandleIcon = ({ type, className }: { type: HandleIconType; className?: string }) => {
  switch (type) {
    case 'GitHub':
      return <Github strokeWidth={ICON_STROKE_WIDTH} size={ICON_SIZE} />
      break
    // case 'Netlify':
    //   return <Square strokeWidth={ICON_STROKE_WIDTH} size={ICON_SIZE} />
    //   break
    case 'Vercel':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 512 512"
          className={cn('w-3.5', className)}
        >
          <path fillRule="evenodd" d="M256,48,496,464H16Z" />
        </svg>
      )

      break
    case 'Skybase':
      return <img src={`${BASE_PATH}/img/skybase-logo.svg`} alt="Skybase" className="w-3.5"></img>
      break

    default:
      return <></>
      break
  }
}

const Avatar = ({ src }: { src: string | undefined }) => {
  return (
    <div className="relative border shadow-lg w-8 h-8 rounded-full overflow-hidden">
      <Image
        src={src || ''}
        width={30}
        height={30}
        layout="fill"
        alt="avatar"
        className="relative"
      />
    </div>
  )
}

const IntegrationInstallation = forwardRef<HTMLLIElement, IntegrationInstallationProps>(
  ({ integration, disabled, ...props }, ref) => {
    const IntegrationIconBlock = () => {
      return (
        <div className="bg-black text-white w-8 h-8 rounded flex items-center justify-center">
          <HandleIcon type={integration.integration.name} />
        </div>
      )
    }

    return (
      <li
        ref={ref}
        key={integration.id}
        className="bg-surface-100 border shadow-sm flex justify-between items-center px-8 py-4 rounded-lg"
        {...props}
      >
        <div className="flex gap-6 items-center">
          <div className="flex gap-3 items-center">
            <div className="flex -space-x-1">
              <IntegrationIconBlock />
              <Avatar src={integration?.metadata?.account.avatar} />
            </div>
          </div>
          <div className="flex flex-col gap-0">
            <div className="flex items-center gap-2">
              <span className="text-foreground text-sm font-medium">
                {integration.metadata?.account.name ||
                  (integration.metadata !== undefined &&
                    'gitHubConnectionOwner' in integration.metadata &&
                    integration.metadata?.gitHubConnectionOwner)}
              </span>

              <Badge className="capitalize">{integration.metadata?.account.type}</Badge>
            </div>
            <div className="flex flex-col gap-0">
              <span className="text-foreground-lighter text-xs">
                Created {dayjs(integration.inserted_at).fromNow()}
              </span>
              <span className="text-foreground-lighter text-xs">
                Added by {integration?.added_by?.primary_email}
              </span>
            </div>
          </div>
        </div>

        <Button asChild disabled={disabled} type="default" iconRight={<ExternalLink />}>
          {disabled ? (
            <p>Manage</p>
          ) : (
            <Link
              href={getIntegrationConfigurationUrl(integration)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Manage
            </Link>
          )}
        </Button>
      </li>
    )
  }
)

export interface IntegrationConnectionProps extends HTMLAttributes<HTMLLIElement> {
  connection: IntegrationProjectConnection
  type: Integration['integration']['name']
  actions?: ReactNode
  showNode?: boolean
  orientation?: 'horizontal' | 'vertical'
}

const IntegrationConnection = forwardRef<HTMLLIElement, IntegrationConnectionProps>(
  (
    { connection, type, actions, showNode = true, orientation = 'horizontal', className, ...props },
    ref
  ) => {
    const { data: projects } = useProjectsQuery()
    const project = projects?.find((project) => project.ref === connection.skybase_project_ref)

    return (
      <li
        ref={ref}
        key={connection.id}
        {...props}
        className={cn(showNode && 'pl-8 ml-6 border-l border-muted', 'relative')}
      >
        {showNode && (
          <div className="absolute w-8 rounded-bl-full border-b border-l border-muted h-10 -left-px"></div>
        )}
        <div
          className={cn(
            orientation === 'horizontal'
              ? 'flex items-center justify-between gap-2'
              : 'flex flex-col gap-3',
            'bg-surface-100 border shadow-sm px-6 py-4 rounded-lg',
            className
          )}
        >
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 flex gap-x-2 items-center max-w-40 ">
                <HandleIcon type={'Skybase'} />
                <span title={project?.name} className="text-sm truncate">
                  {project?.name}
                </span>
              </div>

              <ArrowRight
                size={14}
                className="flex-shrink-0 text-foreground-lighter"
                strokeWidth={1.5}
              />

              <div className="flex-1 min-w-0 flex gap-2 items-center">
                {!connection?.metadata?.framework ? (
                  <div className="bg-black text-white w-4 h-4 rounded flex items-center justify-center">
                    <HandleIcon type={type} className={'!w-2.5'} />
                  </div>
                ) : (
                  <img
                    src={`${BASE_PATH}/img/icons/frameworks/${connection.metadata.framework}.svg`}
                    width={21}
                    height={21}
                    alt={`icon`}
                  />
                )}
                {type === 'GitHub' ? (
                  <a
                    title={connection.metadata.name}
                    href={`https://github.com/${connection.metadata?.name}`}
                    className="text-sm truncate"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {connection.metadata?.name}
                  </a>
                ) : (
                  <span title={connection.metadata.name} className="text-sm truncate">
                    {connection.metadata?.name}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-0">
              <span className="text-foreground-lighter text-xs">
                Connected {dayjs(connection?.inserted_at).fromNow()}
              </span>
              <span className="text-foreground-lighter text-xs">
                Added by {connection?.added_by?.primary_email}
              </span>
            </div>
          </div>

          <div className="flex-shrink-0">{actions}</div>
        </div>
      </li>
    )
  }
)

const IntegrationConnectionOption = forwardRef<HTMLLIElement, IntegrationConnectionProps>(
  ({ connection, type, ...props }, ref) => {
    const { data: projects } = useProjectsQuery()
    const project = projects?.find((project) => project.ref === connection.skybase_project_ref)

    return (
      <li
        ref={ref}
        key={connection.id}
        {...props}
        className={cn(
          'bg-surface-100 border shadow-sm flex justify-between items-center px-8 py-4 rounded-lg'
        )}
      >
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <HandleIcon type={'Skybase'} />
            <span className="text-sm">{project?.name}</span>
            <ArrowRight size={14} className="text-foreground-lighter" strokeWidth={1.5} />
            <HandleIcon type={type} />
            <span className="text-sm">{connection.metadata.name}</span>
          </div>

          <span className="text-foreground-lighter text-xs">
            Connected {dayjs(connection.inserted_at).fromNow()}
          </span>
        </div>

        <Button type="default">Connect</Button>
      </li>
    )
  }
)

const EmptyIntegrationConnection = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    showNode?: boolean
    onClick: () => void
    disabled?: boolean
  }
>(({ className, showNode = true, onClick, disabled, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        showNode && 'ml-6 pl-8 mt-4 border-l',
        'relative pb-2',
        'last:border-l-transparent',
        className
      )}
    >
      {showNode && (
        <div className="absolute w-8 rounded-bl-full border-b border-l border-muted h-14 -top-4 -left-px"></div>
      )}
      <div
        className={cn(
          'w-full',
          'border border-dashed bg-surface-100 border-overlay',
          'flex h-20 px-10 rounded-lg justify-center items-center'
        )}
      >
        <ButtonTooltip
          type="default"
          disabled={disabled}
          onClick={() => onClick()}
          tooltip={{
            content: {
              side: 'bottom',
              text: disabled ? 'Additional permissions required to add connection' : undefined,
            },
          }}
        >
          Add new project connection
        </ButtonTooltip>
      </div>
    </div>
  )
})

interface IntegrationConnectionHeader extends React.HTMLAttributes<HTMLDivElement> {
  name?: string
  markdown?: string
  showNode?: boolean
}

const IntegrationConnectionHeader = forwardRef<HTMLDivElement, IntegrationConnectionHeader>(
  ({ className, markdown = '', showNode = true, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          showNode && 'border-l border-muted ml-6 pl-8',
          'py-4 prose text-sm',
          className
        )}
      >
        {props.title && <h5 className="text-foreground">{props.title}</h5>}
        <Markdown content={markdown} />
      </div>
    )
  }
)

IntegrationInstallation.displayName = 'IntegrationInstallation'
IntegrationConnection.displayName = 'IntegrationConnection'
IntegrationConnectionHeader.displayName = 'IntegrationConnectionHeader'
EmptyIntegrationConnection.displayName = 'EmptyIntegrationConnection'
IntegrationConnectionOption.displayName = 'IntegrationConnectionOption'

export {
  EmptyIntegrationConnection,
  IntegrationConnection,
  IntegrationConnectionHeader,
  IntegrationConnectionOption,
  IntegrationInstallation,
}
