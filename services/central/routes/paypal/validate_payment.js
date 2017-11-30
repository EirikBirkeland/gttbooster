'use strict'

const mailAlert = require('./mailAlert')
const {currencyIsValid, txnTypeIsValid, sumIsValid, itemNumberIsValid, emailIsValid} = require('./validate_payment/PERMITTED')
const chalk = require('chalk')
/**
 *
 * @param paymentObject {Object} - a payment object from PayPal
 * @returns {boolean} - returns "true" if the object represents an actual payment; "false" if not.
 */
function validatePayment(paymentObject) {
    const {mc_currency, option_selection1, txn_type, mc_gross, payer_email, item_number} = paymentObject

    // Returning early, because subscr_signup is not an actual payment - merely an agreement.
    if (txn_type === 'subscr_signup') {
        return false
    }

    let msg = ''

    if (!txnTypeIsValid(txn_type)) {
        msg += 'Unknown txn_type: ' + txn_type + '\n'
    }

    if (!emailIsValid(payer_email)) {
        msg += 'The payer\'s email is not valid!\n'
    }

    if (msg.length) {
        mailAlert({
            receiver: 'gttbooster@gmail.com',
            body: `
        ${msg}\n
        ${JSON.stringify(paymentObject, null, '\t')}
        `,
            subject: 'PayPal error'
        })
        console.info(chalk.red('The object did NOT pass Payment validation'))
        console.info(msg)
        return false
    }
    console.info(chalk.green('The object passed Payment validation'))
    return true
}

module.exports = validatePayment