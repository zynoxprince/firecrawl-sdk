// Typed models for the Firecrawl SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface MapType {
  auditMetadata?: Record<string, any>
  ignoreCache?: boolean
  ignoreQueryParameters?: boolean
  includeSubdomains?: boolean
  limit?: number
  links?: any[]
  location?: Record<string, any>
  search?: string
  sitemap?: string
  success?: boolean
  threatProtection?: Record<string, any>
  timeout?: number
  url: string
}

export interface MapCreateData {
  auditMetadata?: Record<string, any>
  ignoreCache?: boolean
  ignoreQueryParameters?: boolean
  includeSubdomains?: boolean
  limit?: number
  location?: Record<string, any>
  search?: string
  sitemap?: string
  threatProtection?: Record<string, any>
  timeout?: number
  url: string
}

export interface Scrape {
  actions?: any
  answer?: string
  audio?: string
  auditMetadata?: Record<string, any>
  blockAds?: boolean
  blocks?: any[]
  branding?: Record<string, any>
  changeTracking?: Record<string, any>
  domainTools?: boolean
  excludeTags?: any[]
  formats?: any[]
  headers?: Record<string, any>
  highlights?: string
  html?: string
  includeTags?: any[]
  links?: any[]
  location?: Record<string, any>
  lockdown?: boolean
  markdown?: string
  maxAge?: number
  menu?: Record<string, any>
  metadata?: Record<string, any>
  minAge?: number
  mobile?: boolean
  onlyCleanContent?: boolean
  onlyMainContent?: boolean
  pages?: any[]
  parsers?: any[]
  product?: Record<string, any>
  profile?: Record<string, any>
  proxy?: string
  rawBase64?: string
  rawHtml?: string
  redactPII?: any
  removeBase64Images?: boolean
  screenshot?: string
  skipTlsVerification?: boolean
  storeInCache?: boolean
  summary?: string
  threatProtection?: Record<string, any>
  timeout?: number
  tools?: any[]
  url: string
  video?: string
  waitFor?: number
  warning?: string
  zeroDataRetention?: boolean
}

export interface ScrapeCreateData {
  actions?: any
  auditMetadata?: Record<string, any>
  blockAds?: boolean
  domainTools?: boolean
  excludeTags?: any[]
  formats?: any[]
  headers?: Record<string, any>
  includeTags?: any[]
  location?: Record<string, any>
  lockdown?: boolean
  maxAge?: number
  minAge?: number
  mobile?: boolean
  onlyCleanContent?: boolean
  onlyMainContent?: boolean
  parsers?: any[]
  profile?: Record<string, any>
  proxy?: string
  redactPII?: any
  removeBase64Images?: boolean
  skipTlsVerification?: boolean
  storeInCache?: boolean
  threatProtection?: Record<string, any>
  timeout?: number
  url: string
  waitFor?: number
  zeroDataRetention?: boolean
}

