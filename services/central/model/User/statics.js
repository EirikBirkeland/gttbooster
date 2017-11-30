// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 22.09.2016.
 */
'use strict'

function storeCall(reqType, opts, cb) {
    switch (reqType) {
        case 'debug':
            return storeDebugCall.call(this, opts.username, opts.debugMsg, opts.ip, opts.chromeVersion, opts.extensionVersion)
        case 'spell':
            return storeSpellCall.call(this, opts.username, opts['data-amount'], opts.ip)
    }
}

function storeDebugCall(username, debugMsg, ip, chromeVersion, extensionVersion) {

    updateAndSave.call(this, username, (theUser) => {

        theUser = update.ipStats(theUser, ip)
        theUser = update.debug(theUser, debugMsg, chromeVersion, extensionVersion)

        theUser.save(handle)
    })

}

function storeSpellCall(username, dataAmount, ip) {

    updateAndSave.call(this, username, (theUser) => {

        theUser = update.ipStats(theUser, ip)
        theUser = update.spell(theUser, dataAmount)

        theUser.save(handle)
    })

}

function updateAndSave(username, cb) {
    const newUser = new this({'_id': username})

    this.findOne({_id: username}, function (err, fetchedUser) {
        if (err) return console.error(err)

        let theUser = fetchedUser || newUser
        return cb(theUser)
    })
}

function handle(err, docs) {
    if (err) {
        console.error(err)
    } else {
        // console.info("These docs updated: ", docs)
    }
}

/**
 *  Takes a user object, edits it, and returns it.
 */
const update = {

    ipStats(user, ip) {

        // ip stat thing .. I should obviously separate and reuse this code
        const index = user['ip-stats'].map(ele => ele.ip).indexOf(ip)
        if (index !== -1) {
            user['ip-stats'][index]['#'] += 1
            user['ip-stats'][index]['date'] = Date.now()
        } else {
            user['ip-stats'].push({ip: ip, '#': 1, 'date': Date.now()})
        }
        //log("Updated user.")
        return user

    },

    debug(user, debugMsg, chromeVersion, extensionVersion) {

        user.requests.debug['#'] += 1
        // Add debugMsg [and current date as an extra for now]
        user.requests.debug['reports'].push(
            {
                'message': debugMsg,
                'submittedDate': Date.now(),
                'chromeVersion': chromeVersion,
                'extensionVersion': extensionVersion
            }
        )
        // Uniq filter it all
        user.requests.debug['reports'] = user.requests.debug['reports']
            .filter((ele, i, arr) => {
                return arr.map(ele => ele.message).indexOf(ele.message) === i
            })
        return user

    },

    spell(user, dataAmount) {

        user.requests.spell['#'] += 1
        user.requests.spell['data-amount'] += dataAmount
        return user

    }

}

module.exports = {storeCall, updateAndSave, update}