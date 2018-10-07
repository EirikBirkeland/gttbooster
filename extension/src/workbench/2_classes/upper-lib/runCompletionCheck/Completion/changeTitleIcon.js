import { icons } from '../../../icons';
import $ from 'jquery';

const debug = require('cth-debug')(__filename.replace(/^src\//, ''));

/**
 * Replaces any existing icon data in <link> tag, or if icon does not exist, it adds a brand new one
 * @param {string} iconName
 */
export default function changeTitleIcon (iconName) {
   const iconId = 'cth_iconReplacement';
   const replaceIcon = $(`#${iconId}`)[0];

   if (replaceIcon) {
      debug.log('Updating icon ...');
      $('#cth_iconReplacement')[0].href = icons[iconName];
   } else {
      debug.log('Replacing original icon ...');
      const link = $('<link/>')[0];
      link.type = 'image/x-icon';
      link.rel = 'icon';
      link.href = icons[iconName];
      link.id = iconId;
      $('head')[0].appendChild(link);
   }
}
