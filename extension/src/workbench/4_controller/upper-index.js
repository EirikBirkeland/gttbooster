// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 23.06.2016.
 */

 // TODO: Merge upper-index with upperEmitter (no particular changes needed - do the same for lower and body later)

import { addNewDocname } from '../2_classes/upper-lib/addNewDocName';
import { replaceTitle } from '../2_classes/upper-lib/replaceTitle';
import { runCompletionCheck } from '../2_classes/upper-lib/runCompletionCheck';
import { filesync } from '../2_classes/upper-lib/filesync';
import initToolbar from '../2_classes/toolbar/toolbar-index';
import { addQMLink, addSgLink, addTCLink } from '../2_classes/upper-lib/addIcons';
import upperEmitter from './upperEmitter';
import { Dev } from '../2_classes/Dev';

function init (options) {
   initToolbar();

   addNewDocname(options.addNewDocname);

   replaceTitle();

   runCompletionCheck();

   addSgLink();
   addQMLink();
   addTCLink();

   Dev(()=>filesync(window));

   upperEmitter.initListeners();
}

export default { init };
