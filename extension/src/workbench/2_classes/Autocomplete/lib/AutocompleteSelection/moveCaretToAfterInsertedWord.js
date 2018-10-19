import getPartOfWord from '../getPartOfWord';
import XRegExp from 'xregexp';

const debug = require('cth-debug')(__filename);

export default function moveCaretToAfterInsertedWord (singleWordToAdd, originalCaretOffset) {
      singleWordToAdd = singleWordToAdd.replace(/\xa0/g, " ");

      /*
       *  ADJUST CARET POSITION AFTER INSERTION
       */
      const reEscapedWordToAdd = new RegExp(XRegExp.escape(singleWordToAdd));
      const lengthOfWordToAdd = singleWordToAdd.split(/\s+/).length;

      // TODO: while part before caret does not match the intended word, move the caret to the right

      // Move one position first -- this avoids incorrect caret positioning if the inputted word is already written just before.
      this.moveCaretForward();

      debug.log('len', lengthOfWordToAdd);

      /**
       *  ENSURE THAT THE CARET DOESN'T STOP AT A PREVIOUS INSTANCE OF THE INSERTED PHRASE
       */

      const newCaretOffset = () => this.baseOffset;

      debug.log({"newCaretOffset": newCaretOffset()});

      // First, move caret to where it used to be. IMPORTANT: This relies on having the original "originalCaretOffset" value.
      (function moveCaretToOriginalPosition () {
            if (newCaretOffset() <= originalCaretOffset) {
                  const difference = originalCaretOffset - newCaretOffset();
                  for (let i = 0; i <= difference; i++) {
                        this.moveCaretForward();
                  }
            }
      }.bind(this))();
      (function moveCaretUntilEndOfInsertedTerm () {
            const MAX_COUNT = (singleWordToAdd.length + 50) || 100; // use 100 as max count if reEscapedWordToAdd.length is undefined.
            let count = 0;
            while (!getPartOfWord.beforeCaret(this, lengthOfWordToAdd).match(reEscapedWordToAdd)) {
                  ++count;
                  this.moveCaretForward();
                  if (count >= MAX_COUNT) {
                        debug.log(`MAX_COUNT OF ${MAX_COUNT} exceeded for moving caret`);
                        break;
                  }
            }
      }.bind(this))();
}
