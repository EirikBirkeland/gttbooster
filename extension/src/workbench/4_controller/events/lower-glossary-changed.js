import lowerEmitter from '../lowerEmitter'
import _ from 'lodash'

import {checkWhetherNew} from '../../2_classes/Glossaries/lib/checkWhetherNew'
import {glossaryChangeObserver} from '../observers/lower-glossaryChangeObserver'
import {doGlossaryStuff} from '../../2_classes/Glossaries/lib/doGlossaryStuff'
import {cleanupMt} from '../../2_classes/mt/clean-up-mt'
import {removeMt} from '../../2_classes/Glossaries/lib/removeMt'

const debug = require('cth-debug')(__filename)

const debouncedReconnectGlossary = _.debounce(() => {
   glossaryChangeObserver.reconnect()
}, 500, {
   "leading": false,
   "trailing": true
})

lowerEmitter.on('glossary-changed', () => {
   debug.log('GLOSSARY CHANGED')
   glossaryChangeObserver.disconnect()

   /**
    *  RULE START: THE BELOW ACTIONS MUST BE SYNCHRONOUS
    */

   checkWhetherNew()
   doGlossaryStuff()

   // The MT portion is currently excluded from the observer, so sometimes the following function was executed BEFORE the MT was ready.
   _.delay(cleanupMt, 500)

   if (window.cth.option.removeMt === true) {
      removeMt()
   }

   /**
    *  RULE END: THE ABOVE ACTIONS MUST BE SYNCHRONOUS
    */
   debouncedReconnectGlossary()
})
