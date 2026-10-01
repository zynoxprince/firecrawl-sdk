# Firecrawl TypeScript SDK



The TypeScript SDK for the Firecrawl API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Map()` — each with a small set of operations (`create`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Releases](https://github.com/zynoxprince/firecrawl-sdk/releases)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/zynoxprince/firecrawl-sdk
npm install ./firecrawl-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { FirecrawlSDK } from '@zynoxprince/firecrawl-sdk'

const client = new FirecrawlSDK({
  apikey: process.env.FIRECRAWL_APIKEY,
})
```

### 4. Create, update, and remove

```ts
// Create — returns the created Map ENTITY (.data() for the record)
const created = await client.Map().create({
  url: 'example_url',
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const map = await client.Map().create({ url: "example" })
  console.log(map)
} catch (err) {
  console.error('create failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = FirecrawlSDK.test()

const map = await client.Map().create({ url: 'example_url' })
// map is the entity, populated with mock response data
// — call map.data() for the record itself
console.log(map)
```

You can also use the instance method:

```ts
const client = new FirecrawlSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Map()

// First call runs the operation and stores its result
await entity.create({ url: 'example_url' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new FirecrawlSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
FIRECRAWL_TEST_LIVE=TRUE
FIRECRAWL_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### FirecrawlSDK

#### Constructor

```ts
new FirecrawlSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Map(data?)` | `MapEntity` | Create a Map entity instance. |
| `Scrape(data?)` | `ScrapeEntity` | Create a Scrape entity instance. |
| `tester(testopts?, sdkopts?)` | `FirecrawlSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `FirecrawlSDK.test(testopts?, sdkopts?)` | `FirecrawlSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): FirecrawlSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `create` resolves to a single entity object.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Map

| Field | Description |
| --- | --- |
| `auditMetadata` | User attribution included with SIEM logging events when SIEM Logging is enabled for the organization. |
| `ignoreCache` | Bypass the sitemap cache to retrieve fresh URLs. |
| `ignoreQueryParameters` | Do not return URLs with query parameters |
| `includeSubdomains` | Include subdomains of the website |
| `limit` | Maximum number of links to return |
| `links` |  |
| `location` | Location settings for the request. |
| `search` | Specify a search query to order the results by relevance. |
| `sitemap` | Sitemap mode when mapping. |
| `success` |  |
| `threatProtection` | Per-request [Threat Protection](https://docs.firecrawl.dev/features/threat-protection) override. |
| `timeout` | Timeout in milliseconds. |
| `url` | The base URL to start crawling from |

Operations: create.

API path: `/map`

#### Scrape

| Field | Description |
| --- | --- |
| `actions` | Results of the actions specified in the `actions` parameter. |
| `answer` | Natural-language answer to the question supplied via the `question` format. |
| `audio` | Signed URL to the extracted MP3 audio file if `audio` is in `formats`. |
| `auditMetadata` | User attribution included with SIEM logging events when SIEM Logging is enabled for the organization. |
| `blockAds` | Enables ad-blocking and cookie popup blocking. |
| `blocks` | Per-page typed layout blocks for PDFs. |
| `branding` | Branding information extracted from the page if `branding` is in `formats`. |
| `changeTracking` | Change tracking information if `changeTracking` is in `formats`. |
| `domainTools` | When true on an ordinary URL scrape, `data.tools` lists tool contracts matched to the scraped page's domain (same `DiscoveredTool` shape as search). |
| `excludeTags` | Tags to exclude from the output. |
| `formats` | Output formats to include in the response. |
| `headers` | Headers to send with the request. |
| `highlights` | Relevant source text selected by the `highlights` format. |
| `html` | Cleaned HTML of the page if `html` is in `formats`. |
| `includeTags` | Tags to include in the output. |
| `links` | List of links on the page if `links` is in `formats` |
| `location` | Location settings for the request. |
| `lockdown` | If true, serves the request from Firecrawl's cache only and never makes an outbound request to the target URL. |
| `markdown` |  |
| `maxAge` | Returns a cached version of the page if it is younger than this age in milliseconds. |
| `menu` | Menu information extracted from the page if `menu` is in `formats`. |
| `metadata` |  |
| `minAge` | When set, the request only checks the cache and never triggers a fresh scrape. |
| `mobile` | Set to true if you want to emulate scraping from a mobile device. |
| `onlyCleanContent` | Beta. |
| `onlyMainContent` | Only return the main content of the page excluding headers, navs, footers, etc. |
| `pages` | Physical per-page markdown for PDFs. |
| `parsers` | Controls how files are processed during scraping. |
| `product` | Product information extracted from the page if `product` is in `formats`. |
| `profile` | Enable persistent browser storage across scrape and interact sessions. |
| `proxy` | Specifies the type of proxy to use. |
| `rawBase64` | The Base64-encoded original HTTP response body if `rawBase64` is in `formats`. |
| `rawHtml` | The exact, unmodified HTML as received from the page if `rawHtml` is in `formats`. |
| `redactPII` | Redact personally identifiable information from returned markdown. |
| `removeBase64Images` | Removes all base 64 images from the markdown output, which may be overwhelmingly long. |
| `screenshot` | Screenshot of the page if `screenshot` is in `formats`. |
| `skipTlsVerification` | Skip TLS certificate verification when making requests. |
| `storeInCache` | If true, the page will be stored in the Firecrawl index and cache. |
| `summary` | Summary of the page if `summary` is in `formats` |
| `threatProtection` | Per-request [Threat Protection](https://docs.firecrawl.dev/features/threat-protection) override. |
| `timeout` | Timeout in milliseconds for the request. |
| `tools` | Tool contracts matched to the scraped page's domain. |
| `url` | The URL to scrape |
| `video` | Signed URL to the extracted video file if `video` is in `formats`. |
| `waitFor` | Specify a delay in milliseconds before fetching the content, allowing the page sufficient time to load. |
| `warning` | Can be displayed when using LLM Extraction. |
| `zeroDataRetention` | If true, this will enable zero data retention for this scrape. |

Operations: create.

API path: `/scrape`



## Entities


### Map

Create an instance: `const map = client.Map()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auditMetadata` | `Record<string, any>` | User attribution included with SIEM logging events when SIEM Logging is enabled for the organization. |
| `ignoreCache` | `boolean` | Bypass the sitemap cache to retrieve fresh URLs. |
| `ignoreQueryParameters` | `boolean` | Do not return URLs with query parameters |
| `includeSubdomains` | `boolean` | Include subdomains of the website |
| `limit` | `number` | Maximum number of links to return |
| `links` | `any[]` |  |
| `location` | `Record<string, any>` | Location settings for the request. |
| `search` | `string` | Specify a search query to order the results by relevance. |
| `sitemap` | `string` | Sitemap mode when mapping. |
| `success` | `boolean` |  |
| `threatProtection` | `Record<string, any>` | Per-request [Threat Protection](https://docs.firecrawl.dev/features/threat-protection) override. |
| `timeout` | `number` | Timeout in milliseconds. |
| `url` | `string` | The base URL to start crawling from |

#### Example: Create

```ts
const map = await client.Map().create({
  url: 'example_url',
})
```


### Scrape

Create an instance: `const scrape = client.Scrape()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actions` | `any` | Results of the actions specified in the `actions` parameter. |
| `answer` | `string` | Natural-language answer to the question supplied via the `question` format. |
| `audio` | `string` | Signed URL to the extracted MP3 audio file if `audio` is in `formats`. |
| `auditMetadata` | `Record<string, any>` | User attribution included with SIEM logging events when SIEM Logging is enabled for the organization. |
| `blockAds` | `boolean` | Enables ad-blocking and cookie popup blocking. |
| `blocks` | `any[]` | Per-page typed layout blocks for PDFs. |
| `branding` | `Record<string, any>` | Branding information extracted from the page if `branding` is in `formats`. |
| `changeTracking` | `Record<string, any>` | Change tracking information if `changeTracking` is in `formats`. |
| `domainTools` | `boolean` | When true on an ordinary URL scrape, `data.tools` lists tool contracts matched to the scraped page's domain (same `DiscoveredTool` shape as search). |
| `excludeTags` | `any[]` | Tags to exclude from the output. |
| `formats` | `any[]` | Output formats to include in the response. |
| `headers` | `Record<string, any>` | Headers to send with the request. |
| `highlights` | `string` | Relevant source text selected by the `highlights` format. |
| `html` | `string` | Cleaned HTML of the page if `html` is in `formats`. |
| `includeTags` | `any[]` | Tags to include in the output. |
| `links` | `any[]` | List of links on the page if `links` is in `formats` |
| `location` | `Record<string, any>` | Location settings for the request. |
| `lockdown` | `boolean` | If true, serves the request from Firecrawl's cache only and never makes an outbound request to the target URL. |
| `markdown` | `string` |  |
| `maxAge` | `number` | Returns a cached version of the page if it is younger than this age in milliseconds. |
| `menu` | `Record<string, any>` | Menu information extracted from the page if `menu` is in `formats`. |
| `metadata` | `Record<string, any>` |  |
| `minAge` | `number` | When set, the request only checks the cache and never triggers a fresh scrape. |
| `mobile` | `boolean` | Set to true if you want to emulate scraping from a mobile device. |
| `onlyCleanContent` | `boolean` | Beta. |
| `onlyMainContent` | `boolean` | Only return the main content of the page excluding headers, navs, footers, etc. |
| `pages` | `any[]` | Physical per-page markdown for PDFs. |
| `parsers` | `any[]` | Controls how files are processed during scraping. |
| `product` | `Record<string, any>` | Product information extracted from the page if `product` is in `formats`. |
| `profile` | `Record<string, any>` | Enable persistent browser storage across scrape and interact sessions. |
| `proxy` | `string` | Specifies the type of proxy to use. |
| `rawBase64` | `string` | The Base64-encoded original HTTP response body if `rawBase64` is in `formats`. |
| `rawHtml` | `string` | The exact, unmodified HTML as received from the page if `rawHtml` is in `formats`. |
| `redactPII` | `any` | Redact personally identifiable information from returned markdown. |
| `removeBase64Images` | `boolean` | Removes all base 64 images from the markdown output, which may be overwhelmingly long. |
| `screenshot` | `string` | Screenshot of the page if `screenshot` is in `formats`. |
| `skipTlsVerification` | `boolean` | Skip TLS certificate verification when making requests. |
| `storeInCache` | `boolean` | If true, the page will be stored in the Firecrawl index and cache. |
| `summary` | `string` | Summary of the page if `summary` is in `formats` |
| `threatProtection` | `Record<string, any>` | Per-request [Threat Protection](https://docs.firecrawl.dev/features/threat-protection) override. |
| `timeout` | `number` | Timeout in milliseconds for the request. |
| `tools` | `any[]` | Tool contracts matched to the scraped page's domain. |
| `url` | `string` | The URL to scrape |
| `video` | `string` | Signed URL to the extracted video file if `video` is in `formats`. |
| `waitFor` | `number` | Specify a delay in milliseconds before fetching the content, allowing the page sufficient time to load. |
| `warning` | `string` | Can be displayed when using LLM Extraction. |
| `zeroDataRetention` | `boolean` | If true, this will enable zero data retention for this scrape. |

#### Example: Create

```ts
const scrape = await client.Scrape().create({
  url: 'example_url',
})
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | Test transport |

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Open types

1 field is carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes it with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `scrape` | `formats` | 17 | 1 level |

These values round-trip unchanged — read them, modify them, send them back. If
the API adds a `discriminator` to the definition, regenerating will type them.
Every other field is typed normally.

## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
firecrawl/
├── src/
│   ├── FirecrawlSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { FirecrawlSDK } from '@zynoxprince/firecrawl-sdk'
```

### Entity state

Entity instances are stateful. After a successful `create`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const map = client.Map()
await map.create({ url: "example" })

// map.data() now returns the map data from the last `create`
// map.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
