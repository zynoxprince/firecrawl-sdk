

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


describe('MapEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FIRECRAWL_TEST_LIVE=TRUE.
  afterEach(liveDelay('FIRECRAWL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FirecrawlSDK.test()
    const ent = testsdk.Map()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FIRECRAWL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'map.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"auditMetadata":{"a":true,"h":"Audit Metadata","n":"auditMetadata","r":false,"sh":"User attribution included with SIEM logging events when SIEM Logging is enabled for the organization.","t":"`$OBJECT`","op":{"create":{"active":true}},"key$":"auditMetadata","index$":0},"ignoreCache":{"a":true,"h":"Ignore Cache","n":"ignoreCache","r":false,"sh":"Bypass the sitemap cache to retrieve fresh URLs.","t":"`$BOOLEAN`","op":{"create":{"active":true}},"key$":"ignoreCache","index$":1},"ignoreQueryParameters":{"a":true,"h":"Ignore Query Parameters","n":"ignoreQueryParameters","r":false,"sh":"Do not return URLs with query parameters","t":"`$BOOLEAN`","op":{"create":{"active":true}},"key$":"ignoreQueryParameters","index$":2},"includeSubdomains":{"a":true,"h":"Include Subdomains","n":"includeSubdomains","r":false,"sh":"Include subdomains of the website","t":"`$BOOLEAN`","op":{"create":{"active":true}},"key$":"includeSubdomains","index$":3},"limit":{"a":true,"h":"Limit","n":"limit","r":false,"sh":"Maximum number of links to return","t":"`$INTEGER`","op":{"create":{"active":true}},"key$":"limit","index$":4},"links":{"a":true,"h":"Links","n":"links","r":false,"t":"`$ARRAY`","op":{"create":{"active":false}},"key$":"links","index$":5},"location":{"a":true,"h":"Location","n":"location","r":false,"sh":"Location settings for the request.","t":"`$OBJECT`","op":{"create":{"active":true}},"key$":"location","index$":6},"search":{"a":true,"h":"Search","n":"search","r":false,"sh":"Specify a search query to order the results by relevance.","t":"`$STRING`","op":{"create":{"active":true}},"key$":"search","index$":7},"sitemap":{"a":true,"h":"Sitemap","n":"sitemap","r":false,"sh":"Sitemap mode when mapping.","t":"`$STRING`","op":{"create":{"active":true}},"key$":"sitemap","index$":8},"success":{"a":true,"h":"Success","n":"success","r":false,"t":"`$BOOLEAN`","op":{"create":{"active":false}},"key$":"success","index$":9},"threatProtection":{"a":true,"h":"Threat Protection","n":"threatProtection","r":false,"sh":"Per-request [Threat Protection](https://docs.firecrawl.dev/features/threat-protection) override.","t":"`$OBJECT`","op":{"create":{"active":true}},"key$":"threatProtection","index$":10},"timeout":{"a":true,"h":"Timeout","n":"timeout","r":false,"sh":"Timeout in milliseconds.","t":"`$INTEGER`","op":{"create":{"active":true}},"key$":"timeout","index$":11},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":true,"sh":"The base URL to start crawling from","t":"`$STRING`","op":{"create":{"active":true}},"key$":"url","index$":12}},"name":"map","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /map","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/map","q":{},"r":{},"s":[{"lit":"map"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"map","name__orig":"map","Name":"Map","name_":"map","name-":"map","NAME":"MAP","index$":0}, {"active":true,"entity":"map","key$":"BasicMapFlow","kind":"basic","name":"BasicMapFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"map_ref01"},"m":{},"o":"create","s":[],"v":[]}]}, 'Map', {"POST /map":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"url":{"type":"string","format":"uri","description":"The base URL to start crawling from","key$":"url"},"search":{"type":"string","description":"Specify a search query to order the results by relevance. Example: 'blog' will return URLs that contain the word 'blog' in the URL ordered by relevance.","key$":"search"},"sitemap":{"type":"string","enum":["skip","include","only"],"description":"Sitemap mode when mapping. If you set it to `skip`, the sitemap won't be used to find URLs. If you set it to `only`, only URLs that are in the sitemap will be returned. By default (`include`), the sitemap and other methods will be used together to find URLs.","default":"include","key$":"sitemap"},"includeSubdomains":{"type":"boolean","description":"Include subdomains of the website","default":true,"key$":"includeSubdomains"},"ignoreQueryParameters":{"type":"boolean","description":"Do not return URLs with query parameters","default":true,"key$":"ignoreQueryParameters"},"ignoreCache":{"type":"boolean","description":"Bypass the sitemap cache to retrieve fresh URLs. Sitemap data is cached for up to 7 days; use this parameter when your sitemap has been recently updated.","default":false,"key$":"ignoreCache"},"limit":{"type":"integer","description":"Maximum number of links to return","default":5000,"maximum":100000,"key$":"limit"},"timeout":{"type":"integer","description":"Timeout in milliseconds. There is no timeout by default.","key$":"timeout"},"location":{"type":"object","description":"Location settings for the request. When specified, this will use an appropriate proxy if available and emulate the corresponding language and timezone settings. Defaults to 'US' if not specified.","properties":{"country":{"type":"string","description":"ISO 3166-1 alpha-2 country code (e.g., 'US', 'AU', 'DE', 'JP')","pattern":"^[A-Z]{2}$","default":"US"},"languages":{"type":"array","description":"Preferred languages and locales for the request in order of priority. Defaults to the language of the specified location. See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language","items":{"type":"string","example":"en-US"}}},"key$":"location"},"auditMetadata":{"type":"object","description":"User attribution included with SIEM logging events when SIEM Logging is enabled for the organization.","additionalProperties":false,"required":["username"],"properties":{"username":{"type":"string","maxLength":1024,"description":"The username associated with the request."}},"x-ref":"#/components/schemas/AuditMetadata","key$":"auditMetadata"},"threatProtection":{"type":"object","title":"Threat Protection Override","description":"Per-request [Threat Protection](https://docs.firecrawl.dev/features/threat-protection) override. Fields you provide replace the corresponding fields of your organization's policy for this request only; omitted fields keep their organization-level values. Requires Threat Protection to be enabled for your team (enterprise feature) — otherwise the request is rejected with a 403. If your organization has disabled request overrides, any request that includes this object is rejected with a 403. If Threat Protection is enforced for your team, `mode` may not be set to `off`.","properties":{"mode":{"type":"string","enum":["off","normal"],"description":"URL scanning mode for this request. `normal` checks URLs against Google Web Risk (+2 credits per URL scanned)."},"riskScoreThreshold":{"type":"integer","minimum":0,"maximum":100,"description":"Normalized risk score (0–100) at or above which a classifier verdict blocks the URL. Lower is stricter.","example":75},"blacklist":{"type":"array","maxItems":1000,"items":{"type":"string"},"description":"Domains to always block, as plain domains (`example.com`) or wildcard globs (`*.example.com`). No protocol, path, or port."},"whitelist":{"type":"array","maxItems":1000,"items":{"type":"string"},"description":"Domains to always allow, as plain domains or wildcard globs. Wins over every other rule."},"blockedTlds":{"type":"array","maxItems":1000,"items":{"type":"string"},"description":"Top-level domains to block outright, lowercase without the leading dot (e.g. `zip`)."},"failurePolicy":{"type":"string","enum":["open","closed"],"description":"What to do when the classifier can't be reached: `closed` blocks the request, `open` allows it."}},"x-ref":"#/components/schemas/ThreatProtectionOverride","key$":"threatProtection"}},"required":["url"],"index$":1},"examples":{"example1":{"summary":"Example 1","value":{"url":"<string>","search":"<string>","sitemap":"include","includeSubdomains":true,"ignoreQueryParameters":true,"ignoreCache":false,"limit":5000,"location":{"country":"US","languages":["en-US"]},"timeout":60000}}}}}},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const map_ref01_ent = client.Map()
    let map_ref01_data = setup.data.new.map['map_ref01']

    map_ref01_data = (await map_ref01_ent.create(map_ref01_data)).data()
    assert(null != map_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/map/MapTestData.json')

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
    ['map01','map02','map03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FIRECRAWL_TEST_MAP_ENTID': idmap,
    'FIRECRAWL_TEST_LIVE': 'FALSE',
    'FIRECRAWL_TEST_EXPLAIN': 'FALSE',
    'FIRECRAWL_APIKEY': '',
  })

  idmap = env['FIRECRAWL_TEST_MAP_ENTID']

  const live = 'TRUE' === env.FIRECRAWL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FIRECRAWL_TEST_MAP_ENTID']
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
  
