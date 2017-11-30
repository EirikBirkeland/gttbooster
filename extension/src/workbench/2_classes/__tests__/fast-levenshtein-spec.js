/* This tests an NPM module. */
const test = require('ava')
const l = require('fast-levenshtein')

test('', (t) => {

   t.is(4, l.get("apple", "cake"))
   t.is(1, l.get("abc", "abd"))
   t.is(1, l.get("applecake", "apple cake"))
   t.is(4, l.get("cake", "ekac"))

})