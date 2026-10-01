import assert from 'node:assert/strict';
import { test } from 'node:test';
import { FirecrawlSDK } from '../ts/dist/FirecrawlSDK.js';

test('scrape sends authenticated JSON and unwraps the document response', async () => {
  const calls = [];
  const document = { markdown: '# Example', metadata: { statusCode: 200 } };
  const client = new FirecrawlSDK({ apikey: 'test-key', system: {
    fetch: async (url, options) => {
      calls.push({ url, options });
      return new Response(JSON.stringify({ success: true, data: document }), { status: 200 });
    },
  } });
  const request = { url: 'https://example.com', formats: ['markdown'], onlyMainContent: true };
  const result = await client.Scrape().create(request);
  assert.equal(calls.length, 1);
  assert.equal(String(calls[0].url), 'https://api.firecrawl.dev/v2/scrape');
  assert.equal(calls[0].options.method, 'POST');
  assert.equal(new Headers(calls[0].options.headers).get('authorization'), 'Bearer test-key');
  assert.deepEqual(JSON.parse(calls[0].options.body), request);
  assert.deepEqual(result.data(), document);
});

test('map preserves the bounded request and success/links response', async () => {
  const response = { success: true, links: [{ url: 'https://example.com', title: 'Example' }] };
  const client = new FirecrawlSDK({ apikey: 'test-key', system: {
    fetch: async (url, options) => {
      assert.equal(String(url), 'https://api.firecrawl.dev/v2/map');
      assert.deepEqual(JSON.parse(options.body), { url: 'https://example.com', limit: 3 });
      return new Response(JSON.stringify(response), { status: 200 });
    },
  } });
  assert.deepEqual((await client.Map().create({ url: 'https://example.com', limit: 3 })).data(), response);
});

test('authentication errors reject with an inspectable status', async () => {
  const client = new FirecrawlSDK({ apikey: 'test-key', system: {
    fetch: async () => new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), { status: 401 }),
  } });
  await assert.rejects(client.Map().create({ url: 'https://example.com' }), (error) => {
    assert.equal(error.status, 401);
    return true;
  });
});

test('rate limiting rejects once and preserves retry-after information', async () => {
  let calls = 0;
  const client = new FirecrawlSDK({ apikey: 'test-key', system: {
    fetch: async () => {
      calls++;
      return new Response(JSON.stringify({ success: false, error: 'Rate limit exceeded' }), {
        status: 429, headers: { 'retry-after': '30' },
      });
    },
  } });
  await assert.rejects(client.Map().create({ url: 'https://example.com' }), (error) => {
    assert.equal(error.status, 429);
    assert.equal(error.result.headers['retry-after'], '30');
    return true;
  });
  assert.equal(calls, 1, 'Credit-consuming calls must not be retried implicitly');
});

test('server errors with non-JSON bodies retain their HTTP status', async () => {
  const client = new FirecrawlSDK({ apikey: 'test-key', system: {
    fetch: async () => new Response('<html>Bad Gateway</html>', { status: 502 }),
  } });
  await assert.rejects(client.Scrape().create({ url: 'https://example.com' }), (error) => {
    assert.equal(error.status, 502);
    return true;
  });
});

test('network failures reject instead of returning a success-shaped entity', async () => {
  const client = new FirecrawlSDK({ apikey: 'test-key', system: {
    fetch: async () => { throw new TypeError('Network unavailable'); },
  } });
  await assert.rejects(client.Scrape().create({ url: 'https://example.com' }), (error) => {
    assert.equal(error.status, -1);
    assert.match(error.message, /Network unavailable/);
    return true;
  });
});

test('sequential calls preserve explicit false, zero, and nested request options', async () => {
  const bodies = [];
  const client = new FirecrawlSDK({ apikey: 'test-key', system: {
    fetch: async (_, options) => {
      const body = JSON.parse(options.body);
      bodies.push(body);
      return new Response(JSON.stringify({ success: true, data: { markdown: body.url } }), { status: 200 });
    },
  } });
  const request = {
    url: 'https://example.com', onlyMainContent: false, waitFor: 0,
    location: { country: 'IN', languages: ['en-IN'] },
    actions: [{ type: 'wait', milliseconds: 10 }],
  };
  const before = structuredClone(request);
  const entity = client.Scrape();
  await entity.create(request);
  await entity.create({ url: 'https://example.org' });
  assert.deepEqual(bodies, [before, { url: 'https://example.org' }]);
  assert.deepEqual(request, before, 'Caller-owned options must not be mutated');
});
