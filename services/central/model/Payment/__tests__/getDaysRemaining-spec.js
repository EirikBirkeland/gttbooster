const test = require('ava')
const {getDaysRemaining} = require('../methods')

const paymentObjectActivated = {
    paymentObject: {
        payment_date: '07:17:12 Apr 10, 2017 PDT',
        item_number: 'subscribe_1_month'
    },
    activationDate: '2017-04-10 16:23:20.467',
    hasBeenActivated: true
}

const paymentObjectUnactivated = {
    paymentObject: {
        payment_date: '07:17:12 Apr 10, 2017 PDT',
        item_number: 'subscribe_1_month'
    },
    activationDate: null,
    hasBeenActivated: false
}

test('should return x days', t => {
    t.deepEqual(typeof getDaysRemaining.call(paymentObjectUnactivated), 'number')
})

test('should return x days', t => {
    t.deepEqual(typeof getDaysRemaining.call(paymentObjectActivated), 'number')
})