import { FirecrawlSDK } from '../ts/src/FirecrawlSDK'
import type { MapType, Scrape } from '../ts/src/FirecrawlTypes'

const client = new FirecrawlSDK({ apikey: 'compile-only' })
void client.Scrape().create({ url: 'https://example.com', formats: ['markdown'] })
void client.Map().create({ url: 'https://example.com', limit: 3 })
// @ts-expect-error A supplied scrape request must include its URL.
void client.Scrape().create({ formats: ['markdown'] })
// @ts-expect-error A map result cannot be sent as the request payload.
void client.Map().create({ url: 'https://example.com', success: true })

// Real responses do not repeat request-only fields such as url.
const mapped: MapType = { success: true, links: [{ url: 'https://example.com' }] }
const scraped: Scrape = { markdown: '# Example', pages: null, blocks: null }
// @ts-expect-error A response does not guarantee a top-level request URL.
const requiredMapUrl: string = mapped.url
// @ts-expect-error A response does not guarantee a top-level request URL.
const requiredScrapeUrl: string = scraped.url
