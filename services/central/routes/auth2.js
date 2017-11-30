'use strict'
const express = require('express')
const router = module.exports = express.Router()

// Kept simply for preventing older versions from getting a free ride. /auth3 is current.
router.post('/auth2', (req, res) => {
    res.status(200).send(false)
})