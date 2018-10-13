// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 15.07.2017.
 */

import bodyEmitter from './bodyEmitter'
import _ from 'lodash'
import observeForTransEditor from './observers/body-observeForTransEditor'
import observeForDocStatusChange from './observers/body-observeForDocStatusChange'
import listenForUserInput from './observers/body-listenForUserInput'

require('./events/body-init')
require('./events/body-doc-status-changed')
require('./events/body-move-trans-editor')
require('./events/body-user-types-in-transeditor')

bodyEmitter.initListeners = function () {
    // Debouncing observeForTransEditor because transEditor was inserted twice into the DOM, resulting in twice the amount of work.
    let thing = _.debounce((insertedNode, segmentArea) => {
        bodyEmitter.emit('move-trans-editor', insertedNode, segmentArea)
    }, 50, {
            "leading": true,
            "trailing": false
        })

    observeForTransEditor(thing)

    observeForDocStatusChange((string) => {
        switch (string) {
            case "OK":
                bodyEmitter.emit('doc-status-copyedit', string)
                bodyEmitter.emit('doc-status-changed', string)
                break
            default:
                bodyEmitter.emit('doc-status-changed', string)
                break
        }
    })

    thing = _.debounce((event) => {
        bodyEmitter.emit('user-types-in-transeditor', event)
    }, 500, {
            "leading": false,
            "trailing": true
        })

    listenForUserInput(thing)
}

function init () {
    bodyEmitter.emit('init')
    bodyEmitter.initListeners()
}

export {init, bodyEmitter}
