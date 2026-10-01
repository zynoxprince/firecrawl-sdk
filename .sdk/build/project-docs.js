const fs = require('node:fs/promises')
const path = require('node:path')

// Keep the distributable's setup, examples, safety guidance, and attribution
// aligned with the reviewed project documents after each generation.
async function writeProjectDocs() {
  const root = path.resolve(__dirname, '../..')
  for (const name of ['README.md', 'LICENSE']) {
    await fs.copyFile(path.join(root, name), path.join(root, 'ts', name))
  }
}

module.exports = { writeProjectDocs }
