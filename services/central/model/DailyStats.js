'use strict'
const mongoose = require('../db').db
const log = console.log
require('cth-prototype')

const statsSchema = new mongoose.Schema({
    _id: String,
    'auth': {type: Number, default: 0},
    'debug': {type: Number, default: 0},
    'latestjson': {type: Number, default: 0},
    'spell': {type: Number, default: 0},
    'spell2': {type: Number, default: 0},
    'unique': {type: Array, default: []},
    'chromeVersions': {type: Array, default: []},
    'extensionVersions': {type: Array, default: []}
})

const moment = require('moment')
/**
 *
 * @param {object} data
 * @param {Array} data.route
 * @param {Array} data.user
 * @param {Array} data.chromeVersion
 * @param {Array} data.extensionVersion
 * @param {Function} cb
 */
statsSchema.statics.retrieveAndUpdate = function retrieveAndUpdate(data, cb) {
    const todaysDate = moment().format('DD/MM/YYYY')
    const def = new this({'_id': todaysDate})

    this.findById(todaysDate, function (err, res) {
        if (err) {
            // This error is expected when the doc has not yet been created:
            if (/No matching document/.test(err)) {
                console.log(err)
            } else {
                console.error(err)
            }
        }

        let stats = res || def

        data.route.forEach(ele => {
            stats[ele.replace(/[^\w\d]/g, '')] += 1
        })

        if (data.user) {
            stats['unique'].push(...data.user)
            stats['unique'] = stats['unique'].uniq().truthy().sort()
        }
        if (data.chromeVersion) {
            stats['chromeVersions'].push(...data.chromeVersion)
            stats['chromeVersions'] = stats['chromeVersions'].uniq().truthy().sort()
        }
        if (data.extensionVersion) {
            stats['extensionVersions'].push(...data.extensionVersion)
            stats['extensionVersions'] = stats['extensionVersions'].uniq().truthy().sort()
        }

        stats.save()
        return cb(stats)

    })
}

const DailyStats = mongoose.model('DailyStats', statsSchema)

module.exports = DailyStats