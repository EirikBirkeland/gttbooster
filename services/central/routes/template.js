'use strict'
const express = require('express')
const router = module.exports = express.Router()
const routeName = '/theroutename'

router.post(routeName, (req, res) => {
    console.log(`The route ${routeName} was reached`)
})