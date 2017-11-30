const DailyStats = require('../../model/DailyStats')

let started = false

module.exports = function recordDailyStats(req, opts, cb) {
    // store data in global object
    global.DailyStats = global.DailyStats || {}
    const s = global.DailyStats

    s.route = [] || s.route
    s.route.push(req.url)
    s.user = [] || s.user
    s.user.push(req.body.user)
    s.extensionVersion = [] || s.extensionVersion
    s.extensionVersion.push(req.body.extensionVersion)
    s.chromeVersion = [] || s.chromeVersion
    s.chromeVersion.push(req.body.chromeVersion)

    if (!started) {

        started = true

        setInterval(function () {
            /**
             *  Return if nothing to update
             */
            if (!s.route.length || !s.user.length || !s.extensionVersion || !s.chromeVersion) {
                return
            }
            DailyStats.retrieveAndUpdate({
                route: s.route,
                user: s.user,
                extensionVersion: s.extensionVersion,
                chromeVersion: s.chromeVersion
            }, function (resy) {
                if (resy) {
                    s.route = []
                    s.user = []
                    s.extensionVersion = []
                    s.chromeVersion = []
                }
            })
        }, opts.storeDelay)
    }
    if (cb) cb()
}