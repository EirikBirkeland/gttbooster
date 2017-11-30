const chalk = require('chalk')
const Payment = require('../../model/Payment')

/**
 *
 * @param username {string} - the username (Sesame)
 * @param cb {Function} - the callback
 */
module.exports = function (username) {
  return new Promise((resolve, reject) => {
    Payment.find({'_validAccounts': username}, function (err, paymentDocs) {
      if (err) reject(err)

      /**
       *   If docs retrieved, check contents. TODOz: Add a notez depending on whether user has recurring subscription or not.
       */
      if (paymentDocs.length) {
        let totalDaysLeft = 0

        /**
         *  Check if one or more activeValidPayment exist, and retrieve it/them
         */
        const activeValidPayment = Payment.getActiveValidPayment(paymentDocs)
        console.log("ACTIVE VALID PAYMENTS: ")
        console.log(paymentDocs)

        if (activeValidPayment.length >= 2) {

          console.warn(`${activeValidPayment} documents are active and valid!? Manual check needed.`)
          // send warning email - two active, valid ones should not exist at the same time.
        } else if (activeValidPayment.length === 1) {
          // do  nothing here.
        } else {
          console.log(paymentDocs)
          Payment.activateOldest(paymentDocs)
        }

        console.log('activeValidPayment', activeValidPayment)

        console.log(paymentDocs)

        const nonExpiredValidDocs = paymentDocs.filter((ele) => {
          const payment = new Payment(ele)
          return !payment.didExpire()
        })

        nonExpiredValidDocs.forEach(ele => {
          console.log(require('chalk').yellow(ele))
          const payment = new Payment(ele)

          const daysLeft = payment.getDaysRemaining()
          console.log(require('chalk').red(daysLeft))
          totalDaysLeft += daysLeft
        })

        console.log(chalk.yellow(`${username} has ${totalDaysLeft} days left of paid time.`))

        resolve(totalDaysLeft)
      } else {
        console.warn(chalk.yellow(`${username} has 0 days left of paid time.`))

        resolve(0)
      }
    })
  })
}