import getPartOfWord from './getPartOfWord';
import { RE_FOR_PARTS_TO_IGNORE } from './regex-patterns';
import AutocompleteSelection from './AutocompleteSelection';

const debug = require('cth-debug')(__filename.replace(/^src\//, ''));

/*
 * TODO: Include support for parens. E.g. when I have sth like (applec and try to achieve (applecake, the parens are simply removed.
 * This requires me to not only detect and strip the parens, but also make sure it is reinserted or left intact.
 * Best possible solution: Never grab the parens from the segment to begin with, to reduce processing.
 */

export default function select (event, ui) {
   debug.log('ui item value: ', ui.item.value);

   const selection = AutocompleteSelection(window.cth.dom.targetDoc);

   const originalCaretOffset = selection.baseOffset;

   debug.log('originalCaretOffset: ', originalCaretOffset);

   const currentInputWord = getPartOfWord.beforeCaret(selection).replace(RE_FOR_PARTS_TO_IGNORE, '');

   debug.log('currentInputWord: ', currentInputWord);

   const singleWordToAdd = (() => {
      if (window.cth.option.autocompletePreserveCase) {
         return currentInputWord.startsWithUppercase()
            ? ui.item.value.upperFirst()
            : ui.item.value.lowerFirst();
      }
      return ui.item.value;
   })();

   debug.log('wordToAdd: ', singleWordToAdd);

   selection.insertTheWord(singleWordToAdd, originalCaretOffset);
   selection.moveCaretToAfterInsertedWord(singleWordToAdd, originalCaretOffset);

   return false;
}
