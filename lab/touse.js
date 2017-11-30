// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2016/02/13.
 */
'use strict'
// from content script:
chrome.extension.sendMessage({method: 'events.feed.get'},
    browseraction.showEventsFromFeed_)

// background.js: create context menus on page. INVESTIGATE: Can I replace the existing context menu entirely? Would it make sense or would it hinder the user? Alternatively, can I place my items on top, or maybe .. the user can hold shift to bring up my special context menu, which lets the user do all kinds of magic like rearrange sentences.
chrome.contextMenus.create({
    'title': 'Testing123',
    'contexts': ['selection', 'editable'],
    'onclick': alert('hey!')
})

chrome.notifications.create(
    'id1', {
        type: 'basic',
        iconUrl: 'image1.png',
        title: 'Althe Frazon',
        message: 'Hi, what\'s going on tonight?',
        buttons: [{
            title: 'Call',
            iconUrl: 'call.png'
        },
        {
            title: 'Send Email',
            iconUrl: 'email.png'
        }],
        priority: 0
    },
    function () { /* Error checking goes here */
    }
)

// Quota adjustment for storage
// https://developer.chrome.com/apps/offline_storage#query

// BaconJS seems like it could get real useful
// https://baconjs.github.io/tutorials.html
// great demo: http://raimohanska.github.io/bacon.js-slides/0.html


cth.dom.latestDocStatus = cth.completion_check.retrieveStatusFromDocument()

var thisDoc = {}

function doStuff() {
    console.log(this)
    var segNum = this.parentNode.id.match(/\d+/)[0]
    var currTime = Date.now()
    if (!thisDoc[segNum]) thisDoc[segNum] = []
    thisDoc[segNum].push({
        [currTime]: this.innerHTML.replace(/<[^>]+>/g, '')
    })
}

var debouncedDoStuff = _.debounce(doStuff, 1500, {'leading': false, 'trailing': true})

$(cth.dom.targetSegments)
    .find('.goog-gtc-translatable')
    .bind('DOMSubtreeModified', debouncedDoStuff)

//baconjs version:

$(cth.dom.targetSegments)
    .find('.goog-gtc-translatable')
    .asEventStream('DOMSubtreeModified')
    .map('.target.value')