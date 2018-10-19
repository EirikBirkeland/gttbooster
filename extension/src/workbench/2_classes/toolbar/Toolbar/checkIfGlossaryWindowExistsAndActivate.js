/* global chrome */
// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by Eirik on 12.07.2017.
 */
import Toggles from './toggles';

const debug = require('cth-debug')(__filename.replace(/^src\//, ''));

export default function () {
   chrome.runtime.sendMessage({"header": 'glossaryWindowExists'}, (res) => {
      if (res === true) {
         Toggles.sendGlossariesToBackground();
      } else if (res === false) {
         debug.log('The glossaryWindow does not exist, so not sending glossaries to BG');
      } else {
         debug.log(`Invalid value ${res} was received from background page.`);
      }
   });
}
