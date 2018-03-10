import _ from 'lodash'
import bodyEmitter from '../bodyEmitter'

import {updateTheTransEditor} from '../../2_classes/TransEditor/updateTheTransEditor'
import {convertAZippyToDiv} from '../../2_classes/convertAZippyToDiv'
import {qaSheet} from '../../2_classes/Qa/qa-sheet'
import {Font} from '../../2_classes/Font/Font'
import {Cursor} from '../../2_classes/Cursor'
import * as Hotkeys from '../../2_classes/Hotkeys'
import {highlightTextItems} from '../../2_classes/Document/highlightTextItems'
import {Dev} from '../../2_classes/Dev'

bodyEmitter.on('init', (res) => {
   qaSheet(() => {
      Cursor.resetLoadIndication()
   })

   bodyEmitter.initListeners()

   Font.initSavedSize()

   if (cth.option.highlightTextItems) {
      highlightTextItems()
   }

   debugger

   document.addEventListener("DOMContentLoaded", function(event) {
      _.delay(function() {
         Hotkeys.insertEndash()
         Dev(Hotkeys.norwegianQuotes)
      }, 5000)
   })

   Dev(convertAZippyToDiv)
   Dev(updateTheTransEditor)
})
