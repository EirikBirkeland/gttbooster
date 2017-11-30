const test = require('ava')
const obj = require('../popularSimilar')

const sessionTM = [
   {
      "source": 'I have 3 dogs',
      "target": 'Jeg har 3 hunder'
   },
   {
      "source": 'I have 2 cats',
      "target": 'Jeg har 2 katter'
   }
]

test('a', (t) => {

   obj.init(sessionTM)
   t.is(obj.checkAndReplace('I have 9 dogs'), 'Jeg har 9 hunder')
   t.is(obj.checkAndReplace('I have 7 cats'), 'Jeg har 7 katter')

})
