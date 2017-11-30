const test = require('ava')
const calculateType = require('../calculateType')

test('abc', t => {
    t.is("Expired", calculateType(0, 0))
    t.is("Trial", calculateType(3, 0))
    t.is("Subscription", calculateType(0, 30))
    t.is("Subscription", calculateType(3, 3))
})