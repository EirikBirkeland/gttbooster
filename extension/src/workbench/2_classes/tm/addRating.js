import getColor from './getColor';
import getRating from './getRating';
import $ from 'jquery';
import _ from 'lodash';

/**
 *
 * @param sourceString {string} -
 */
export default function addRating (sourceString) {
   const $suggestions = $('.gtc-tools-autosearch').find('.gtc-tm-suggestion-source');
   $('.cth-fuzzy').parent().remove();

   _.forEach($suggestions, (ele) => {
      const sugg = ele.innerHTML.replace(/<.*?>+/g, '');
      const percent = getRating(sugg, sourceString);

      const $bootWrapper = $('<span/>').addClass('bootstrap-wrapper cth-spacious');

      const color = getColor(percent);
      const label = (() => {
         switch (color) {
            case 'red':
               return 'label-danger';
            case 'orange':
               return 'label-warning';
            case 'blue':
               return 'label-primary';
            default:
               return '';
         }
      })();

      const $result = $('<span/>');
      $result.addClass(`cth-fuzzy label ${label}`).css({"color": 'white'}).html(percent);
      $bootWrapper.append($result, $('<br/>'));
      $bootWrapper.insertAfter($(ele.parentNode).find('.gtc-tm-suggestion-message'));
   });
}
