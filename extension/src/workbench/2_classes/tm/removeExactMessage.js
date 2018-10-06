import $ from 'jquery';
import _ from 'lodash';

// TODO: No biggie, but why doesn't this work?
export default function removeExactMessage () {
   const $leftFloating = $($('.gtc-tool-left-floating')[0]);
   const $suggestionMessages = $leftFloating.find('.gtc-tm-suggestion-message');
   const EXACT_MATCH_STRING = '(Exact match)';
   _.forEach($suggestionMessages, (ele) => {
      const $spans = $(ele).find('span');
      _.forEach($spans, (span) => {
         if (span.innerHTML.indexOf(EXACT_MATCH_STRING) > -1) {
            $(span).html('');
         }
      });
   });
}
