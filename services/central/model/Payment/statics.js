const convertMillisecondsToHours = require('./convertMillisecondsToHours')
const {MONTH_DURATION_HOURS, EXTRACT_NUMBER_RE, MONTH_DURATION_DAYS} = require('./constants')

const Payment = require('../Payment.js')
const PaymentMeta = require('../PaymentMeta.js')
const getNumMonths = require('./getNumMonths')

/**
 *
 * @param paymentDocs {Object[]} - a collection of Payment objects
 * @returns {Array}
 */
const getActiveValidPayment = (paymentDocs) => {
    return paymentDocs.filter(ele => {
        if (ele.paymentObject.item_number) {
            const numMonths = getNumMonths(ele)
            return ele.hasBeenActivated
                && (convertMillisecondsToHours(new Date() - new Date(ele.activationDate))) < (numMonths * MONTH_DURATION_HOURS)
        } else return false
    })
}

/**
 *
 * @param paymentDocs {Object[]} - a collection of Payment objects
 * @param [cb] {Function} - optional callback
 */
function activateOldest(paymentDocs, cb) {
    // No active found. Time to find a fresh one and activate it, if available.
    // TODO: Get oldest non-expired doc here!
    const unactivatedPaymentDocs = paymentDocs.filter(ele => {
        return !ele.hasBeenActivated
    })

    if (unactivatedPaymentDocs.length) {
        const theOldestOne = unactivatedPaymentDocs.reduce((acc, ele) => {
            if (ele.paymentObject.payment_date > acc) {
                acc = ele
            }
            return acc
        })

        theOldestOne.hasBeenActivated = true
        theOldestOne.activationDate = new Date()

        theOldestOne.save((err, savedObj) => {
            if (err) console.warn(err)
            if (cb) return cb()
        })
    }
}

module.exports = {activateOldest, getActiveValidPayment}