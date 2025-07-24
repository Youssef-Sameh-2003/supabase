import type { HttpRequest, Statement, SkybaseJsQuery } from '@skybase/sql-to-rest'

export type BaseResult = {
  statement: Statement
}

export type HttpResult = BaseResult &
  HttpRequest & {
    type: 'http'
    language: 'http' | 'curl'
  }

export type SkybaseJsResult = BaseResult &
  SkybaseJsQuery & {
    type: 'skybase-js'
    language: 'js'
  }

export type ResultBundle = HttpResult | SkybaseJsResult
