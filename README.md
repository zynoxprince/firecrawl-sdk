# Firecrawl SDK

An unofficial TypeScript client for Firecrawl v2, generated with [Voxgig's SDK generator](https://github.com/voxgig/sdkgen).

This release focuses on two operations: scraping a URL into Markdown and discovering a website's links. It is maintained independently and is not affiliated with Firecrawl.

## Setup

Requires Node.js 24 or later.

```bash
git clone https://github.com/zynoxprince/firecrawl-sdk.git
cd firecrawl-sdk
npm ci
npm run build
```

The package name is `@zynoxprince/firecrawl-sdk`. It is a local workspace package, not a published npm release.

## Quickstart

```ts
import { FirecrawlSDK } from '@zynoxprince/firecrawl-sdk'

const client = new FirecrawlSDK({
  apikey: process.env.FIRECRAWL_API_KEY,
})

const page = await client.Scrape().create({
  url: 'https://example.com',
  formats: ['markdown'],
  onlyMainContent: true,
})
console.log(page.data())

const site = await client.Map().create({
  url: 'https://firecrawl.dev',
  limit: 3,
})
console.log(site.data())
```

Entity operations return an entity. For scraping, `.data()` returns the document, including `markdown` and `metadata`. For mapping, `.data()` returns the envelope containing `success` and `links`.

## Verification

```bash
npm test
```

The default suite uses mock responses and makes no external requests. For an authenticated live check, copy `.env.example` to `.env`, enter your own API key, then run:

```bash
npm run test:live
```

The live check makes one scrape and one bounded map request. It consumes Firecrawl credits. It reports counts and statuses without logging credentials or full request contexts.

## Regeneration

```bash
npm --prefix .sdk ci
npm run generate
npm run build
npm test
npm run doctor
```

The toolchain and its dependencies are pinned by `.sdk/package-lock.json`. The original upstream specification is saved in `spec/firecrawl-v2.upstream.json`; `scripts/prepare-spec.mjs` selects `/scrape` and `/map`, normalizes the scrape request's top-level `allOf`, and selects the ordinary URL-scrape response. Alexandria tool execution and other endpoints are outside this release's scope.

The model hook in `.sdk/build/request-fields.js` corrects nested required flags and excludes response-only fields from create payloads.

Edit the model in `.sdk/model/` or the generator's source templates, then regenerate. Do not hand-edit generated files in `ts/`.

## Limitations

- This is a focused client, not complete coverage of Firecrawl's API.
- Nested objects and array items retain broad generated types; review the [Firecrawl API documentation](https://docs.firecrawl.dev/) for their full schemas.
- API failures reject entity operations. Catch errors and report only the fields you need; an error's request context can contain credentials.
- No automatic retries are enabled. This avoids silently repeating credit-consuming requests.

## License

MIT. See [LICENSE](LICENSE). Original generator/runtime notices are retained in the generated source.
