require('../db').loadDb(function () {
})
const User = require('../model/User')
const _ = require('lodash')

const jacobArray = [
    "003-da_0021@003vendor.com",
    "003-da_0026@003vendor.com",
    "003-da_0029@003vendor.com",
    "003-da_0037@003vendor.com",
    "003-sv_0010@003vendor.com",
    "003-sv_0033@003vendor.com",
    "003-sv_0034@003vendor.com",
    "003-fi_0007@003vendor.com",
    "003-fi_0015@003vendor.com",
]

const scottArray = [
    "003-zhtw_0046@003vendor.com",
    "003-zhtw_0082@003vendor.com",
    "003-zhtw_0094@003vendor.com",
    "003-zhtw_0098@003vendor.com",
    "003-zhtw_0099@003vendor.com",
    "004-zhtw_0200@004vendor.com",
]

User.find({
    '_id': {
        $in: scottArray
    }
}, function (err, docs) {
    if (err) console.warn(err)

    _.forEach(docs, ele => {
        const user = new User(ele)

        if (!user._extraDaysGranted) {
            user._extraDaysGranted = 2
            user.save((err) => {
                if (err) console.warn(err)
                console.log("Now saved")
            })
        } else {
            console.log('This user, ' + require('chalk').yellow(user._id) + ', already has a _extraDaysGranted. Nothing has been changed at this time. Manual check recommended.')
        }
    })
})