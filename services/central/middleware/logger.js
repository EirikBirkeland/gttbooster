// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 11.09.2016.
 */
'use strict'
const chalk = require('chalk')
const recordDailyStats = require('./logger/recordDailyStats')
const moment = require('moment')
moment.locale('nb')

let count = 0

module.exports = function (opts) {
    return function (req, res, next) {

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

        recordDailyStats(req, opts, () => {
            count++
        })

        if (req.method === 'GET') {
            console.log(`${count} :: ${chalk.green(req.method)} :: ${req.url} :: ${moment().format('hh:mm')} :: ${ip}`)
        } else {
            console.log(`${count} :: ${chalk.green(req.method)} :: ${req.url} :: ${moment().format('hh:mm')} :: ${req.headers.host} :: ${req.body.user || null} :: ${req.body.extensionVersion} :: ${ip}`)
        }
        next()
    }
}