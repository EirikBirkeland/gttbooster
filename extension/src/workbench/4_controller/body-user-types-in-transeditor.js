import _ from 'lodash';
import $ from 'jquery';
import bodyEmitter from './emitters/bodyEmitter';
import { Dev } from '../2_classes/Dev';
import _checkCurrentSegment from '../2_classes/Qa/checkCurrentSegment';
import TransEditor from '../2_classes/TransEditor';

const debug = require('cth-debug')(__filename.replace(/^src\//, ''));

/**
 * Function to execute when the user types, as detected by listening for keyboard input
 * @type {Function}
 */
const checkCurrentSegment = _.debounce(_checkCurrentSegment, 500, {
   "leading": false,
   "trailing": true
});

bodyEmitter.on('user-types-in-transeditor', (event) => {
   if (cth.option.WHOLE_DOC_QA_TOGGLE) {
      checkCurrentSegment();
   }

   Dev(TransEditor.update.bind(TransEditor));

   /**
    *  Just delete the annoying frame that gets in the way sometimes!
    */
   const $a = $('.gtc-translation').find('.gtc-revision-frame.gtc-document-frame');
   if ($a) {
      $a.remove();
   }
});
