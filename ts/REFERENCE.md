# Firecrawl TypeScript SDK Reference

Complete API reference for the Firecrawl TypeScript SDK.


## FirecrawlSDK

### Constructor

```ts
new FirecrawlSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FirecrawlSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = FirecrawlSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `FirecrawlSDK` instance in test mode.


### Instance Methods

#### `Map(data?: object)`

Create a new `Map` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MapEntity` instance.

#### `Scrape(data?: object)`

Create a new `Scrape` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ScrapeEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `FirecrawlSDK.test()`.

**Returns:** `FirecrawlSDK` instance in test mode.


---

## MapEntity

```ts
const map = client.Map()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auditMetadata` | `Record<string, any>` | No | User attribution included with SIEM logging events when SIEM Logging is enabled for the organization. |
| `ignoreCache` | `boolean` | No | Bypass the sitemap cache to retrieve fresh URLs. |
| `ignoreQueryParameters` | `boolean` | No | Do not return URLs with query parameters |
| `includeSubdomains` | `boolean` | No | Include subdomains of the website |
| `limit` | `number` | No | Maximum number of links to return |
| `links` | `any[]` | No |  |
| `location` | `Record<string, any>` | No | Location settings for the request. |
| `search` | `string` | No | Specify a search query to order the results by relevance. |
| `sitemap` | `string` | No | Sitemap mode when mapping. |
| `success` | `boolean` | No |  |
| `threatProtection` | `Record<string, any>` | No | Per-request [Threat Protection](https://docs.firecrawl.dev/features/threat-protection) override. |
| `timeout` | `number` | No | Timeout in milliseconds. |
| `url` | `string` | Yes | The base URL to start crawling from |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `auditMetadata` | Yes |
| `ignoreCache` | Yes |
| `ignoreQueryParameters` | Yes |
| `includeSubdomains` | Yes |
| `limit` | Yes |
| `links` | - |
| `location` | Yes |
| `search` | Yes |
| `sitemap` | Yes |
| `success` | - |
| `threatProtection` | Yes |
| `timeout` | Yes |
| `url` | Yes |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Map().create({
  url: 'example_url',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MapEntity` instance with the same client and
options.

#### `client()`

Return the parent `FirecrawlSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ScrapeEntity

```ts
const scrape = client.Scrape()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actions` | `any` | No | Results of the actions specified in the `actions` parameter. |
| `answer` | `string` | No | Natural-language answer to the question supplied via the `question` format. |
| `audio` | `string` | No | Signed URL to the extracted MP3 audio file if `audio` is in `formats`. |
| `auditMetadata` | `Record<string, any>` | No | User attribution included with SIEM logging events when SIEM Logging is enabled for the organization. |
| `blockAds` | `boolean` | No | Enables ad-blocking and cookie popup blocking. |
| `blocks` | `any[]` | No | Per-page typed layout blocks for PDFs. |
| `branding` | `Record<string, any>` | No | Branding information extracted from the page if `branding` is in `formats`. |
| `changeTracking` | `Record<string, any>` | No | Change tracking information if `changeTracking` is in `formats`. |
| `domainTools` | `boolean` | No | When true on an ordinary URL scrape, `data.tools` lists tool contracts matched to the scraped page's domain (same `DiscoveredTool` shape as search). |
| `excludeTags` | `any[]` | No | Tags to exclude from the output. |
| `formats` | `any[]` | No | Output formats to include in the response. |
| `headers` | `Record<string, any>` | No | Headers to send with the request. |
| `highlights` | `string` | No | Relevant source text selected by the `highlights` format. |
| `html` | `string` | No | Cleaned HTML of the page if `html` is in `formats`. |
| `includeTags` | `any[]` | No | Tags to include in the output. |
| `links` | `any[]` | No | List of links on the page if `links` is in `formats` |
| `location` | `Record<string, any>` | No | Location settings for the request. |
| `lockdown` | `boolean` | No | If true, serves the request from Firecrawl's cache only and never makes an outbound request to the target URL. |
| `markdown` | `string` | No |  |
| `maxAge` | `number` | No | Returns a cached version of the page if it is younger than this age in milliseconds. |
| `menu` | `Record<string, any>` | No | Menu information extracted from the page if `menu` is in `formats`. |
| `metadata` | `Record<string, any>` | No |  |
| `minAge` | `number` | No | When set, the request only checks the cache and never triggers a fresh scrape. |
| `mobile` | `boolean` | No | Set to true if you want to emulate scraping from a mobile device. |
| `onlyCleanContent` | `boolean` | No | Beta. |
| `onlyMainContent` | `boolean` | No | Only return the main content of the page excluding headers, navs, footers, etc. |
| `pages` | `any[]` | No | Physical per-page markdown for PDFs. |
| `parsers` | `any[]` | No | Controls how files are processed during scraping. |
| `product` | `Record<string, any>` | No | Product information extracted from the page if `product` is in `formats`. |
| `profile` | `Record<string, any>` | No | Enable persistent browser storage across scrape and interact sessions. |
| `proxy` | `string` | No | Specifies the type of proxy to use. |
| `rawBase64` | `string` | No | The Base64-encoded original HTTP response body if `rawBase64` is in `formats`. |
| `rawHtml` | `string` | No | The exact, unmodified HTML as received from the page if `rawHtml` is in `formats`. |
| `redactPII` | `any` | No | Redact personally identifiable information from returned markdown. |
| `removeBase64Images` | `boolean` | No | Removes all base 64 images from the markdown output, which may be overwhelmingly long. |
| `screenshot` | `string` | No | Screenshot of the page if `screenshot` is in `formats`. |
| `skipTlsVerification` | `boolean` | No | Skip TLS certificate verification when making requests. |
| `storeInCache` | `boolean` | No | If true, the page will be stored in the Firecrawl index and cache. |
| `summary` | `string` | No | Summary of the page if `summary` is in `formats` |
| `threatProtection` | `Record<string, any>` | No | Per-request [Threat Protection](https://docs.firecrawl.dev/features/threat-protection) override. |
| `timeout` | `number` | No | Timeout in milliseconds for the request. |
| `tools` | `any[]` | No | Tool contracts matched to the scraped page's domain. |
| `url` | `string` | Yes | The URL to scrape |
| `video` | `string` | No | Signed URL to the extracted video file if `video` is in `formats`. |
| `waitFor` | `number` | No | Specify a delay in milliseconds before fetching the content, allowing the page sufficient time to load. |
| `warning` | `string` | No | Can be displayed when using LLM Extraction. |
| `zeroDataRetention` | `boolean` | No | If true, this will enable zero data retention for this scrape. |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `actions` | Yes |
| `answer` | - |
| `audio` | - |
| `auditMetadata` | Yes |
| `blockAds` | Yes |
| `blocks` | - |
| `branding` | - |
| `changeTracking` | - |
| `domainTools` | Yes |
| `excludeTags` | Yes |
| `formats` | Yes |
| `headers` | Yes |
| `highlights` | - |
| `html` | - |
| `includeTags` | Yes |
| `links` | - |
| `location` | Yes |
| `lockdown` | Yes |
| `markdown` | - |
| `maxAge` | Yes |
| `menu` | - |
| `metadata` | - |
| `minAge` | Yes |
| `mobile` | Yes |
| `onlyCleanContent` | Yes |
| `onlyMainContent` | Yes |
| `pages` | - |
| `parsers` | Yes |
| `product` | - |
| `profile` | Yes |
| `proxy` | Yes |
| `rawBase64` | - |
| `rawHtml` | - |
| `redactPII` | Yes |
| `removeBase64Images` | Yes |
| `screenshot` | - |
| `skipTlsVerification` | Yes |
| `storeInCache` | Yes |
| `summary` | - |
| `threatProtection` | Yes |
| `timeout` | Yes |
| `tools` | - |
| `url` | Yes |
| `video` | - |
| `waitFor` | Yes |
| `warning` | - |
| `zeroDataRetention` | Yes |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Scrape().create({
  url: 'example_url',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ScrapeEntity` instance with the same client and
options.

#### `client()`

Return the parent `FirecrawlSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new FirecrawlSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

