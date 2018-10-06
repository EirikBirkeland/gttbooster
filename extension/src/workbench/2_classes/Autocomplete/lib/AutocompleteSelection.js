import {moveCaretForward} from './select-helpers';
import insertTheWord from './AutocompleteSelection/insertTheWord';
import moveCaretToAfterInsertedWord from './AutocompleteSelection/moveCaretToAfterInsertedWord';

const debug = require('cth-debug')(__filename);

export default function AutocompleteSelection (doc) {
   const sel = doc.getSelection();
   sel.insertTheWord = insertTheWord;
   sel.moveCaretToAfterInsertedWord = moveCaretToAfterInsertedWord;
   sel.moveCaretForward = moveCaretForward;
   return sel;
}