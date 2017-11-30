'use strict'
const express = require('express')
const router = module.exports = express.Router()
const routeName = '/ddfddf8a-95a9-4e75-a30f-e3206c5ac68b'
const dns = require('dns')

const validatePayment = require('./paypal/validate_payment')

const {storeAndUpdatePayment, storeAndUpdatePaymentMeta} = require('./paypal/store')

const mailAlert = require('./paypal/mailAlert')

router.post(routeName, (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const paymentObject = req.body

    // handle unit test as exception for now
    // TODO: Only allow localhost / 10.0.0.3 and PayPal servers

    dns.reverse(ip, (err, domains) => {
        if (err) {
            console.error('Could not look up DNS for IP:' + ip)
            console.error(err)
        } else {
            console.log('Received from ' + domains[0])
            console.log('domains:', domains)
        }

        if (validatePayment(paymentObject)) {
            // TODO: Only store document if it doesn't exist. E.g. compare the paymentObject to existing - if one exists, then simply do not store.
            storeAndUpdatePayment(paymentObject)
        } else {
            storeAndUpdatePaymentMeta(paymentObject)
        }

        if(isShopPurchase(paymentObject)) {
            mailAlert({
                to: paymentObject.payer_email,
                body: require('./paypal/emailBody')(paymentObject),
                subject: 'Payment confirmation for GTT Booster'})
        }

        res.status(200).send()
    })
})

function isShopPurchase (paymentObject) {
    return paymentObject.item_name ? true : false
}