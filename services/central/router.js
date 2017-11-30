"use strict"
const express = require('express')
const router = express.Router()

/**
 *  Authorize user
 */
router.use(require('./routes/auth'))
/**
 *  New authorize user - due 15th of feb
 */
router.use(require('./routes/auth2'))

/**
 *  New experimental authorize user - TODO: will be upgraded with promises next.
 */
router.use(require('./routes/auth3'))

/**
 * Do a spellcheck and return results
 */
router.use(require('./routes/spell2'))

/**
 * Send all stats to server
 */
router.use(require('./routes/click-report'))

/**
 * Send a request to convert kanji to kana
 */
//router.use(require('./routes/kanji2kana'))

/**
 * When Google sends a payment object
 */
router.use(require('./routes/paypal'))

module.exports = router
