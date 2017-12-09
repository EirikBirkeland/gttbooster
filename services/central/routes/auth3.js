'use strict'

const express = require('express')
const router = module.exports = express.Router()

const User = require('../model/User.js')
const chalk = require('chalk')
const checkPayment = require('./auth3/checkPayment')
const calculateType = require('./auth3/calculateType')
const handleError = require('../lib/handleError')

/**
 *  This auth path should be fired like once a day (cache). But for now, I will just let it fire each time. Shouldn't cost that many resources.
 */
router.post('/auth3', async (req, res) => {
  const username = req.body.user
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  const fingerprint = req.body.fingerprint || null

  try {
    var userContents = await User.findOneAndUpdate({_id: username}, {_id: username}, {upsert: true, new: true})
  } catch (err) {
    handleError(err)
  }

  const user = new User(userContents)

  if (!user._id) user._id = username

  user.logAuth()
  user.logUserStats(fingerprint)
  user.logIpStats(ip)

  try {
    await user.save()
  } catch (err) {
    handleError(err)
  }

  /**
   *   Check Payment collections, to see if any valid payment info is stored.
   */
  try {
    var paidDaysLeft = await checkPayment(username)
  } catch (err) {
    handleError(err)
  }

  const freeDaysLeft = user.getFreeDaysLeft()

  console.log(chalk.yellow(`${username} has ${freeDaysLeft} days left of Trial`))

  const totalDaysLeft = freeDaysLeft + paidDaysLeft
  console.info("totalDaysLeft: " + totalDaysLeft)
  console.info("paidDaysLeft: " + paidDaysLeft)
  console.info("freeDaysLeft: " + freeDaysLeft)

  const type = calculateType(freeDaysLeft, paidDaysLeft)

  res.status(200).send({
    user: username,
    daysLeft: totalDaysLeft,
    valid: totalDaysLeft > 0 ? true : false,
    type: type
  })
})