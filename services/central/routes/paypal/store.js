const Payment = require('../../model/Payment')
const PaymentMeta = require('../../model/PaymentMeta')

/**
 *
 * @param paymentDoc {Object} - one payment doc
 */
function storeAndUpdatePayment(paymentDoc) {
  const p = new Payment({
    'paymentObject': paymentDoc,
    'originalPaymentObject': JSON.stringify(paymentDoc),
    'activationDate': null,
    'hasBeenActivated': false,
    '_validAccounts': paymentDoc.option_selection1 ? paymentDoc.option_selection1
      .trim()
      .split(/\s+/)[0] : [],
    '_type': paymentDoc.option_selection1 ? 'Shop payment' : 'Non-shop payment',
    '_isADummyObject': paymentDoc._isADummyObject ? JSON.parse(paymentDoc._isADummyObject) : false
  })

  // manual override for Maksim Rudolf
  if (paymentDoc.option_selection1.match(/003-sl_0006@003vendor\.com|001-sl_00112082@001vendor\.com/i)) {
    p._validAccounts = ['003-sl_0006@003vendor.com', '001-sl_00112082@001vendor.com']
  }
  else if (paymentDoc.option_selection1.match(/015-IT_0042@015vendor\.com|001-it_00115677@001vendor\.com/i)) {
    p._validAccounts = ['015-IT_0042@015vendor\\.com', '001-it_00115677@001vendor.com']
  }

  p.save((err, savedObject) => {
    if (err) console.warn(err)
  })
}

function storeAndUpdatePaymentMeta(paymentObject) {
  const p = new PaymentMeta({
    'paymentObject': paymentObject,
    '_isADummyObject': paymentObject._isADummyObject ? JSON.parse(paymentObject._isADummyObject) : false
  })
  p.save((err, savedObject) => {
    if (err) console.warn(err)
  })
}


module.exports = {storeAndUpdatePayment, storeAndUpdatePaymentMeta}