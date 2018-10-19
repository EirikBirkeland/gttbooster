/* global $ */

export default function validator (node, sheetNames) {
   $(node).validator({

      /**
       * Keep in mind: Returning false results in a validation error
       */
      "custom": {
         equals ($el) {
            const dataEquals = $el.data('equals');

            /**
             *  Don't do a thing if data("equals") is falsy.
             */
            if (!dataEquals) {
               return false;
            }

            /**
             * $el.val() should match the provided data("equals")
             */
            if (!$el.val().match(dataEquals)) {
               return true || `Hey, that's not valid! It's gotta be ${dataEquals}`;
            }
         },
         inlist ($el) {
            const dataInlist = $el.data('inlist');
            if (!dataInlist) {
               return false;
            }

            const list = sheetNames;

            // Note: Allowing trailing and leading spaces for user convenience
            if (!list.length || !list.includes($el.val().trim())) {
               return true;
            }
         }
      }
   });
}
