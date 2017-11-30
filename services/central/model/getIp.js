/**
 *
 * @param {Object} req - an Express.js req object
 * @returns {*}
 */
module.exports = function getIp (req) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    return ip || null
}