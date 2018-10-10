const test = require('ava')
const ChangeReport = require('./ChangeReport.js').default

// 1. on change to copy-edit, save current document to storage - this is the only time saving is needed
// 2. when the document is opened later, diff should be visible, but in a way that doesn't prevent the user from working on the document if need be (thus, I should not modify the live dom if possible -- I should instead overlay diffed copies)

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
