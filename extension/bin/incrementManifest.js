/* eslint-env node */
const fs = require('fs')

/**
 *
 * @param opts {Object}
 * @param opts.suffix {string}
 * @param opts.type {type}
 */
function incrementManifest(opts) {
  const {suffix, type} = opts

  try {
    var content = fs.readFileSync('manifest.json', 'utf8')
  } catch (err) {
    console.log('I/O error. File does not exist, or could be read-only')
    process.exit()
  }

  const parsedContent = JSON.parse(content)

  parsedContent.version = parseFloat(parsedContent.version)

  parsedContent.version *= 1000

  if (type === 'dev') {
    parsedContent.version += 1
  } else if (type === 'build') {
    parsedContent.version += 1
  } else {
    return console.warn('oh no, variable `type` has an invalid value: ', type)
  }

  parsedContent.version /= 1000

  parsedContent.version = parsedContent.version.toFixed(3).toString(10)

  if (suffix) {
    parsedContent.name = 'GTT Booster ' + suffix
  } else {
    parsedContent.name = 'GTT Booster'
  }

  fs.writeFileSync('manifest.json', JSON.stringify(parsedContent, null, 4))
}

module.exports = incrementManifest
