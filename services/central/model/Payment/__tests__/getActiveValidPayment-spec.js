const test = require('ava')
const {getActiveValidPayment} = require('../statics')

const testObjs = [{
    paymentObject: {item_number: 'buynow_6_months'},
    hasBeenActivated: true,
    activationDate: '2017-08-10 23:43:46.017'
}, {
    paymentObject: {item_number: 'buynow_12_months'},
    hasBeenActivated: false,
    activationDate: null
}, {
    paymentObject: {item_number: 'buynow_3_months'},
    hasBeenActivated: false,
    activationDate: null
},
]

test('Filter the valid object(s)', (t) => {
    t.is(getActiveValidPayment(testObjs)[0],
        testObjs[0])
})