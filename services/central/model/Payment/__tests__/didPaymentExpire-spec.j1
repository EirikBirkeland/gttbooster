const test = require('ava')
const {didExpire} = require('../methods')

const testObjs = [{
    paymentObject: {item_number: 'buynow_6_months'},
    hasBeenActivated: true,
    activationDate: '2017-04-10 23:43:46.017'
}, {
    paymentObject: {item_number: 'buynow_3_months'},
    hasBeenActivated: true,
    activationDate: '2016-03-04 12:42:22.123'
},
]

test.skip('expired object should be rejected', (t) => {
    t.is(false, didExpire.call(testObjs[0]))
})
test.skip('unexpired object should be accepted', (t) => {
    t.is(false, didExpire.call(testObjs[1]))
})