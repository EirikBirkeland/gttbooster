const loglevel = require('loglevel')

if (!loglevel.log) loglevel.log = loglevel.debug

module.exports = loglevel