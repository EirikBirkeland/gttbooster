/* eslint-env node */
const fs = require('fs')

/**
 *
 * @param opts {Object}
 * @param opts.suffix {string}
 * @param opts.type {type}
 */
function incrementManifest(opts) {
  const { type } = opts

  try {
    var content = fs.readFileSync('manifest.json', 'utf8')
  } catch (err) {
    console.log('I/O error. File does not exist, or could be read-only')
    process.exit()
  }

  const parsedContent = JSON.parse(content)

  parsedContent.version = parseFloat(parsedContent.version)

  parsedContent.version *= 1000

  parsedContent.version += 1

  parsedContent.version /= 1000

  parsedContent.version = parsedContent.version.toFixed(3).toString(10)

  fs.writeFileSync('manifest.json', JSON.stringify(parsedContent, null, 4))
}

module.exports = incrementManifest
