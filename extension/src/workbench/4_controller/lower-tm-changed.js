import lowerEmitter from '../lowerEmitter';
import _ from 'lodash';

import { indicateNumOfTmMatches as _indicateNumOfTmMatches } from '../../2_classes/tm/sendTmIndicationToTransEditor';
import { updateTmView } from '../../2_classes/tm/updateTmView';

import { tmChangeObserver } from '../observers/lower-tmChangeObserver';
import { Dev } from '../../2_classes/Dev';

const debug = require('cth-debug')(__filename);

const indicateNumOfTmMatches = _.debounce(_indicateNumOfTmMatches, 250, {
   "leading": false,
   "trailing": true
});

const debouncedReconnectTm = _.debounce(() => {
   tmChangeObserver.reconnect();
}, 250, {
   "leading": false,
   "trailing": true
});

lowerEmitter.on('tm-changed', () => {
   debug.log('TM CHANGED');
   tmChangeObserver.disconnect();

   /**
    *  RULE START: THE BELOW ACTIONS MUST BE SYNCHRONOUS
    */

   updateTmView();
   Dev(indicateNumOfTmMatches);

   /**
    *  RULE END: THE ABOVE ACTIONS MUST BE SYNCHRONOUS
    */
   debouncedReconnectTm();
});
