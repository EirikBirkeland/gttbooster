// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 15.07.2017.
 */

import addExtraXRegExp from '../../2_classes/xreg'
import * as Hotkeys from '../../2_classes/Hotkeys'

function init (options) {
   addExtraXRegExp()

   if (options.addShortcutCtrlB) {
      Hotkeys.hideTopMenus()
   }
}

export {init}
