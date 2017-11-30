'use strict'
const mongoose = require('../db').db

const paymentMetaSchema = mongoose.Schema({
    'paymentObject': {},
    '_isADummyObject': Boolean
})

paymentMetaSchema.statics = require('./Payment/statics')

module.exports = mongoose.model('PaymentMeta', paymentMetaSchema)