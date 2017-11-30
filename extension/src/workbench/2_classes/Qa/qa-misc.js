// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2016/03/06.
 */
const debug = require('cth-debug')(__filename)

/**
 *
 * @param {Segment} source
 * @param {Segment} target
 * @returns {string|null}
 */
function targetEqualsSource (source, target) {
   if (target.segmentType.match('goog-gtc-from-source') &&
      source.inner === target.inner &&
      !source.isUnitAttribute) {
      return 'Target equals source'
   }
   return null
}

function runURLTest (source, target) {
   if (target.match(/hl=en/)) {
      debug.debug('URL is not localized')
      return 'URL is not localized!'
   }
   return null
}

export {targetEqualsSource, runURLTest}
