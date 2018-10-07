/* globals cth */
import $ from 'jquery';
import _ from 'lodash';

import bodyEmitter from './emitters/bodyEmitter';

import TransEditor from '../2_classes/TransEditor';
import { checkForRepeatedSegmentsButtonAndHighlightIt } from '../2_classes/TransEditor/lib/checkForRepeatedSegmentsButtonAndHighlightIt';

import Autocomplete from '../2_classes/Autocomplete/index.js';

import runChecks from '../2_classes/Qa/runChecks';
import updateCurrentSegments from '../2_classes/Segment/updateCurrentSegments';
import { Ice } from '../2_classes/Ice/Ice';
import { trados } from '../2_classes/TradosMode/TradosMode';
import { checkWhetherNew } from '../2_classes/Glossaries/lib/checkWhetherNew';
import { Dev } from '../2_classes/Dev';
import * as Hotkeys from '../2_classes/Hotkeys';

const debug = require('cth-debug')(__filename.replace(/^src\//, ''));

const checkWhetherNewDebounce = _.debounce(checkWhetherNew, 300);

bodyEmitter.on('move-trans-editor', (insertedNode, segmentArea) => {
   debug.log('event move-trans-editor triggered');

   /*
    * Debug.log("insertedNode: ", insertedNode)
    *  debug.log("segmentArea: ", segmentArea)
    */

   /**
    *  Just delete the annoying frame that gets in the way sometimes!
    */
   const $a = $('.gtc-translation').find('.gtc-revision-frame.gtc-document-frame');
   if ($a) {
      $a.remove();
   }

   TransEditor.removeButtons();
   _.defer(() => TransEditor.expand(null, 1000));

   const TIME = 300; // 200 or lower seems to cause race condition (at least on some computers)

   _.delay(() => {
      if (!TransEditor.isScrolledIntoView(cth.dom.targetDoc, $(cth.dom.targetDoc).find('#transEditor'))) {
         debug.log(`transEditor is not scrolled into view. Scrolling in ${TIME} ms`);
         TransEditor.scrollIntoView();
      }
   }, TIME);

   _.delay(() => {
      if (!TransEditor.isScrolledIntoView(cth.dom.targetDoc, $(cth.dom.targetDoc).find('#transEditor'))) {
         debug.log(`transEditor is not scrolled into view. Scrolling in ${TIME} ms`);
         TransEditor.scrollIntoView();
      }
   }, 500);

   /**
    *  Should run a last check on the previous segment, to avoid leaving any messages
    *  Hmm, currentSourceSegment should still be the previous segment, so hopefully this works fine.
    */
   if (cth.option.WHOLE_DOC_QA_TOGGLE) {
      runChecks({
         "sourceSegments": window.cth.dom.currentSourceSegment,
         "targetSegments": window.cth.dom.currentTargetSegment,
         "dataElements": window.cth.dataJSON
      });
   }

   updateCurrentSegments();

   trados(insertedNode, segmentArea);

   if (cth.option.ICE_LOCK) {
      Ice.add();
   } else {
      Ice.remove();
   }

   /**
    *  Reinitialize Autocomplete entirely, to avoid creeping lag
    */
   Autocomplete.destroy();
   Autocomplete.init();

   // TODO: Detach the other TranssEditor.expand() call from MergePanes object and use this place instead.
   if (!cth.option.SOURCE_TOGGLE) {
      // TODO: put transPaneWidth inside TransEditor as an option
      const transPaneWidth = parseInt($('.goog-splitpane-second-container').find('.gtc-translation').closest('.goog-splitpane-second-container')[0].style.width);
      TransEditor.expand(null, transPaneWidth - 25);
   }

   _.defer(checkForRepeatedSegmentsButtonAndHighlightIt);
   _.defer(checkWhetherNewDebounce);

   // Nbsp check
   _.defer(() => {
      if ($(cth.dom.currentSourceSegment).find('.goog-gtc-inchars-nbsp').length > 0) {
         $(cth.dom.targetDoc).on('keypress', Hotkeys.ctrl);
      } else {
         $(cth.dom.targetDoc).off('keypress', Hotkeys.ctrl);
      }
   });

   Dev(TransEditor.update.bind(TransEditor));
});
