const test = require('ava')
const {ChangeReport} = require('../ChangeReport')

ChangeReport.init(
   [
      'I am dog.',
      'I am cat.',
      'I am fish.'
   ],
   {
      'In copy edit': {
         "content": [
            'I am dog',
            'I am cat',
            'I am fish'
         ],
         "addedDate": 1509037850634
      },
      "Pending": {
         "content": [
            'I am doggy',
            'I am catty',
            'I am fishy'
         ],
         "addedDate": 1519039850634
      }
   }
)

test.cb('should init and return expected data', (t) => {
   t.deepEqual([
      'I am dog.',
      'I am cat.',
      'I am fish.'
   ], ChangeReport.documentStrings)
   t.deepEqual([
      'I am dog',
      'I am cat',
      'I am fish'
   ], ChangeReport.cache['In copy edit'].content)
   t.end()
})

test('should add a document snapshot and retrieve it as expected', (t) => {
   const arr = [
      'I am inu.',
      'I am neko.',
      'I am sakana.'
   ]
   ChangeReport.addDocumentSnapshot('In review', arr)
   t.deepEqual(arr, ChangeReport.cache['In review'].content)
})

test('should get diffed strings using loaded document snapshot and specified cached snapshot', (t) => {
   t.is(3, ChangeReport.getDiffedStrings(['In copy edit']).length)
})

test('throws', (t) => {
   const error = t.throws(() => {
      ChangeReport.getDiffedStrings(['In copy editt'])
   }, ReferenceError)

   t.is(error.message, 'Invalid cache key.')
})
