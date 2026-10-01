

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FirecrawlSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ScrapeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FIRECRAWL_TEST_LIVE=TRUE.
  afterEach(liveDelay('FIRECRAWL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FirecrawlSDK.test()
    const ent = testsdk.Scrape()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FIRECRAWL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'scrape.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"actions":{"a":true,"h":"Actions","n":"actions","r":false,"sh":"Results of the actions specified in the `actions` parameter.","t":"`$ANY`","op":{"create":{"active":true}},"key$":"actions","index$":0},"answer":{"a":true,"h":"Answer","n":"answer","r":false,"sh":"Natural-language answer to the question supplied via the `question` format.","t":"`$STRING`","op":{"create":{"active":false}},"key$":"answer","index$":1},"audio":{"a":true,"h":"Audio","n":"audio","r":false,"sh":"Signed URL to the extracted MP3 audio file if `audio` is in `formats`.","t":"`$STRING`","op":{"create":{"active":false}},"key$":"audio","index$":2},"auditMetadata":{"a":true,"h":"Audit Metadata","n":"auditMetadata","r":false,"sh":"User attribution included with SIEM logging events when SIEM Logging is enabled for the organization.","t":"`$OBJECT`","op":{"create":{"active":true}},"key$":"auditMetadata","index$":3},"blockAds":{"a":true,"h":"Block Ads","n":"blockAds","r":false,"sh":"Enables ad-blocking and cookie popup blocking.","t":"`$BOOLEAN`","op":{"create":{"active":true}},"key$":"blockAds","index$":4},"blocks":{"a":true,"h":"Blocks","n":"blocks","r":false,"sh":"Per-page typed layout blocks for PDFs.","t":"`$ARRAY`","op":{"create":{"active":false}},"key$":"blocks","index$":5},"branding":{"a":true,"h":"Branding","n":"branding","r":false,"sh":"Branding information extracted from the page if `branding` is in `formats`.","t":"`$OBJECT`","op":{"create":{"active":false}},"key$":"branding","index$":6},"changeTracking":{"a":true,"h":"Change Tracking","n":"changeTracking","r":false,"sh":"Change tracking information if `changeTracking` is in `formats`.","t":"`$OBJECT`","op":{"create":{"active":false}},"key$":"changeTracking","index$":7},"domainTools":{"a":true,"h":"Domain Tools","n":"domainTools","r":false,"sh":"When true on an ordinary URL scrape, `data.tools` lists tool contracts matched to the scraped page's domain (same `DiscoveredTool` shape as search).","t":"`$BOOLEAN`","op":{"create":{"active":true}},"key$":"domainTools","index$":8},"excludeTags":{"a":true,"h":"Exclude Tags","n":"excludeTags","r":false,"sh":"Tags to exclude from the output.","t":"`$ARRAY`","op":{"create":{"active":true}},"key$":"excludeTags","index$":9},"formats":{"a":true,"h":"Formats","n":"formats","r":false,"sh":"Output formats to include in the response.","t":"`$ARRAY`","union":{"branches":17,"count":1,"depth":1},"op":{"create":{"active":true}},"key$":"formats","index$":10},"headers":{"a":true,"h":"Headers","n":"headers","r":false,"sh":"Headers to send with the request.","t":"`$OBJECT`","op":{"create":{"active":true}},"key$":"headers","index$":11},"highlights":{"a":true,"h":"Highlights","n":"highlights","r":false,"sh":"Relevant source text selected by the `highlights` format.","t":"`$STRING`","op":{"create":{"active":false}},"key$":"highlights","index$":12},"html":{"a":true,"h":"Html","n":"html","r":false,"sh":"Cleaned HTML of the page if `html` is in `formats`.","t":"`$STRING`","op":{"create":{"active":false}},"key$":"html","index$":13},"includeTags":{"a":true,"h":"Include Tags","n":"includeTags","r":false,"sh":"Tags to include in the output.","t":"`$ARRAY`","op":{"create":{"active":true}},"key$":"includeTags","index$":14},"links":{"a":true,"h":"Links","n":"links","r":false,"sh":"List of links on the page if `links` is in `formats`","t":"`$ARRAY`","op":{"create":{"active":false}},"key$":"links","index$":15},"location":{"a":true,"h":"Location","n":"location","r":false,"sh":"Location settings for the request.","t":"`$OBJECT`","op":{"create":{"active":true}},"key$":"location","index$":16},"lockdown":{"a":true,"h":"Lockdown","n":"lockdown","r":false,"sh":"If true, serves the request from Firecrawl's cache only and never makes an outbound request to the target URL.","t":"`$BOOLEAN`","op":{"create":{"active":true}},"key$":"lockdown","index$":17},"markdown":{"a":true,"h":"Markdown","n":"markdown","r":false,"t":"`$STRING`","op":{"create":{"active":false}},"key$":"markdown","index$":18},"maxAge":{"a":true,"h":"Max Age","n":"maxAge","r":false,"sh":"Returns a cached version of the page if it is younger than this age in milliseconds.","t":"`$INTEGER`","op":{"create":{"active":true}},"key$":"maxAge","index$":19},"menu":{"a":true,"h":"Menu","n":"menu","r":false,"sh":"Menu information extracted from the page if `menu` is in `formats`.","t":"`$OBJECT`","op":{"create":{"active":false}},"key$":"menu","index$":20},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":false,"t":"`$OBJECT`","union":{"branches":2,"count":5,"depth":2},"op":{"create":{"active":false}},"key$":"metadata","index$":21},"minAge":{"a":true,"h":"Min Age","n":"minAge","r":false,"sh":"When set, the request only checks the cache and never triggers a fresh scrape.","t":"`$INTEGER`","op":{"create":{"active":true}},"key$":"minAge","index$":22},"mobile":{"a":true,"h":"Mobile","n":"mobile","r":false,"sh":"Set to true if you want to emulate scraping from a mobile device.","t":"`$BOOLEAN`","op":{"create":{"active":true}},"key$":"mobile","index$":23},"onlyCleanContent":{"a":true,"h":"Only Clean Content","n":"onlyCleanContent","r":false,"sh":"Beta.","t":"`$BOOLEAN`","op":{"create":{"active":true}},"key$":"onlyCleanContent","index$":24},"onlyMainContent":{"a":true,"h":"Only Main Content","n":"onlyMainContent","r":false,"sh":"Only return the main content of the page excluding headers, navs, footers, etc.","t":"`$BOOLEAN`","op":{"create":{"active":true}},"key$":"onlyMainContent","index$":25},"pages":{"a":true,"h":"Pages","n":"pages","r":false,"sh":"Physical per-page markdown for PDFs.","t":"`$ARRAY`","op":{"create":{"active":false}},"key$":"pages","index$":26},"parsers":{"a":true,"h":"Parsers","n":"parsers","r":false,"sh":"Controls how files are processed during scraping.","t":"`$ARRAY`","op":{"create":{"active":true}},"key$":"parsers","index$":27},"product":{"a":true,"h":"Product","n":"product","r":false,"sh":"Product information extracted from the page if `product` is in `formats`.","t":"`$OBJECT`","op":{"create":{"active":false}},"key$":"product","index$":28},"profile":{"a":true,"h":"Profile","n":"profile","r":false,"sh":"Enable persistent browser storage across scrape and interact sessions.","t":"`$OBJECT`","op":{"create":{"active":true}},"key$":"profile","index$":29},"proxy":{"a":true,"h":"Proxy","n":"proxy","r":false,"sh":"Specifies the type of proxy to use.","t":"`$STRING`","op":{"create":{"active":true}},"key$":"proxy","index$":30},"rawBase64":{"a":true,"h":"Raw Base64","n":"rawBase64","r":false,"sh":"The Base64-encoded original HTTP response body if `rawBase64` is in `formats`.","t":"`$STRING`","op":{"create":{"active":false}},"key$":"rawBase64","index$":31},"rawHtml":{"a":true,"h":"Raw Html","n":"rawHtml","r":false,"sh":"The exact, unmodified HTML as received from the page if `rawHtml` is in `formats`.","t":"`$STRING`","op":{"create":{"active":false}},"key$":"rawHtml","index$":32},"redactPII":{"a":true,"h":"Redact Pii","n":"redactPII","r":false,"sh":"Redact personally identifiable information from returned markdown.","t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"op":{"create":{"active":true}},"key$":"redactPII","index$":33},"removeBase64Images":{"a":true,"h":"Remove Base64 Images","n":"removeBase64Images","r":false,"sh":"Removes all base 64 images from the markdown output, which may be overwhelmingly long.","t":"`$BOOLEAN`","op":{"create":{"active":true}},"key$":"removeBase64Images","index$":34},"screenshot":{"a":true,"h":"Screenshot","n":"screenshot","r":false,"sh":"Screenshot of the page if `screenshot` is in `formats`.","t":"`$STRING`","op":{"create":{"active":false}},"key$":"screenshot","index$":35},"skipTlsVerification":{"a":true,"h":"Skip Tls Verification","n":"skipTlsVerification","r":false,"sh":"Skip TLS certificate verification when making requests.","t":"`$BOOLEAN`","op":{"create":{"active":true}},"key$":"skipTlsVerification","index$":36},"storeInCache":{"a":true,"h":"Store In Cache","n":"storeInCache","r":false,"sh":"If true, the page will be stored in the Firecrawl index and cache.","t":"`$BOOLEAN`","op":{"create":{"active":true}},"key$":"storeInCache","index$":37},"summary":{"a":true,"h":"Summary","n":"summary","r":false,"sh":"Summary of the page if `summary` is in `formats`","t":"`$STRING`","op":{"create":{"active":false}},"key$":"summary","index$":38},"threatProtection":{"a":true,"h":"Threat Protection","n":"threatProtection","r":false,"sh":"Per-request [Threat Protection](https://docs.firecrawl.dev/features/threat-protection) override.","t":"`$OBJECT`","op":{"create":{"active":true}},"key$":"threatProtection","index$":39},"timeout":{"a":true,"h":"Timeout","n":"timeout","r":false,"sh":"Timeout in milliseconds for the request.","t":"`$INTEGER`","op":{"create":{"active":true}},"key$":"timeout","index$":40},"tools":{"a":true,"h":"Tools","n":"tools","r":false,"sh":"Tool contracts matched to the scraped page's domain.","t":"`$ARRAY`","op":{"create":{"active":false}},"key$":"tools","index$":41},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":true,"sh":"The URL to scrape","t":"`$STRING`","op":{"create":{"active":true}},"key$":"url","index$":42},"video":{"a":true,"h":"Video","n":"video","r":false,"sh":"Signed URL to the extracted video file if `video` is in `formats`.","t":"`$STRING`","op":{"create":{"active":false}},"key$":"video","index$":43},"waitFor":{"a":true,"h":"Wait For","n":"waitFor","r":false,"sh":"Specify a delay in milliseconds before fetching the content, allowing the page sufficient time to load.","t":"`$INTEGER`","op":{"create":{"active":true}},"key$":"waitFor","index$":44},"warning":{"a":true,"h":"Warning","n":"warning","r":false,"sh":"Can be displayed when using LLM Extraction.","t":"`$STRING`","op":{"create":{"active":false}},"key$":"warning","index$":45},"zeroDataRetention":{"a":true,"h":"Zero Data Retention","n":"zeroDataRetention","r":false,"sh":"If true, this will enable zero data retention for this scrape.","t":"`$BOOLEAN`","op":{"create":{"active":true}},"key$":"zeroDataRetention","index$":46}},"name":"scrape","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /scrape","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/scrape","q":{},"r":{},"s":[{"lit":"scrape"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"scrape","name__orig":"scrape","Name":"Scrape","name_":"scrape","name-":"scrape","NAME":"SCRAPE","index$":1}, {"active":true,"entity":"scrape","key$":"BasicScrapeFlow","kind":"basic","name":"BasicScrapeFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"scrape_ref01"},"m":{},"o":"create","s":[],"v":[]}]}, 'Scrape', {"POST /scrape":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"url":{"type":"string","format":"uri","description":"The URL to scrape","key$":"url"},"formats":{"type":"array","items":{"oneOf":[{"type":"object","title":"Markdown","properties":{},"required":[]},{"type":"object","title":"Summary","properties":{},"required":[]},{"type":"object","title":"HTML","properties":{},"required":[]},{"type":"object","title":"Raw HTML","properties":{},"required":[]},{"type":"object","title":"Raw Base64","properties":{},"required":[]},{"type":"object","title":"Links","properties":{},"required":[]},{"type":"object","title":"Images","properties":{},"required":[]},{"type":"object","title":"Screenshot","properties":{},"required":[]},{"type":"object","title":"JSON","properties":{},"required":[]},{"type":"object","title":"Change Tracking","properties":{},"required":[]},{"type":"object","title":"Branding","properties":{},"required":[]},{"type":"object","title":"Product","properties":{},"required":[]},{"type":"object","title":"Menu","properties":{},"required":[]},{"type":"object","title":"Audio","description":"Extract audio (MP3) from supported video URLs, e.g. YouTube. Returns a signed GCS URL.","properties":{},"required":[]},{"type":"object","title":"Video","description":"Extract best-quality video from supported video URLs, e.g. YouTube. Returns a signed GCS URL.","properties":{},"required":[]},{"type":"object","title":"Question","description":"Ask a natural-language question about the page. Returns the answer in the response `answer` field.","properties":{},"required":[]},{"type":"object","title":"Highlights","description":"Find relevant source text from the page. Returns the selected text in the response `highlights` field.","properties":{},"required":[]}]},"description":"Output formats to include in the response. You can specify one or more formats, either as strings (e.g., `'markdown'`) or as objects with additional options (e.g., `{ type: 'json', schema: {...} }`). Some formats require specific options to be set. Example: `['markdown', { type: 'json', schema: {...} }]`.","default":["markdown"],"x-ref":"#/components/schemas/Formats","key$":"formats"},"onlyMainContent":{"type":"boolean","description":"Only return the main content of the page excluding headers, navs, footers, etc. This is a deterministic HTML-level filter applied before markdown is generated; no LLM is involved.","default":true,"key$":"onlyMainContent"},"onlyCleanContent":{"type":"boolean","description":"Beta. Run an additional LLM-based pass over the generated markdown to remove residual boilerplate that `onlyMainContent` can miss (cookie banners, ad blocks, social share widgets, breadcrumbs, newsletter signups, comment sections, related-article lists). Headings, lists, tables, code blocks, image references, and inline links are preserved. Can be combined with `onlyMainContent` (the most common setup) or used on its own. Skipped with a warning when the markdown exceeds the cleaning model's output token limit (the original markdown is preserved). Not supported on zero-data-retention requests.","default":false,"key$":"onlyCleanContent"},"includeTags":{"type":"array","items":{"type":"string"},"description":"Tags to include in the output.","key$":"includeTags"},"excludeTags":{"type":"array","items":{"type":"string"},"description":"Tags to exclude from the output.","key$":"excludeTags"},"maxAge":{"type":"integer","description":"Returns a cached version of the page if it is younger than this age in milliseconds. If a cached version of the page is older than this value, the page will be scraped. If you do not need extremely fresh data, enabling this can speed up your scrapes by 500%. Defaults to 2 days.","default":172800000,"key$":"maxAge"},"minAge":{"type":"integer","description":"When set, the request only checks the cache and never triggers a fresh scrape. The value is in milliseconds and specifies the minimum age the cached data must be. If matching cached data exists, it is returned instantly. If no cached data is found, a 404 with error code SCRAPE_NO_CACHED_DATA is returned. Set to 1 to accept any cached data regardless of age.","key$":"minAge"},"headers":{"type":"object","description":"Headers to send with the request. Can be used to send cookies, user-agent, etc.","key$":"headers"},"waitFor":{"type":"integer","description":"Specify a delay in milliseconds before fetching the content, allowing the page sufficient time to load. This waiting time is in addition to Firecrawl's smart wait feature.","default":0,"key$":"waitFor"},"mobile":{"type":"boolean","description":"Set to true if you want to emulate scraping from a mobile device. Useful for testing responsive pages and taking mobile screenshots.","default":false,"key$":"mobile"},"skipTlsVerification":{"type":"boolean","description":"Skip TLS certificate verification when making requests.","default":true,"key$":"skipTlsVerification"},"timeout":{"type":"integer","description":"Timeout in milliseconds for the request. Minimum is 1000 (1 second). Default is 60000 (60 seconds). Maximum is 300000 (300 seconds).","default":60000,"minimum":1000,"maximum":300000,"key$":"timeout"},"parsers":{"type":"array","description":"Controls how files are processed during scraping. When \"pdf\" is included (default), the PDF content is extracted and converted to markdown format, with billing based on the number of pages (1 credit per page). When an empty array is passed, the PDF file is returned in base64 encoding with a flat rate of 1 credit for the entire PDF.","items":{"oneOf":[{"type":"object","properties":{},"required":[],"additionalProperties":false}]},"default":["pdf"],"key$":"parsers"},"actions":{"type":"array","description":"Actions to perform on the page before grabbing the content","items":{"oneOf":[{"title":"Wait","oneOf":[]},{"type":"object","title":"Screenshot","properties":{},"required":[]},{"type":"object","title":"Click","properties":{},"required":[]},{"type":"object","title":"Write text","properties":{},"required":[]},{"type":"object","title":"Press a key","description":"Press a key on the page. See https://asawicki.info/nosense/doc/devices/keyboard/key_codes.html for key codes.","properties":{},"required":[]},{"type":"object","title":"Scroll","properties":{},"required":[]},{"type":"object","title":"Scrape","properties":{},"required":[]},{"type":"object","title":"Execute JavaScript","properties":{},"required":[]},{"type":"object","title":"Generate PDF","properties":{},"required":[]}]},"key$":"actions"},"location":{"type":"object","description":"Location settings for the request. When specified, this will use an appropriate proxy if available and emulate the corresponding language and timezone settings. Defaults to 'US' if not specified.","properties":{"country":{"type":"string","description":"ISO 3166-1 alpha-2 country code (e.g., 'US', 'AU', 'DE', 'JP')","pattern":"^[A-Z]{2}$","default":"US"},"languages":{"type":"array","description":"Preferred languages and locales for the request in order of priority. Defaults to the language of the specified location. See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language","items":{"type":"string","example":"en-US"}}},"key$":"location"},"removeBase64Images":{"type":"boolean","description":"Removes all base 64 images from the markdown output, which may be overwhelmingly long. This does not affect html or rawHtml formats. The image's alt text remains in the output, but the URL is replaced with a placeholder.","default":true,"key$":"removeBase64Images"},"blockAds":{"type":"boolean","description":"Enables ad-blocking and cookie popup blocking.","default":true,"key$":"blockAds"},"proxy":{"type":"string","enum":["basic","enhanced","auto"],"description":"Specifies the type of proxy to use.\n\n - **basic**: Proxies for scraping sites with none to basic anti-bot solutions. Fast and usually works.\n - **enhanced**: Enhanced proxies for scraping sites with advanced anti-bot solutions. Slower, but more reliable on certain sites. Billed at the same credit cost as basic.\n - **auto**: Firecrawl will automatically retry scraping with enhanced proxies if the basic proxy fails. Enhanced proxies carry no credit surcharge, so either way only the regular cost is billed.","default":"auto","key$":"proxy"},"storeInCache":{"type":"boolean","description":"If true, the page will be stored in the Firecrawl index and cache. Setting this to false is useful if your scraping activity may have data protection concerns. Using some parameters associated with sensitive scraping (e.g. actions, headers) will force this parameter to be false.","default":true,"key$":"storeInCache"},"lockdown":{"type":"boolean","description":"If true, serves the request from Firecrawl's cache only and never makes an outbound request to the target URL. Designed for compliance-constrained or air-gapped environments where the scrape request itself could leak sensitive information. On cache miss, returns a 404 with error code SCRAPE_LOCKDOWN_CACHE_MISS (the URL is never logged on miss). Lockdown requests are treated as zero data retention. Default maxAge is extended to 2 years so existing cached pages remain eligible. Billed at 5 credits on hit, 1 credit on cache miss.","default":false,"key$":"lockdown"},"redactPII":{"oneOf":[{"type":"boolean"},{"type":"object","description":"Tuning options for PII redaction.","properties":{"mode":{},"entities":{},"replaceStyle":{}},"additionalProperties":false,"x-ref":"#/components/schemas/RedactPIIOptions"}],"default":false,"description":"Redact personally identifiable information from returned markdown. Pass `true` to use defaults, or an object to tune mode, entities, and replacement style.","key$":"redactPII"},"profile":{"type":"object","description":"Enable persistent browser storage across scrape and interact sessions. Pass a profile when scraping to preserve cookies, localStorage, and session data. Sessions with the same profile name share browser state.","properties":{"name":{"type":"string","minLength":1,"maxLength":128,"description":"A name for the profile. Scrapes with the same name share browser state (cookies, localStorage, sessions)."},"saveChanges":{"type":"boolean","default":true,"description":"When true, browser state is saved back to the profile when the interact session stops. Set to false to load existing data without writing. Only one saving session is allowed at a time."}},"required":["name"],"key$":"profile"},"threatProtection":{"type":"object","title":"Threat Protection Override","description":"Per-request [Threat Protection](https://docs.firecrawl.dev/features/threat-protection) override. Fields you provide replace the corresponding fields of your organization's policy for this request only; omitted fields keep their organization-level values. Requires Threat Protection to be enabled for your team (enterprise feature) — otherwise the request is rejected with a 403. If your organization has disabled request overrides, any request that includes this object is rejected with a 403. If Threat Protection is enforced for your team, `mode` may not be set to `off`.","properties":{"mode":{"type":"string","enum":["off","normal"],"description":"URL scanning mode for this request. `normal` checks URLs against Google Web Risk (+2 credits per URL scanned)."},"riskScoreThreshold":{"type":"integer","minimum":0,"maximum":100,"description":"Normalized risk score (0–100) at or above which a classifier verdict blocks the URL. Lower is stricter.","example":75},"blacklist":{"type":"array","maxItems":1000,"items":{"type":"string"},"description":"Domains to always block, as plain domains (`example.com`) or wildcard globs (`*.example.com`). No protocol, path, or port."},"whitelist":{"type":"array","maxItems":1000,"items":{"type":"string"},"description":"Domains to always allow, as plain domains or wildcard globs. Wins over every other rule."},"blockedTlds":{"type":"array","maxItems":1000,"items":{"type":"string"},"description":"Top-level domains to block outright, lowercase without the leading dot (e.g. `zip`)."},"failurePolicy":{"type":"string","enum":["open","closed"],"description":"What to do when the classifier can't be reached: `closed` blocks the request, `open` allows it."}},"x-ref":"#/components/schemas/ThreatProtectionOverride","key$":"threatProtection"},"auditMetadata":{"type":"object","description":"User attribution included with SIEM logging events when SIEM Logging is enabled for the organization.","additionalProperties":false,"required":["username"],"properties":{"username":{"type":"string","maxLength":1024,"description":"The username associated with the request."}},"x-ref":"#/components/schemas/AuditMetadata","key$":"auditMetadata"},"zeroDataRetention":{"type":"boolean","default":false,"description":"If true, this will enable zero data retention for this scrape. To enable this feature, please contact help@firecrawl.dev","key$":"zeroDataRetention"},"domainTools":{"type":"boolean","default":false,"description":"When true on an ordinary URL scrape, `data.tools` lists tool contracts matched to the scraped page's domain (same `DiscoveredTool` shape as search). Requires the team's Alexandria access to be enabled and no zero data retention (403 otherwise). Free.","key$":"domainTools"}},"required":["url"],"index$":1}}}},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const scrape_ref01_ent = client.Scrape()
    let scrape_ref01_data = setup.data.new.scrape['scrape_ref01']

    scrape_ref01_data = (await scrape_ref01_ent.create(scrape_ref01_data)).data()
    assert(null != scrape_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/scrape/ScrapeTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = FirecrawlSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['scrape01','scrape02','scrape03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FIRECRAWL_TEST_SCRAPE_ENTID': idmap,
    'FIRECRAWL_TEST_LIVE': 'FALSE',
    'FIRECRAWL_TEST_EXPLAIN': 'FALSE',
    'FIRECRAWL_APIKEY': '',
  })

  idmap = env['FIRECRAWL_TEST_SCRAPE_ENTID']

  const live = 'TRUE' === env.FIRECRAWL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FIRECRAWL_TEST_SCRAPE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new FirecrawlSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.FIRECRAWL_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.FIRECRAWL_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
