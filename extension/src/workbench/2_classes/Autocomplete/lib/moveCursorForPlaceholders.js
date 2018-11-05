import $ from 'jquery';
import _ from 'lodash';

import getPartOfWord from './getPartOfWord';

const debug = require('cth-debug')(__filename.replace(/^src\//, ''));

const dom = require('../../../5_init/init/doc-references').getDomRefs();

const delays = function (fn, ...args) {
   args.forEach((delay) => {
      setTimeout(fn, delay);
   });
};



export default function initCustomPlaceholderInsertion() {
   $(dom.targetDoc).find('#transEditor').keydown((event) => {
      if (!event.shiftKey &&
         !event.altKey &&
         event.ctrlKey &&
         event.which >= 48 &&
         event.which <= 57
      ) {
         debug.log('Placeholder insertion keyboard event detected.');

         // If an improvement over the delays() solution is needed:
         // Listen for changes to the text input using a MutationObserver. Debounce a callback that will execute the code below.
         delays(() => {
            const selection = dom.targetDoc.getSelection();

            if (selection.baseNode.nodeType !== 3 &&
               !(/{[0-9]\/}|{[0-9]}/).test(selection.baseNode.parentNode.nextSibling.innerHTML)) {
               debug.log('Returning because selection.basenode.nodeType !== 3 && !/{[0-9]\/}/.test(selection.baseNode.parentNode.nextSibling.innerHTML');
               return;
            }

            let count = 0;

            const getPartBeforeCaret = () => getPartOfWord.beforeCaret(selection);
            const getPartAfterCaret = () => getPartOfWord.afterCaret(selection);

            const RE_CLOSING_PH = /{[0-9]+\/?}/; // e.g. {2/}
            const MOVE_RIGHT_LIMIT = 250;

            // Move to the right IF the cursor is not aligned correctly right after the inserted placeholder AND IF the stuff after the caret is a PH.
            while (
               count <= MOVE_RIGHT_LIMIT
               && !RE_CLOSING_PH.test(getPartBeforeCaret())
               && positionIsNotEndOfSegment()
            ) {
               debug.log(getPartBeforeCaret());
               debug.log(getPartAfterCaret());
               count++;
               debug.log('we got in here');
               selection.modify('move', 'right', 'character');
            }

            function positionIsNotEndOfSegment() {
               return Boolean(selection.anchorNode.nextSibling) !== null;
            }
         }, 50, 150, 250);
      }
   });
}
