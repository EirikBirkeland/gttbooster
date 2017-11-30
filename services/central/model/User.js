'use strict'
const mongoose = require('../db').db

// TODO: Add field for browser version; useful when troubleshooting a individual user's problem

const userSchema = mongoose.Schema({
    _id: String,
    'objectCreationDate': {type: Date, default: new Date()},
    'userLastSeen': {type: Date, default: new Date()},
    'ip-stats': [{
        'ip': {type: String, default: ''},
        '#': {type: Number, default: 0},
        'date': {type: Date, default: 0}
    }],
    requests: {
        'auth': {
            '#': {type: Number, default: 0},
            success: {type: Number, default: 0},
            fail: {type: Number, default: 0},
            lastRequest: {type: Date, default: 0}
        },
        'spell': {
            '#': {type: Number, default: 0},
            'data-amount': {type: Number, default: 0}
        },
        'debug': {
            '#': {type: Number, default: 0},
            'reports': [{
                'message': String,
                'submittedDate': {type: Date, default: 0},
                'extensionVersion': Number,
                'chromeVersion': Number
            }]
        }
    },
    usage: {
        'usageStatsEnabled': Boolean,
        numClicks: {},
        numClicksObject: [String],
        datesUsed: [String],
        fingerprints: [String]
    },
    accessStatus: {
        trialStartDate: {type: Date, default: new Date()},
        accountValidOverride: {type: String, default: false}
    },
    /*Manual override for extending individual trial*/
    _extraDaysGranted: {type: Number, default: 0}
})

userSchema.statics = require('./User/statics')
userSchema.methods = require('./User/methods')

module.exports = mongoose.model('User', userSchema)