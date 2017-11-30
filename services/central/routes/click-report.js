'use strict'
const express = require('express')
const router = module.exports = express.Router()

// NOTE: Just skipping the output for now, let it do its thing :)
const log = function(){}

const User = require('../model/User.js')

router.post('/clickReport', (req, res) => {

    log(req.body)

    log('the thing: ', req.body)
    // Temporary until final release:
    if (!req.body.user) return console.info('Not saving clickReport, as req.body does not contain a .user property')

    const {body, user, date} = req.body

    User.findById(user, (err, userContents) => {

        if (!userContents.usage.numClicks) {
            userContents.usage.numClicks = {}
        }
        if(!userContents.usage.numClicksObject) {
            userContents.usage.numClicksObject = []
        }

        userContents.usage.numClicksObject.push(JSON.stringify(Object.assign({}, body, {date: date})))

        console.log(body)

        Object.keys(body).forEach(ele => {
            console.log(require('chalk').blue(userContents.usage.numClicks[ele]))
            if (!userContents.usage.numClicks[ele]) {
                userContents.usage.numClicks[ele] = body[ele]
            } else {
                const newNum = userContents.usage.numClicks[ele] + body[ele]
                userContents.usage.numClicks[ele] = newNum
            }
        })

        userContents.save((err, savedObject) => {
            if (err) console.warn(err)
            console.log('This is the new object: ', savedObject)
        })
    })

    res.sendStatus(200)
})