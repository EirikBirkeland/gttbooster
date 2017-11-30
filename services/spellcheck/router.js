"use strict"
const express = require('express')
const router = express.Router()

/**
 * Do a spellcheck and return results
 */
router.use(require('./routes/spellcheck'))

module.exports = router
