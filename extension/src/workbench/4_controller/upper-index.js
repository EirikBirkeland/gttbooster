// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 23.06.2016.
 */
import {addNewDocname} from '../2_classes/upper-lib/addNewDocName'
import {replaceTitle} from '../2_classes/upper-lib/replaceTitle'
import {runCompletionCheck} from '../2_classes/upper-lib/runCompletionCheck'
import {filesync} from '../2_classes/upper-lib/filesync'
import initToolbar from '../2_classes/toolbar/toolbar-index'
import {addQMLink, addSgLink, addTCLink} from '../2_classes/upper-lib/addIcons'
import upperEmitter from './upperEmitter'

function init (options) {
   initToolbar()

   addNewDocname(options.addNewDocname)

   replaceTitle()

   runCompletionCheck()

   addSgLink()
   addQMLink()
   addTCLink()

   if (localStorage['cth-dev-mode'] === 'true') {
      filesync(window)
   }

   if (options.replaceTitle) {
      replaceTitle()
   }

   upperEmitter.initListeners()
}

export default {init}
