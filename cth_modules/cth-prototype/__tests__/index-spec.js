const test = require('ava')
require('../index')

test('Check case and change case', (t)=> {
    t.deepEqual(false, "apple".startsWithUppercase())
    t.deepEqual(true, "Apple".startsWithUppercase())
    t.deepEqual(true, "apple".startsWithLowercase())
    t.deepEqual(false, "Apple".startsWithLowercase())
    t.deepEqual("Apple", "apple".upperFirst())
    t.deepEqual("apple", "Apple".lowerFirst())
})

test('Array methods', (t)=> {
    t.deepEqual([1, 2, 3, 4, 5], [[1, 2], [3, 4], [5]].concatAll())
    t.deepEqual({a: 1, b: 1, c: 1, d: 1}, ["a", "b", "c", "d"].arrToObj())
    t.deepEqual([1, 2, 3], [1, 1, 2, 2, 2, 3].uniq())
    t.deepEqual([1, 2, 3], [1, 2, undefined, 3, null, false].truthy())
})

test('hashCode', (t)=> {
    t.deepEqual(-2093694830, "applecake".hashCode())
})