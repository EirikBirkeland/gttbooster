const validTypes = [
   'goog-gtc-from-tm-score-100-ice',
   'goog-gtc-from-tm-score-100',
   'goog-gtc-from-tm-score-90',
   'goog-gtc-from-tm-score-99',
   'goog-gtc-from-tm-score-100-fuzzy',
   'goog-gtc-from-mt',
   'goog-gtc-from-human',
   'goog-gtc-from-source'
]

/**
 *
 * @param {string[]} classList
 * @returns {*}
 */
module.exports = function filterSegmentTypes (classList) {
   for (let i = 0; i < validTypes.length; i++) {
      if (Array.from(classList).includes(validTypes[i])) {
         return validTypes[i]
      }
   }
   return null
}
