#!/usr/local/bin/node
'use strict'
const serverAddress = require('../config').server
const sa = require('superagent')
const server = serverAddress + '/auth3'

const usernames = process.argv.slice(2)
    .map(ele => ele.replace(/^\s+|\s+$/g, ""))

if (!usernames) {
    console.log(`Please specify a ${require('chalk').green('User')} e-mail address as first argument.`)
    process.exit(0)
}

usernames.forEach(ele => {
    sa.post(server)
        .send({'user': ele})
        .end((err, res) => {
            if (err)return console.warn(err)
            console.log("Result: " + JSON.stringify(res, null, 4))
        })
})