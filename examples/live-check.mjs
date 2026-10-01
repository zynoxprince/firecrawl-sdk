import assert from 'node:assert/strict';
import { FirecrawlSDK } from '../ts/dist/FirecrawlSDK.js';

const apikey = process.env.FIRECRAWL_API_KEY;
if (!apikey) throw new Error('Set FIRECRAWL_API_KEY before running the live check.');
const deadline = setTimeout(() => {
  console.error('Live check exceeded 90 seconds.');
  process.exit(1);
}, 90_000);

try {
  const client = new FirecrawlSDK({ apikey });
  const page = await client.Scrape().create({
    url: process.env.FIRECRAWL_TEST_URL || 'https://example.com',
    formats: ['markdown'],
    onlyMainContent: true,
  });
  const document = page.data();
  assert.equal(typeof document.markdown, 'string');
  assert.ok(document.markdown.length > 0);
  console.log(JSON.stringify({ test: 'scrape', passed: true, markdownCharacters: document.markdown.length }));

  const site = await client.Map().create({
    url: process.env.FIRECRAWL_MAP_URL || 'https://firecrawl.dev',
    limit: 3,
    includeSubdomains: false,
  });
  const mapped = site.data();
  assert.equal(mapped.success, true);
  assert.ok(Array.isArray(mapped.links));
  assert.ok(mapped.links.length > 0);
  assert.ok(mapped.links.length <= 3);
  assert.ok(mapped.links.every((link) => typeof link.url === 'string'));
  console.log(JSON.stringify({ test: 'map', passed: true, linksReturned: mapped.links.length }));
} catch (error) {
  console.error(JSON.stringify({ passed: false, error: error.name, status: error.status ?? null, code: error.code ?? null }));
  process.exitCode = 1;
} finally {
  clearTimeout(deadline);
}
