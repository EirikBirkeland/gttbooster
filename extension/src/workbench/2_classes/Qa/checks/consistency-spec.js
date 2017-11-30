/**
 * Created by eb on 2016/02/29.
 */

import consistencyCheck from './consistencyCheck.js'
import test from 'ava'

const sourceArr = [
   'DOG',
   'tiger',
   'cat',
   'DOG'
]
const targetArr = [
   'hund',
   'KATT',
   'KATT',
   'kjøter'
]

// TODO: Add unit tests for exotic languages, including Gujarati -- because some users complained that consistency checking was not present.

test('should be an object', (t) => {

   if (typeof consistencyCheck === 'object') {

      t.pass()

   }

})

test('should have one or more methods', (t) => {

   if (Object.keys(consistencyCheck).length > 0) {

      t.pass()

   }

})

test('Relative to the specified index, it should return a list of inconsistent target indices', (t) => {

   t.deepEqual({"inconsistentIds": [3]}, consistencyCheck.init(0, sourceArr, targetArr).getResults())

})

test('Relative to the specified index, it should return a list of inconsistent source indices', (t) => {

   t.deepEqual({"inconsistentIds": [2]}, consistencyCheck.init(1, targetArr, sourceArr).getResults())

})

test('should return a message indicating inconsistently translated indices', (t) => {

   t.regex(consistencyCheck.init(0, sourceArr, targetArr).getReport(), /\w.*\d/, 'hellomsg')

})

test('should return a message indicating inconsistent source indices', (t) => {

   t.regex(consistencyCheck.init(1, targetArr, sourceArr).getReport(), /\w.*\d/, 'hellomsg')

})

test('should return null, indicating that nothing is inconsistent(?)', (t) => {

   t.is(consistencyCheck.init(0, targetArr, sourceArr).getReport(), null)

})

test('Should return null (TODO: ... or an empty array?)', (t) => {

   t.deepEqual({"inconsistentIds": null}, consistencyCheck.init(3, targetArr, sourceArr).getResults())

})
