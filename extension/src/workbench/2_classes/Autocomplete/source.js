import _ from 'lodash'
import XRegExp from 'xregexp'

import getPartOfWord from './getPartOfWord'

import {removePlaceholderGarbage, stripCurrentInputWord, trimSymbols} from './source/termManipulations'
import {createTermsObject} from './source/createTermsObject'

import {RE_FOR_PARTS_TO_IGNORE} from './regex-patterns'

const debug = require('cth-debug')(__filename.replace(/^src\//, ''))

const pipe = _.flow

export default function source(req, res) {

   const selection = window.cth.dom.targetDoc.getSelection()
   const currentInputWord = getPartOfWord.beforeCaret(selection).replace(RE_FOR_PARTS_TO_IGNORE, '')

   const currentInputWordRe = new RegExp(`^${XRegExp.escape(currentInputWord)}`, 'i')

   debug.log('currentInputWord: ', currentInputWord)

   if (/^$|[\s.]$/.test(currentInputWord)) {

      debug.log('Returning because of /^$|\s$/ matching currentInputWord')
      return res()

   }

   debug.log(`The entire string: ${req.term}`)
   debug.log(`The word user is currently typing: ${currentInputWord}`)

   if (!currentInputWord || currentInputWord.length < this.options.minLength) {

      return res()

   }

   const tmp = createTermsObject(currentInputWordRe, currentInputWord)
   const combinedTerms = stripCurrentInputWord(tmp, currentInputWord)

   debug.log("combinedTerms", combinedTerms)

   // Feed in combinedTerms and pipe through list of functions from left to right using _.flow underneath
   const result = pipe([
      trimSymbols,
      removePlaceholderGarbage
   ])(combinedTerms)

   res(result)

}