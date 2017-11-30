// @flow
// This is used prior to storage ... authentication

const permittedTxnTypes = [
    'recurring_payment',
    'subscr_payment',
    'send_money',
    'web_accept'
]

/**
 *
 * TODOz: The below sums should be synced against the website store as well
 */
const permittedSums = [
    28,
    90,
    150,
    240
]

const permittedCurrencies = [
    'eur',
    'EUR'
]

const permittedItemNumbers = [
    'subscribe_1_month',
    'buynow_3_months',
    'buynow_6_months',
    'buynow_12_months'
]

const emailRe = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i // supports 99% of e-mails

const emailIsValid = function (str) {
    if (str.match(emailRe)) {
        return true
    }
}

function isValid(array) {
    return function (currency) {
        return array.includes(currency)
    }
}

const currencyIsValid = isValid(permittedCurrencies)
const txnTypeIsValid = isValid(permittedTxnTypes)
const sumIsValid = isValid(permittedSums)
const itemNumberIsValid = isValid(permittedItemNumbers)

module.exports = {currencyIsValid, txnTypeIsValid, sumIsValid, itemNumberIsValid, emailIsValid}