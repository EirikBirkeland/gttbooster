// ESLint rules:
/*global chrome*/

import ConsistencyCheck from '../../2_body/qa/checks/consistency'
window.ConsistencyCheck = ConsistencyCheck

const debug = require('cth-debug')(__filename)

function handleConsistencyRequest(req, msg) {

    const projectNumber = req.projectNumber

    if (msg) {
        sendMessage(msg)
    }

    function sendMessage(text) {
        chrome.tabs.query({}, function (tabs) {
            const message = text
            tabs.forEach(ele => {
                if (ele.title.match(projectNumber)) {
                    debug.log('Sending message ...')
                    chrome.tabs.sendMessage(ele.id, message)
                }
            })
        })
    }

    function tellDocumentsToGoInactive() {
        // unset localStorage
        localStorage[projectNumber + '-synchronization'] = 'false'
        // send notification to each tab to shut down
        sendMessage('Go inactive')
    }
}

import a from '../../2_body/qa/checks/consistency'
import m from 'mithril'
require('bootstrap')
require('../../../css/localize-bootstrap.less')

function runConsistencyCheck() {
    const theDoc = window.theDoc
    const singleProject = theDoc['varHere'] // projNum here - maybe inserted thru message

    class Stringy {
        constructor(str) {
            this.str = str
        }

        toString() {
            return this.str
        }
    }

    var sourceStringy = []
    var targetStringy = []

    _.forOwn(singleProject, (val, key) => {
        var filename = key
        var sourceStrings = val[0]
        sourceStringy = sourceStringy.concat(sourceStrings.map((ele)=> {
            const item = new Stringy(ele)
            item.filename = filename
            return item
        }))

        var targetStrings = val[1]
        targetStringy = targetStringy.concat(targetStrings.map((ele)=> {
            const item = new Stringy(ele)
            item.filename = filename
            return item
        }))

    })

    ConsistencyCheck.init(i, sourceStringy, targetStringy, true)
    var inconsistentIds = ConsistencyCheck.getResults().inconsistentIds
    debug.log(inconsistentIds)

}

export {handleConsistencyRequest, runConsistencyCheck}