// TODO: So, this would need to be updated to snatch the word AFTER &gt; where applicable.

import {RE_FOR_GETTING_WORD_BEFORE_CARET} from './regex-patterns'

/**
 *
 * @type {{beforeCaret: getPartOfWord.beforeCaret, afterCaret: getPartOfWord.afterCaret}}
 */
const getPartOfWord = {

   /**
    *
    * @param selection {Selection}
    * @param len - an offset for ... what?
    * @return {*}
    */
   beforeCaret(selection, len) {

      if (selection.baseNode && selection.baseNode.nodeType === 3) {

         const currentInputString = selection.baseNode.textContent.substr(0, selection.anchorOffset)
         // "apple cake dog" -> "dog"
         return currentInputString.split(RE_FOR_GETTING_WORD_BEFORE_CARET).slice(-len || -1).join(' ')

      }
      return selection.baseNode.textContent

   },

   /**
    *
    * @param selection {Selection}
    * @param len - an offset for ... what?
    * @return {*}
    */
   afterCaret(selection, len) {

      if (selection.baseNode && selection.baseNode.nodeType === 3) {

         const currentInputString = selection.baseNode.textContent.substr(selection.anchorOffset)
         return currentInputString.split(RE_FOR_GETTING_WORD_BEFORE_CARET).slice(-len || -1).join(' ')

      }
      return selection.baseNode.textContent

   }
}

export default getPartOfWord
