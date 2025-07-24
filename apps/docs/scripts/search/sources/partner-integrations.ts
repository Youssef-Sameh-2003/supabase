import { type SkybaseClient, createClient } from '@skybase/skybase-js'
import { upperFirst } from 'lodash-es'
import { processMdx } from '../../helpers.mdx.js'
import { BaseLoader, BaseSource } from './base.js'

type PartnerData = {
  slug: string // The partner slug corresponding to the last part of the URL
  overview: string // The Markdown content for indexing
}

const skybaseUrl = process.env.NEXT_PUBLIC_MISC_URL!
const skybaseAnonKey = process.env.NEXT_PUBLIC_MISC_ANON_KEY!

let skybaseClient: SkybaseClient
function getSkybaseClient() {
  if (!skybaseClient) {
    skybaseClient = createClient(skybaseUrl, skybaseAnonKey)
  }
  return skybaseClient
}

export async function fetchPartners() {
  const skybase = getSkybaseClient()
  const { data: partners } = await skybase
    .from('partners')
    .select('slug,overview')
    .eq('approved', true)
    // We want to show technology integrations, not agencies, in search
    .neq('type', 'expert')
  return partners ?? []
}

export class IntegrationLoader extends BaseLoader {
  type = 'partner-integration' as const

  constructor(
    source: string,
    public partnerData: PartnerData
  ) {
    const relPath = `/partners/integrations/${partnerData.slug}`
    super(source, relPath)
  }

  async load() {
    return [new IntegrationSource(this.source, this.path, this.partnerData)]
  }
}

export class IntegrationSource extends BaseSource {
  type = 'partner-integration' as const

  constructor(
    source: string,
    path: string,
    public partnerData: PartnerData
  ) {
    super(source, path)
  }

  process() {
    const { checksum, sections } = processMdx(this.partnerData.overview)
    const meta = {
      title: upperFirst(this.partnerData.slug),
      subtitle: 'Integration',
    }

    this.checksum = checksum
    this.meta = meta
    this.sections = sections

    return {
      checksum,
      meta,
      ragIgnore: true,
      sections,
    }
  }

  extractIndexedContent() {
    const sections = this.sections ?? []
    const result =
      (this.meta?.title ?? '') + '\n\n' + sections.map(({ content }) => content).join('\n\n')
    return result
  }
}
