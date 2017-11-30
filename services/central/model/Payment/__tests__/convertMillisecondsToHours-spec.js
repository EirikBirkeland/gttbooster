const test = require('ava')
const convertMillisecondsToHours = require('../convertMillisecondsToHours')

test('Milliseconds should convert correctly to hours', (t) => {
    t.deepEqual(convertMillisecondsToHours(3600 * 1000), 1)
})