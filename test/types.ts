import { FirecrawlSDK } from '../ts/src/FirecrawlSDK'

const client = new FirecrawlSDK({ apikey: 'compile-only' })
void client.Scrape().create({ url: 'https://example.com', formats: ['markdown'] })
void client.Map().create({ url: 'https://example.com', limit: 3 })
// @ts-expect-error A supplied scrape request must include its URL.
void client.Scrape().create({ formats: ['markdown'] })
// @ts-expect-error A map result cannot be sent as the request payload.
void client.Map().create({ url: 'https://example.com', success: true })
