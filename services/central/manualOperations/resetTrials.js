require('../db').loadDb(function () {
})
const User = require('../model/User')
const _ = require('lodash')

User.find({}, function (err, docs) {
    if (err) console.warn(err)

    _.forEach(docs, ele => {
        const user = new User(ele)

            user.usage.datesUsed = []
            user.save((err) => {
                if (err) console.warn(err)
                console.log("Now saved")
            })

    })
})