/* global cth */
import { EventEmitter } from 'events';
import $ from 'jquery';
import _ from 'lodash';
import TransEditor from 'workbench/2_classes/TransEditor';

import observeForFindButtonClick from './observers/upper-observeForFindButtonClick';
import observeForUnexpectedIframe from './observers/upper-observeForUnexpectedIframe';

const debug = require('cth-debug')(__filename.replace(/^src\//, ''));

const upperEmitter = new EventEmitter();

upperEmitter.on('click-find-button', () => {
   debug.log('click-find-button event triggered');
   if (cth.option.SOURCE_TOGGLE === true) {
      const DELAY_TO_RACE_WITH_GTT = 400;
      _.delay(() => TransEditor.scrollIntoView({ "node": '.goog-gtc-fnr-highlight' }), DELAY_TO_RACE_WITH_GTT);
   }
});

upperEmitter.on('iframe-inserted', (addedNodes) => {
   _.forEach(addedNodes, (ele) => {
      $(ele).remove();
   });
});

upperEmitter.initListeners = function () {
   observeForFindButtonClick(() => {
      upperEmitter.emit('click-find-button');
   });
   observeForUnexpectedIframe((addedNodes) => {
      upperEmitter.emit('iframe-inserted', addedNodes);
   });
};

export default upperEmitter;
