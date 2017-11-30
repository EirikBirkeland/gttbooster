const convertMillisecondsToHours = require('./convertMillisecondsToHours')
const {MONTH_DURATION_HOURS, MONTH_DURATION_DAYS} = require('./constants')

const getNumMonths = require('./getNumMonths')

/**
 *
 * @returns {boolean} - whether it expired or not
 */
function didExpire() {
    const {activationDate, hasBeenActivated} = this
    const numMonths = getNumMonths(this)

    if (hasBeenActivated
        && (convertMillisecondsToHours(new Date() - new Date(activationDate)))
        > (numMonths * MONTH_DURATION_HOURS)) {
        return true
    }
    // return false for all other conditions?
    return false
}

/**
 *
 * @returns {Number} - returns number of days
 */
function getDaysRemaining() {
    const {activationDate, hasBeenActivated} = this
    const numMonths = getNumMonths(this)
    const validFor = numMonths * MONTH_DURATION_DAYS
    if (hasBeenActivated) {
        const numDays = convertMillisecondsToHours(new Date() - new Date(activationDate)) / 24
        return validFor - numDays
    } else {
        return validFor
    }
}

module.exports = {getDaysRemaining, didExpire}