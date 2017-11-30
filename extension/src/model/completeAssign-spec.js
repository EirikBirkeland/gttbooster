import test from 'ava'
import {completeAssign} from './completeAssign'

test('should return a merged object with expected special properties like getters/setters', (t) => {

   const expected = {
      get "apple"() {

         "cat"

      },
      "dog": "cat"
   }

   t.deepEqual(expected, completeAssign({}, {
      get "apple"() {

         "cat"

      }
   }, {"dog": "cat"}))

})