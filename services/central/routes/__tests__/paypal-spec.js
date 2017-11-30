'use strict'
const test = require('ava')
const serverAddress = require('../../config').server
const sa = require('superagent')
const server = serverAddress + '/ddfddf8a-95a9-4e75-a30f-e3206c5ac68b'

const {
    threeMonthsPayment,
    subscriptionPayment,
    subscriptionPaymentMeta,
    unofficialPayment,
    tmp
} = require('./helpers/paypal-helper')

test.cb('Should store an unofficial object in Payment', t => {
    sa.post(server)
        .send(tmp)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end((err, res) => {
            if (err) {
                console.warn('Failed.')
                return console.warn(err)
            }
            t.end(!res.body === true)
        })
})

test.cb('Should store a 3 month payment object in Payment', t => {
    sa.post(server)
        .send(threeMonthsPayment)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end((err, res) => {
            if (err) {
                console.warn('Failed.')
                return console.warn(err)
            }
            t.end(!res.body === true)
        })
})

test.cb('Should store a 3 month payment object in Payment', t => {
    sa.post(server)
        .send(threeMonthsPayment)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end((err, res) => {
            if (err) {
                console.warn('Failed.')
                return console.warn(err)
            }
            t.end(!res.body === true)
        })
})

test.cb('Should store a payment object in Payment', t => {
    sa.post(server)
        .send(subscriptionPayment)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end((err, res) => {
            if (err) {
                console.warn('Failed.')
                return console.warn(err)
            }
            t.end(!res.body === true)
        })
})

test.cb('Should store a payment object in PaymentMeta', t => {
    sa.post(server)
        .send(subscriptionPaymentMeta)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end((err, res) => {
            if (err) {
                console.warn('Failed.')
                return console.warn(err)
            }
            t.end(!res.body === true)
        })
})
