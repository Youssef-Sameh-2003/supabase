import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { Query } from '@skybase/pg-meta/src/query'
import { executeSql } from 'data/sql/execute-sql-query'
import { RoleImpersonationState, wrapWithRoleImpersonation } from 'lib/role-impersonation'
import { isRoleImpersonationEnabled } from 'state/role-impersonation-state'
import type { ResponseError } from 'types'
import { tableRowKeys } from './keys'

export type TableRowUpdateVariables = {
  projectRef: string
  connectionString?: string | null
  table: { id: number; name: string; schema?: string }
  configuration: { identifiers: any }
  payload: any
  enumArrayColumns: string[]
  returning?: boolean
  roleImpersonationState?: RoleImpersonationState
}

export function getTableRowUpdateSql({
  table,
  configuration,
  payload,
  returning = false,
  enumArrayColumns,
}: Pick<
  TableRowUpdateVariables,
  'table' | 'payload' | 'configuration' | 'enumArrayColumns' | 'returning'
>) {
  return new Query()
    .from(table.name, table.schema ?? undefined)
    .update(payload, { returning, enumArrayColumns })
    .match(configuration.identifiers)
    .toSql()
}

export async function updateTableRow({
  projectRef,
  connectionString,
  table,
  payload,
  configuration,
  enumArrayColumns,
  returning,
  roleImpersonationState,
}: TableRowUpdateVariables) {
  const sql = wrapWithRoleImpersonation(
    getTableRowUpdateSql({ table, configuration, payload, enumArrayColumns, returning }),
    roleImpersonationState
  )

  const { result } = await executeSql({
    projectRef,
    connectionString,
    sql,
    isRoleImpersonationEnabled: isRoleImpersonationEnabled(roleImpersonationState?.role),
    queryKey: ['table-row-update', table.id],
  })

  return result
}

type TableRowUpdateData = Awaited<ReturnType<typeof updateTableRow>>

export const useTableRowUpdateMutation = ({
  onSuccess,
  onError,
  ...options
}: Omit<
  UseMutationOptions<TableRowUpdateData, ResponseError, TableRowUpdateVariables>,
  'mutationFn'
> = {}) => {
  const queryClient = useQueryClient()

  return useMutation<TableRowUpdateData, ResponseError, TableRowUpdateVariables>(
    (vars) => updateTableRow(vars),
    {
      async onSuccess(data, variables, context) {
        const { projectRef, table } = variables
        await queryClient.invalidateQueries(
          tableRowKeys.tableRows(projectRef, { table: { id: table.id } })
        )
        await onSuccess?.(data, variables, context)
      },
      async onError(data, variables, context) {
        if (onError === undefined) {
          toast.error(`Failed to update table row: ${data.message}`)
        } else {
          onError(data, variables, context)
        }
      },
      ...options,
    }
  )
}
