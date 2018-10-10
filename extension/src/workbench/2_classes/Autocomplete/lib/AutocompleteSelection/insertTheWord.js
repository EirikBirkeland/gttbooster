import {returnMatchingPortion} from '../select-helpers'
import {RE_FOR_GETTING_WORD_BEFORE_CARET, RE_FOR_PARTS_TO_IGNORE} from '../regex-patterns'
import XRegExp from 'xregexp'

const debug = require('cth-debug')(__filename)

export default function insertTheWord (singleWordToAdd, originalCaretOffset) {
   const textContent = this.baseNode.textContent

   const allTextBeforeCaret = textContent.substring(0, originalCaretOffset)

   const allTextAfterCaret = textContent.substring(originalCaretOffset)

   const lastWord = getLastWordInString(allTextBeforeCaret).replace(RE_FOR_PARTS_TO_IGNORE, '')

   debug.log('lastWord: ', lastWord)
   debug.log('singleWordToAdd: ', singleWordToAdd)
   const matchingPart = returnMatchingPortion(lastWord, singleWordToAdd)

   debug.log('matchingPart: ', matchingPart)

   this.baseNode.textContent = allTextBeforeCaret.replace(new RegExp(`${XRegExp.escape(matchingPart)}$`, 'i'), singleWordToAdd.replace(/\s*[\(\[].*/, "")) + allTextAfterCaret
}

function getLastWordInString (str) {
   const words = str.split(RE_FOR_GETTING_WORD_BEFORE_CARET)
   return words[words.length - 1]
}