const dateFormat = require('date-format')

/**
 *  @returns {string}
 */
module.exports = function getDate () {
    return dateFormat.asString('DD/MM/YYYY', new Date())
}