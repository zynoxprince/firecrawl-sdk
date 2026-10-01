import { readFile, writeFile } from 'node:fs/promises';

const source = JSON.parse(await readFile(new URL('../spec/firecrawl-v2.upstream.json', import.meta.url), 'utf8'));
const resolve = (schema) => schema.$ref
  ? schema.$ref.slice(2).split('/').reduce((value, key) => value[key], source)
  : schema;

function flattenObject(schema) {
  schema = resolve(schema);
  if (!schema.allOf) return structuredClone(schema);
  const merged = { type: 'object', properties: {}, required: [] };
  for (const item of schema.allOf) {
    const part = flattenObject(item);
    Object.assign(merged.properties, part.properties ?? {});
    merged.required.push(...(part.required ?? []));
  }
  merged.required = [...new Set(merged.required)];
  return merged;
}

const spec = structuredClone(source);
spec.info.title = 'Firecrawl Scrape and Map API';
spec.paths = Object.fromEntries(['/scrape', '/map'].map((path) => [path, spec.paths[path]]));
for (const path of Object.values(spec.paths)) {
  const content = path.post.requestBody.content['application/json'];
  content.schema = flattenObject(content.schema);
}
// This SDK targets URL scraping; Alexandria provider-tool execution is outside its scope.
delete spec.paths['/scrape'].post.requestBody.content['application/json'].schema.properties.alexandria;
spec.paths['/scrape'].post.responses['200'].content['application/json'].schema = {
  $ref: '#/components/schemas/ScrapeResponse',
};
await writeFile(new URL('../.sdk/def/openapi.json', import.meta.url), JSON.stringify(spec, null, 2) + '\n');
console.log('Prepared /scrape and /map from the pinned upstream specification.');
