'use strict'
const test = require('ava')
const serverAddress = require('../../config').server
const sa = require('superagent')
const server = serverAddress + '/auth3'

test.cb('Should authorize/reject the provided Sesame IDs', t => {
    sa.post(server)
        .send({
            user: 'z_test----birketrans-buyer@gmail.com'
        })
        .end((err, res) => {
            if (err) {
                console.warn('Failed.')
                return console.warn(err)
            }
            t.end(!res.body === true)
        })
})