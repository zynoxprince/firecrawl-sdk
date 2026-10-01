
const { SdkGen } = require('@voxgig/sdkgen')
const { correctRequestFields } = require('./request-fields')

const config = {
  root: __dirname+'/../dist/Root.js',
  folder: __dirname+'/../..',
  meta: {
    name: 'firecrawl'
  },
  model: {
    folder: __dirname+'/../model',
  },
  // Overwrite generated SDK output, never 3-way merge: output is fully
  // model-derived and never hand-edited, and merging against a drifting
  // .jostraca base keeps stale files / injects <<<<<<< markers on toolchain
  // bumps. See @voxgig/sdkgen docs/explanation/regeneration-overwrite.md.
  existing: { txt: { write: true, merge: false } },
}

module.exports = SdkGen.makeBuild(config).then((generate) => {
  const build = async (model, ...args) => {
    correctRequestFields(model)
    return generate(model, ...args)
  }
  build.step = generate.step
  return build
})
