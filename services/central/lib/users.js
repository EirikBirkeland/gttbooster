const readFileSync = require('fs').readFileSync
const file = readFileSync('/home/eb/Share/00_obelisk/lib/secret/users.tsv', 'utf8')

const getUsers = function () {
    return file
        .split(/\r?\n/)
        .filter(ele => ele.length >= 1)
        // Exclude lines prefixed with a #
        .filter(ele => !/^\s*#/.test(ele))
        // Remove any trailing comments and trim spaces
        .map(ele => ele.replace(/#.*/, "").trim())
}

module.exports = getUsers