#!/usr/bin/env node

'use strict'

require('pmx').init({http: true, network: true, ports: true})

// Modules
const debug = require('debug')('raneto')

// Here is where we load Raneto.
// When you are in your own project repository,
// Raneto should be installed via NPM and loaded as:
// const raneto = require('raneto');
//
// For development purposes, we load it this way in this example:
const raneto = require('raneto')

// Then, we load our configuration file
// This can be done inline, with a JSON file,
// or with a Node.js module as we do below.
const config = require('./config.js')

// Finally, we initialize Raneto
// with our configuration object
const app = raneto(config)

const PORT = 3335 || app.get('port')

// Load the HTTP Server
const server = app.listen(process.env.PORT || PORT, function () {
    console.log('Now running GTT Booster Knowledge Base at ' + PORT || server.address().port)
})
