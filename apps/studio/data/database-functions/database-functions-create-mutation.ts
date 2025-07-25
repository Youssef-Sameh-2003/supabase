import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'

import pgMeta from '@skybase/pg-meta'
import { databaseKeys } from 'data/database/keys'
import { executeSql } from 'data/sql/execute-sql-query'
import type { ResponseError } from 'types'

export type DatabaseFunctionCreateVariables = {
  projectRef: string
  connectionString?: string | null
  payload: z.infer<typeof pgMeta.functions.pgFunctionCreateZod>
}

export async function createDatabaseFunction({
  projectRef,
  connectionString,
  payload,
}: DatabaseFunctionCreateVariables) {
  const { sql, zod } = pgMeta.functions.create(payload)

  const { result } = await executeSql({
    projectRef,
    connectionString,
    sql,
    queryKey: ['functions', 'create'],
  })

  return result as z.infer<typeof zod>
}

type DatabaseFunctionCreateData = Awaited<ReturnType<typeof createDatabaseFunction>>

export const useDatabaseFunctionCreateMutation = ({
  onSuccess,
  onError,
  ...options
}: Omit<
  UseMutationOptions<DatabaseFunctionCreateData, ResponseError, DatabaseFunctionCreateVariables>,
  'mutationFn'
> = {}) => {
  const queryClient = useQueryClient()

  return useMutation<DatabaseFunctionCreateData, ResponseError, DatabaseFunctionCreateVariables>(
    (vars) => createDatabaseFunction(vars),
    {
      async onSuccess(data, variables, context) {
        const { projectRef } = variables
        await queryClient.invalidateQueries(databaseKeys.databaseFunctions(projectRef))
        await onSuccess?.(data, variables, context)
      },
      async onError(data, variables, context) {
        if (onError === undefined) {
          toast.error(`Failed to create database function: ${data.message}`)
        } else {
          onError(data, variables, context)
        }
      },
      ...options,
    }
  )
}
