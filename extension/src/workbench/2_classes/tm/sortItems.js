import $ from 'jquery';

const debug = require('cth-debug')(__dirname);

/**
 * Sorts TM entries in the AutoSearch according to fuzzy percentage.
 */
export default function sortItems () {
   const $items = $('.gtc-tools-autosearch').find('.gtc-tm-suggestion-holder');

   if (!$items.find('.cth-fuzzy').length) {
      return debug.log('Refusing to sortItems because .cth-fuzzy labels were not found.');
   }

   const sorted = $items.sort((a, b) => {
      const htmlA = $(a).find('.cth-fuzzy').html();
      const htmlB = $(b).find('.cth-fuzzy').html();
      return parseInt(htmlB, 10) - parseInt(htmlA, 10);
   });

   sorted.appendTo($items.parent());
}
