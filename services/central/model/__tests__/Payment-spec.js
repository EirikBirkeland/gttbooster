const Payment = require('../Payment')
const test = require('ava')

test('object should be immutable', t => {
    const pay = new Payment({originalPaymentObject: 'original'})
    pay.originalPaymentObject = 'new'
    t.is(pay.originalPaymentObject, 'original')
})
