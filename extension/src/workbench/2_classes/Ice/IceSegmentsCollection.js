import $ from 'jquery';
import {icons} from '../icons';

const debug = require('cth-debug')(__filename.replace(/^src\//, ''));

export default class IceSegmentsCollection {
   /**
    *
    * @param {NodeList} iceSegments - goog-gtc-from-tm-score-100-ice
    */
   constructor (iceSegments) {
      if (!iceSegments.length) {
         debug.log('Provided nodelist has no length');
      }
      this.nodelist = iceSegments;
      this.length = iceSegments.length;
   }

   addIndicatorIcons () {
      if (!$(window.cth.dom.targetDoc).find('.cth-lockIceBodyIcon').length) {
         const icon = $('<img/>')[0];
         icon.src = icons.lockIceBodyIcon;
         icon.className = 'cth-lockIceBodyIcon';
         $(this.nodelist).parent().append(icon);
      }
      return this;
   }

   removeIndicatorIcons () {
      $(window.cth.dom.targetDoc).find('.cth-lockIceBodyIcon').remove();
      return this;
   }

   disableMouseEvents () {
      $(this.nodelist).css({'pointer-events': 'none'});
      return this;
   }

   enableMouseEvents () {
      $(this.nodelist).css({'pointer-events': ''});
      return this;
   }
}