import { zodResolver } from '@hookform/resolvers/zod'
import { PermissionAction } from '@skybase/shared-types/out/constants'
import { indexOf } from 'lodash'
import { Lock } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useParams } from 'common'
import { useProjectContext } from 'components/layouts/ProjectLayout/ProjectContext'
import { DocsButton } from 'components/ui/DocsButton'
import { FormActions } from 'components/ui/Forms/FormActions'
import {
  FormPanelContainer,
  FormPanelContent,
  FormPanelFooter,
  FormPanelHeader,
} from 'components/ui/Forms/FormPanel'
import { useProjectPostgrestConfigQuery } from 'data/config/project-postgrest-config-query'
import { useProjectPostgrestConfigUpdateMutation } from 'data/config/project-postgrest-config-update-mutation'
import { useDatabaseExtensionsQuery } from 'data/database-extensions/database-extensions-query'
import { useSchemasQuery } from 'data/database/schemas-query'
import { useCheckPermissions } from 'hooks/misc/useCheckPermissions'
import {
  AlertDescription_Shadcn_,
  AlertTitle_Shadcn_,
  Alert_Shadcn_,
  Button,
  CollapsibleContent_Shadcn_,
  Collapsible_Shadcn_,
  FormControl_Shadcn_,
  FormField_Shadcn_,
  FormItem_Shadcn_,
  Form_Shadcn_,
  Input_Shadcn_,
  Separator,
  Skeleton,
  Switch,
  WarningIcon,
} from 'ui'
import { Admonition } from 'ui-patterns/admonition'
import { FormItemLayout } from 'ui-patterns/form/FormItemLayout/FormItemLayout'
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from 'ui-patterns/multi-select'
import { HardenAPIModal } from './HardenAPIModal'

const formSchema = z
  .object({
    dbSchema: z.array(z.string()),
    dbExtraSearchPath: z.string(),
    maxRows: z.number().max(1000000, "Can't be more than 1,000,000"),
    dbPool: z
      .number()
      .min(0, 'Must be more than 0')
      .max(1000, "Can't be more than 1000")
      .optional()
      .nullable(),
    enableDataApi: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.enableDataApi && data.dbSchema.length === 0) {
        return false
      }
      return true
    },
    {
      message: 'Must have at least one schema if Data API is enabled',
      path: ['dbSchema'],
    }
  )

