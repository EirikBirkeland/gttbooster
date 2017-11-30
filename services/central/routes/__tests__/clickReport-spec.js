'use strict'
const test = require('ava')
const serverAddress = require('../../config').server
const sa = require('superagent')
const server = serverAddress + '/clickReport'

test.cb('Should send a click object and return 200 code', t => {
    sa.post(server)
        .send({
            user: '003-no_0024@003vendor.com',
            body: {
                'sth': 3,
                'sthelse': 9
            },
            date: new Date()
        })
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