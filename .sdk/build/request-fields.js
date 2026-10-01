const fs = require('node:fs')
const path = require('node:path')

function correctRequestFields(model) {
  const spec = JSON.parse(fs.readFileSync(path.join(__dirname, '../def/openapi.json'), 'utf8'))
  for (const [entityName, endpoint] of Object.entries({ scrape: '/scrape', map: '/map' })) {
    const entity = model.main.kit.entity[entityName]
    if (!entity) throw new Error(`Expected ${entityName} entity from ${endpoint}`)
    const request = spec.paths[endpoint].post.requestBody.content['application/json'].schema
    const properties = request.properties
    const required = new Set(request.required ?? [])
    for (const field of Object.values(entity.fields)) {
      // A nested object's required children do not make its parent property mandatory.
      field.r = required.has(field.n)
      field.op = { ...field.op, create: { ...field.op?.create, active: Object.hasOwn(properties, field.n) } }
      // Firecrawl uses an array for request actions and an object for their results.
      if (field.n === 'actions') field.t = '`$ANY`'
    }
  }
}

module.exports = { correctRequestFields }
