/**
 * Retrieve the user's IP
 * @param req - a request object
 * @return {string}
 */
module.exports = function getIp (req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress
}