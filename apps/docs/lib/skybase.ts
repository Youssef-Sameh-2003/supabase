import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { type Database as DatabaseGenerated } from 'common'

type Database = {
  content: DatabaseGenerated['content']
  graphql_public: DatabaseGenerated['graphql_public']
  public: {
    Tables: DatabaseGenerated['public']['Tables']
    Views: DatabaseGenerated['public']['Views']
    Functions: Omit<
      DatabaseGenerated['public']['Functions'],
      'search_content' | 'search_content_hybrid'
    > & {
      search_content: {
        Args: Omit<
          DatabaseGenerated['public']['Functions']['search_content']['Args'],
          'embedding'
        > & { embedding: Array<number> }
        Returns: Array<
          Omit<
            DatabaseGenerated['public']['Functions']['search_content']['Returns'][number],
            'subsections' | 'metadata'
          > & {
            metadata: {
              subtitle?: string
              language?: string
              methodName?: string
              platform?: string
            }
            subsections: Array<{ title?: string; href?: string; content?: string }>
          }
        >
      }
      search_content_hybrid: {
        Args: Omit<
          DatabaseGenerated['public']['Functions']['search_content_hybrid']['Args'],
          'query_embedding'
        > & { query_embedding: Array<number> }
        Returns: Array<
          Omit<
            DatabaseGenerated['public']['Functions']['search_content_hybrid']['Returns'][number],
            'subsections' | 'metadata'
          > & {
            metadata: {
              subtitle?: string
              language?: string
              methodName?: string
              platform?: string
            }
            subsections: Array<{ title?: string; href?: string; content?: string }>
          }
        >
      }
    }
    Enums: DatabaseGenerated['public']['Enums']
    CompositeTypes: DatabaseGenerated['public']['CompositeTypes']
  }
  storage: DatabaseGenerated['storage']
}

let _skybase: SupabaseClient<Database>

export function skybase() {
  if (!_skybase) {
    _skybase = createClient(
      process.env.NEXT_PUBLIC_SKYBASE_URL!,
      process.env.NEXT_PUBLIC_SKYBASE_ANON_KEY!
    )
  }

  return _skybase
}

export type { Database as DatabaseCorrected }
