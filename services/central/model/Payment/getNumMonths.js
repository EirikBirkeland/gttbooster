const {EXTRACT_NUMBER_RE} = require('./constants')

/**
 * A shared function
 * @param paymentDoc {Object} - a payment object
 * @return {Number}
 */
function getNumMonths(paymentDoc) {
    const timeLeft = paymentDoc._durationOverride || paymentDoc.paymentObject.item_number
    const numMonths = parseInt(timeLeft.replace(EXTRACT_NUMBER_RE, '$1'))
    return numMonths
}

module.exports = getNumMonths