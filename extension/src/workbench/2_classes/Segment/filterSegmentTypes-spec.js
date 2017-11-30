const filterSegmentTypes = require('./filterSegmentTypes')
const test = require('ava')

const classList = [
   'goog-gtc-from-tm-score-100-ice',
   'goog-gtc-from-tm-score-100',
   'goog-gtc-from-tm-score-90'
]

test('', (t) => {

   t.is(
      'goog-gtc-from-tm-score-100-ice',
      filterSegmentTypes(classList)
   )

})
