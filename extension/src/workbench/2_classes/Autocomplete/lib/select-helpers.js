const debug = require('cth-debug')(__filename);

/**
 *
 * @param word1 {string}
 * @param word2 {string}
 * @returns {string|null}
 */
export function returnMatchingPortion (word1, word2) {
   for (let i = 0; i < word1.length; i++) {
      if (word1[i].match(new RegExp(word2[i], 'i'))) {
         continue;
      } else {
         return word2.split('').slice(0, i).join('');
      }
   }
   return word1;
}

/**
 *
 * @param selection {Selection} - an instance of Selection class. Created using getSelection().
 * @returns {undefined}
 */
export function moveCaretForward () {
   debug.log('Moving caret 1 character to the right');
   this.modify('move', 'forward', 'character');
}