'use client'

import { createClient } from '@/registry/default/fixtures/lib/skybase/client'
import { PostgrestQueryBuilder } from '@skybase/postgrest-js'
import { SkybaseClient } from '@skybase/skybase-js'
import { useEffect, useRef, useSyncExternalStore } from 'react'

const skybase = createClient()

// The following types are used to make the hook type-safe. It extracts the database type from the skybase client.
type SkybaseClientType = typeof skybase

// Utility type to check if the type is any
type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N

// Extracts the database type from the skybase client. If the skybase client doesn't have a type, it will fallback properly.
type Database =
  SkybaseClientType extends SkybaseClient<infer U>
    ? IfAny<
        U,
        {
          public: {
            Tables: Record<string, any>
            Views: Record<string, any>
            Functions: Record<string, any>
          }
        },
        U
      >
    : never

// Change this to the database schema you want to use
type DatabaseSchema = Database['public']

// Extracts the table names from the database type
type SkybaseTableName = keyof DatabaseSchema['Tables']

// Extracts the table definition from the database type
type SkybaseTableData<T extends SkybaseTableName> = DatabaseSchema['Tables'][T]['Row']

type SkybaseSelectBuilder<T extends SkybaseTableName> = ReturnType<
  PostgrestQueryBuilder<DatabaseSchema, DatabaseSchema['Tables'][T], T>['select']
>

// A function that modifies the query. Can be used to sort, filter, etc. If .range is used, it will be overwritten.
type SkybaseQueryHandler<T extends SkybaseTableName> = (
  query: SkybaseSelectBuilder<T>
) => SkybaseSelectBuilder<T>

interface UseInfiniteQueryProps<T extends SkybaseTableName, Query extends string = '*'> {
  // The table name to query
  tableName: T
  // The columns to select, defaults to `*`
  columns?: string
  // The number of items to fetch per page, defaults to `20`
  pageSize?: number
  // A function that modifies the query. Can be used to sort, filter, etc. If .range is used, it will be overwritten.
  trailingQuery?: SkybaseQueryHandler<T>
}

interface StoreState<TData> {
  data: TData[]
  count: number
  isSuccess: boolean
  isLoading: boolean
  isFetching: boolean
  error: Error | null
  hasInitialFetch: boolean
}

type Listener = () => void

function createStore<TData extends SkybaseTableData<T>, T extends SkybaseTableName>(
  props: UseInfiniteQueryProps<T>
) {
  const { tableName, columns = '*', pageSize = 20, trailingQuery } = props

  let state: StoreState<TData> = {
    data: [],
    count: 0,
    isSuccess: false,
    isLoading: false,
    isFetching: false,
    error: null,
    hasInitialFetch: false,
  }

  const listeners = new Set<Listener>()

  const notify = () => {
    listeners.forEach((listener) => listener())
  }

  const setState = (newState: Partial<StoreState<TData>>) => {
    state = { ...state, ...newState }
    notify()
  }

  const fetchPage = async (skip: number) => {
    if (state.hasInitialFetch && (state.isFetching || state.count <= state.data.length)) return

    setState({ isFetching: true })

    let query = skybase
      .from(tableName)
      .select(columns, { count: 'exact' }) as unknown as SkybaseSelectBuilder<T>

    if (trailingQuery) {
      query = trailingQuery(query)
    }
    const { data: newData, count, error } = await query.range(skip, skip + pageSize - 1)

    if (error) {
      console.error('An unexpected error occurred:', error)
      setState({ error })
    } else {
      const deduplicatedData = ((newData || []) as TData[]).filter(
        (item) => !state.data.find((old) => old.id === item.id)
      )

      setState({
        data: [...state.data, ...deduplicatedData],
        count: count || 0,
        isSuccess: true,
        error: null,
      })
    }
    setState({ isFetching: false })
  }

  const fetchNextPage = async () => {
    if (state.isFetching) return
    await fetchPage(state.data.length)
  }

  const initialize = async () => {
    setState({ isLoading: true, isSuccess: false, data: [] })
    await fetchNextPage()
    setState({ isLoading: false, hasInitialFetch: true })
  }

  return {
    getState: () => state,
    subscribe: (listener: Listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    fetchNextPage,
    initialize,
  }
}

// Empty initial state to avoid hydration errors.
const initialState: any = {
  data: [],
  count: 0,
  isSuccess: false,
  isLoading: false,
  isFetching: false,
  error: null,
  hasInitialFetch: false,
}

function useInfiniteQuery<
  TData extends SkybaseTableData<T>,
  T extends SkybaseTableName = SkybaseTableName,
>(props: UseInfiniteQueryProps<T>) {
  const storeRef = useRef(createStore<TData, T>(props))

  const state = useSyncExternalStore(
    storeRef.current.subscribe,
    () => storeRef.current.getState(),
    () => initialState as StoreState<TData>
  )

  useEffect(() => {
    // Recreate store if props change
    if (
      storeRef.current.getState().hasInitialFetch &&
      (props.tableName !== props.tableName ||
        props.columns !== props.columns ||
        props.pageSize !== props.pageSize)
    ) {
      storeRef.current = createStore<TData, T>(props)
    }

    if (!state.hasInitialFetch && typeof window !== 'undefined') {
      storeRef.current.initialize()
    }
  }, [props.tableName, props.columns, props.pageSize, state.hasInitialFetch])

  return {
    data: state.data,
    count: state.count,
    isSuccess: state.isSuccess,
    isLoading: state.isLoading,
    isFetching: state.isFetching,
    error: state.error,
    hasMore: state.count > state.data.length,
    fetchNextPage: storeRef.current.fetchNextPage,
  }
}

export {
  useInfiniteQuery,
  type SkybaseQueryHandler,
  type SkybaseTableData,
  type SkybaseTableName,
  type UseInfiniteQueryProps,
}
