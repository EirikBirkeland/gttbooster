'use strict'
const mongoose = require('../db').db
const immutablePlugin = require('mongoose-immutable')

/**
 *  A new object should be created for each transaction ... and data should simply be
 *  queried as needed. This way, creating a big mess is avoided.
 */
const paymentSchema = mongoose.Schema({
    'paymentObject': {},
    'originalPaymentObject': {type: String, immutable: true},
    'activationDate': Date,
    'hasBeenActivated': Boolean,
    'hasExpired': Boolean,
    '_validAccounts': {type: [String], default: []},
    '_comment': {type: String, default: ''},
    '_durationOverride': {type: String, default: ''},
    '_type': {type: String, default: ''},
    '_isADummyObject': Boolean
})

paymentSchema.plugin(immutablePlugin)
paymentSchema.methods = require('./Payment/methods')
paymentSchema.statics = require('./Payment/statics')

module.exports = mongoose.model('Payment', paymentSchema)