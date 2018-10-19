import $ from 'jquery';
import { icons } from '../../../icons';

const debug = require('cth-debug')(__filename);

export default function toggleItem (opts) {
   const { optionName, cthBtnId, insertedElementId, icon, onFunc, offFunc } = opts;
   const opt = window.cth.option; // Short alias
   if (opt[optionName] === false) {
      debug.log(`Now turning on ${optionName}`);
      opt[optionName] = true;
      onFunc();
      $(`#${cthBtnId}`).find('img')[0].src = icons[icon[0]];
      debug.log('Just switched icon to onState');
   } else if (opt[optionName] === true) {
      debug.log(`Now turning off ${optionName}`);
      opt[optionName] = false;
      if (offFunc !== null) {
         offFunc();
      }
      $(`#${cthBtnId}`).find('img')[0].src = icons[icon[1]];
      debug.log('Just switched icon to offState');
      if (insertedElementId) {
         debug.log('OK');
         $(window.cth.dom.targetDoc).find(`#${insertedElementId}`).remove();
      }
   } else {
      debug.log(`${optionName} is not in a valid state.`);
   }
}