export const PostgrestConfig = () => {
  const { ref: projectRef } = useParams()
  const { project } = useProjectContext()

  const [showModal, setShowModal] = useState(false)

  const { data: config, isError } = useProjectPostgrestConfigQuery({ projectRef })
  const { data: extensions } = useDatabaseExtensionsQuery({
    projectRef: project?.ref,
    connectionString: project?.connectionString,
  })
  const { data: schemas, isLoading: isLoadingSchemas } = useSchemasQuery({
    projectRef: project?.ref,
    connectionString: project?.connectionString,
  })
  const { mutate: updatePostgrestConfig, isLoading: isUpdating } =
    useProjectPostgrestConfigUpdateMutation({
      onSuccess: () => {
        toast.success('Successfully saved settings')
      },
    })

  const formId = 'project-postgres-config'
  const hiddenSchema = ['auth', 'pgbouncer', 'hooks', 'extensions']
  const canUpdatePostgrestConfig = useCheckPermissions(
    PermissionAction.UPDATE,
    'custom_config_postgrest'
  )

  const isGraphqlExtensionEnabled =
    (extensions ?? []).find((ext) => ext.name === 'pg_graphql')?.installed_version !== null

  const dbSchema = config?.db_schema ? config?.db_schema.replace(/ /g, '').split(',') : []
  const defaultValues = {
    dbSchema,
    maxRows: config?.max_rows,
    dbExtraSearchPath: config?.db_extra_search_path,
    dbPool: config?.db_pool,
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues,
  })

  const schema =
    schemas
      ?.filter((x) => {
        const find = indexOf(hiddenSchema, x.name)
        if (find < 0) return x
      })
      .map((x) => {
        return {
          id: x.id,
          value: x.name,
          name: x.name,
          disabled: false,
        }
      }) ?? []

  function resetForm() {
    const enableDataApi = config?.db_schema ? true : false
    form.reset({ ...defaultValues, enableDataApi })
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!projectRef) return console.error('Project ref is required') // is this needed ?

    updatePostgrestConfig({
      projectRef,
      dbSchema: values.dbSchema.join(', '),
      maxRows: values.maxRows,
      dbExtraSearchPath: values.dbExtraSearchPath,
      dbPool: values.dbPool ? values.dbPool : null,
    })
  }

  useEffect(() => {
    if (config) {
      /**
       * Checks if enableDataApi should be enabled or disabled
       * based on the db_schema value being empty string
       */
      resetForm()
    }
  }, [config])

  const isDataApiEnabledInForm = form.getValues('enableDataApi')

  return (
    <>
      <Form_Shadcn_ {...form}>
        <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
          <FormPanelContainer>
            <FormPanelHeader className="flex items-center justify-between">
              <span>Data API Settings</span>
              <div className="flex items-center gap-x-2">
                <DocsButton href="https://skybase.com/docs/guides/database/connecting-to-postgres#data-apis" />
                <Button type="default" icon={<Lock />} onClick={() => setShowModal(true)}>
                  Harden Data API
                </Button>
              </div>
            </FormPanelHeader>
            <FormPanelContent>
              {isError ? (
                <Admonition type="destructive" title="Failed to retrieve API settings" />
              ) : (
                <>
                  <FormField_Shadcn_
                    control={form.control}
                    name="enableDataApi"
                    render={({ field }) => (
                      <FormItem_Shadcn_ className="w-full">
                        <FormItemLayout
                          className="w-full px-8 py-8"
                          layout="flex"
                          label="Enable Data API"
                          description="When enabled you will be able to use any Skybase client library and PostgREST endpoints with any schema configured below."
                        >
                          <FormControl_Shadcn_>
                            <Switch
                              size="large"
                              disabled={!canUpdatePostgrestConfig}
                              checked={field.value}
                              onCheckedChange={(value) => {
                                field.onChange(value)
                                if (!value) {
                                  form.setValue('enableDataApi', false)
                                  form.setValue('dbSchema', [])
                                } else {
                                  form.setValue('enableDataApi', true)
                                  form.setValue('dbSchema', dbSchema)
                                }
                              }}
                            />
                          </FormControl_Shadcn_>
                        </FormItemLayout>

                        {!field.value && (
                          <>
                            <Separator />
                            <Alert_Shadcn_
                              variant="warning"
                              className="mb-0 border-none rounded-none"
                            >
                              <WarningIcon className="!left-[2rem]" />
                              <AlertTitle_Shadcn_ className="!pl-[3.5rem] !left-[6rem]">
                                No schemas can be queried
                              </AlertTitle_Shadcn_>
                              <AlertDescription_Shadcn_ className="!pl-[3.5rem]">
                                <p>
                                  With this setting disabled, you will not be able to query any
                                  schemas via the Data API.
                                </p>
                                <p>
                                  You will see errors from the Postgrest endpoint
                                  <code className="text-xs">/rest/v1/</code>.
                                </p>
                              </AlertDescription_Shadcn_>
                            </Alert_Shadcn_>
                          </>
                        )}
                      </FormItem_Shadcn_>
                    )}
                  />
                  <Collapsible_Shadcn_ open={form.getValues('enableDataApi')}>
                    <CollapsibleContent_Shadcn_ className="border-t divide-y transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                      <FormField_Shadcn_
                        control={form.control}
                        name="dbSchema"
                        render={({ field }) => (
                          <FormItem_Shadcn_ className="w-full">
                            <FormItemLayout
                              label="Exposed schemas"
                              description="The schemas to expose in your API. Tables, views and stored procedures in
                          these schemas will get API endpoints."
                              layout="horizontal"
                              className="px-8 py-8"
                            >
                              {isLoadingSchemas ? (
                                <div className="col-span-12 flex flex-col gap-2 lg:col-span-7">
                                  <Skeleton className="w-full h-[38px]" />
                                </div>
                              ) : (
                                <MultiSelector
                                  onValuesChange={field.onChange}
                                  values={field.value}
                                  size="small"
                                  disabled={!canUpdatePostgrestConfig || !isDataApiEnabledInForm}
                                >
                                  <MultiSelectorTrigger
                                    mode="inline-combobox"
                                    label="Select schemas for Data API..."
                                    badgeLimit="wrap"
                                    showIcon={false}
                                    deletableBadge
                                  />
                                  <MultiSelectorContent>
                                    <MultiSelectorList>
                                      {schema.length <= 0 ? (
                                        <MultiSelectorItem key="empty" value="no">
                                          no
                                        </MultiSelectorItem>
                                      ) : (
                                        <>
                                          {schema.map((x) => (
                                            <MultiSelectorItem
                                              key={x.id + '-' + x.name}
                                              value={x.name}
                                            >
                                              {x.name}
                                            </MultiSelectorItem>
                                          ))}
                                        </>
                                      )}
                                    </MultiSelectorList>
                                  </MultiSelectorContent>
                                </MultiSelector>
                              )}

                              {!field.value.includes('public') && field.value.length > 0 && (
                                <Admonition
                                  type="default"
                                  title="The public schema for this project is not exposed"
                                  className="mt-2"
                                  description={
                                    <>
                                      <p>
                                        You will not be able to query tables and views in the{' '}
                                        <code>public</code> schema via skybase-js or HTTP clients.
                                      </p>
                                      {isGraphqlExtensionEnabled && (
                                        <>
                                          <p>
                                            Tables in the <code className="text-xs">public</code>{' '}
                                            schema are still exposed over our GraphQL endpoints.
                                          </p>
                                          <Button asChild type="default">
                                            <Link
                                              href={`/project/${projectRef}/database/extensions`}
                                            >
                                              Disable the pg_graphql extension
                                            </Link>
                                          </Button>
                                        </>
                                      )}
                                    </>
                                  }
                                />
                              )}
                            </FormItemLayout>
                          </FormItem_Shadcn_>
                        )}
                      />

                      <FormField_Shadcn_
                        control={form.control}
                        name="dbExtraSearchPath"
                        render={({ field }) => (
                          <FormItem_Shadcn_ className="w-full">
                            <FormItemLayout
                              className="w-full px-8 py-8"
                              layout="horizontal"
                              label="Extra search path"
                              description="Extra schemas to add to the search path of every request. Multiple schemas must be comma-separated."
                            >
                              <FormControl_Shadcn_>
                                <Input_Shadcn_
                                  size="small"
                                  disabled={!canUpdatePostgrestConfig || !isDataApiEnabledInForm}
                                  {...field}
                                />
                              </FormControl_Shadcn_>
                            </FormItemLayout>
                          </FormItem_Shadcn_>
                        )}
                      />

                      <FormField_Shadcn_
                        control={form.control}
                        name="maxRows"
                        render={({ field }) => (
                          <FormItem_Shadcn_ className="w-full">
                            <FormItemLayout
                              className="w-full px-8 py-8"
                              layout="horizontal"
                              label="Max rows"
                              description="The maximum number of rows returned from a view, table, or stored procedure. Limits payload size for accidental or malicious requests."
                            >
                              <FormControl_Shadcn_>
                                <Input_Shadcn_
                                  size="small"
                                  disabled={!canUpdatePostgrestConfig || !isDataApiEnabledInForm}
                                  {...field}
                                  type="number"
                                  {...form.register('maxRows', {
                                    valueAsNumber: true, // Ensure the value is handled as a number
                                  })}
                                />
                              </FormControl_Shadcn_>
                            </FormItemLayout>
                          </FormItem_Shadcn_>
                        )}
                      />

                      <FormField_Shadcn_
                        control={form.control}
                        name="dbPool"
                        render={({ field }) => (
                          <FormItem_Shadcn_ className="w-full">
                            <FormItemLayout
                              className="w-full px-8 py-8"
                              layout="horizontal"
                              label="Pool size"
                              description="Number of maximum connections to keep open in the Data API server's database pool. Unset to let it be configured automatically based on compute size."
                            >
                              <FormControl_Shadcn_>
                                <Input_Shadcn_
                                  size="small"
                                  disabled={!canUpdatePostgrestConfig || !isDataApiEnabledInForm}
                                  {...field}
                                  type="number"
                                  placeholder="Configured automatically based on compute size"
                                  onChange={(e) =>
                                    field.onChange(
                                      e.target.value === '' ? null : Number(e.target.value)
                                    )
                                  }
                                  value={field.value === null ? '' : field.value}
                                />
                              </FormControl_Shadcn_>
                            </FormItemLayout>
                          </FormItem_Shadcn_>
                        )}
                      />
                    </CollapsibleContent_Shadcn_>
                  </Collapsible_Shadcn_>
                </>
              )}
              <FormPanelFooter className="flex px-8 py-4">
                <FormActions
                  form={formId}
                  isSubmitting={isUpdating}
                  hasChanges={form.formState.isDirty}
                  handleReset={resetForm}
                  disabled={!canUpdatePostgrestConfig}
                  helper={
                    !canUpdatePostgrestConfig
                      ? "You need additional permissions to update your project's API settings"
                      : undefined
                  }
                />
              </FormPanelFooter>
            </FormPanelContent>
          </FormPanelContainer>
        </form>
      </Form_Shadcn_>

      <HardenAPIModal visible={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
