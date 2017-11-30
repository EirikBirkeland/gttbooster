// TODO: Test and expand this. Replace with "CORS" npm module if feasible.

const probe = require('pmx').probe()

const seenUsersThisSession = new Set()

module.exports = function (opts) {

    const metric = probe.metric({
        name: opts.label,
        value: function () {
            return seenUsersThisSession.size
        }
    })

    return function (request, response, next) {
        if (request.body.user) {
            seenUsersThisSession.add(request.body.user)
        }
        next()
    }
}