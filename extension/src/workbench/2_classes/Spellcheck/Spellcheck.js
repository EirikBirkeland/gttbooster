/* global __filename */
// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 25.08.2016.
 */

import $ from 'jquery'
import _ from 'lodash'

import getListOfUniqueWords from './getListOfUniqueWords'
import normalizeTextNodes from './normalizeTextNodes'
import getTextNodesShallowIn from './getTextNodesShallowIn'
import asyncForEach from './asyncForEach'
import addContextMenu from './addContextMenu'
import stripSymbolsUnicode from 'strip-symbols-unicode'
import {Storage} from '../../../model/GeneralStorage'
import getLanguageToUse from './getLanguageToUse'

const debug = require('cth-debug')(__filename.replace(/^src\//, ''))

const run = _.debounce(_performSpellcheck, 100, {
   "leading": false,
   "trailing": true
})

function _performSpellcheck (nodes) {
   const hasOverride = window.cth.option.spellcheckOverride[0] && window.cth.option.spellcheckOverride[1]

   const language = {
      "override": hasOverride ? window.cth.option.spellcheckOverride[1] : null,
      "gtt": window.cth.docInfo.dokumentSprak,
      "navigator": navigator.language
   }

   const listOfUniqueWords = getListOfUniqueWords(nodes)

   const languageToUse = getLanguageToUse()
   debug.log(`languageToUse: ${languageToUse}`)
   if (languageToUse === null || languageToUse === undefined) {
      return window.cth.postMessage('warning', 'Can\'t detect a valid language code. Please head over to options screen > spellcheck tab and manually specify a spellcheck database you would like to use.', true)
   }

   Storage.keys({"storeName": languageToUse}).then((res) => {
      const exceptions = res
      debug.log(`exceptions: ${exceptions}`)
      const filteredText = exceptions.length
         ? listOfUniqueWords.replace(/\\/g, '').split(' ').filter((ele) => !exceptions.includes(ele)).join(' ')
         : listOfUniqueWords

      sendMessage(filteredText, (res) => {
         if (res && res.text) {
            const processString = (str) => str.split(' ').filter((ele) => Boolean(ele))
            const wordsArray = processString(res.text)
            if (window.cth.option.WHOLE_DOC_QA_TOGGLE) {
               if (nodes.length > 1) {
                  addHighlight(wordsArray, nodes, {"async": true})
               } else {
                  addHighlight(wordsArray, nodes, {"async": false})
               }
            }
         } else {
            debug.log('`res` was empty - no valid spellcheck results received from server')
         }
      })
   }).catch(debug.warn)

   /**
    *
    * @param string {string} - string of words to send
    * @param cb {Function} - a function callback
    */
   function sendMessage (string, cb) {
      chrome.runtime.sendMessage({
         "header": 'spellcheck',
         "text": string,
         language,
         "user": window.cth.docInfo.brukerNavn.toLowerCase()
      }, cb)
   }
}

/**
 *
 * @param misspelledWords {string[]}
 * @param nodes {NodeList}
 * @param opts {Object}
 */
function addHighlight (misspelledWords, nodes, opts) {
   debug.log('misspelledWords:')
   debug.log(misspelledWords)
   debug.log('nodes:')
   debug.log($(nodes).html())

   removeWiggles(nodes)

   if (opts.async) {
      asyncForEach(nodes, _addHighlight, 0)
   } else {
      _.forEach(nodes, _addHighlight)
   }

   addContextMenu()

   function _addHighlight (ele, index, array) {
      if (!window.cth.option.WHOLE_DOC_QA_TOGGLE) {
         return
      }

      const $textNodes = $(getTextNodesShallowIn(array[index].childNodes))
      _.forEach($textNodes, (ele, i, arr) => {
         while (arr[i].textContent.lastIndexOf(' ') !== -1) {
            const spaceIndex = arr[i].textContent.lastIndexOf(' ')
            arr[i].splitText(spaceIndex + 1)
            arr[i].splitText(spaceIndex)
         }
      })

      const $updatedTextNodes = $(getTextNodesShallowIn(array[index].childNodes))

      asyncForEach($updatedTextNodes, (ele, index, arr) => {
         if (!window.cth.option.WHOLE_DOC_QA_TOGGLE) {
            return
         }

         const nodeValueWithoutPunctuation = stripSymbolsUnicode(arr[index].nodeValue)

         if (misspelledWords.indexOf(nodeValueWithoutPunctuation) > -1) {
            $(arr[index]).wrap('<span class="cth_redWiggle"/>')
         }
      }, 0)

      normalizeTextNodes(nodes)
   }
}

/**
 *
 * @param nodes {NodeList|Array} - nodes to close wiggles from
 * @returns {undefined}
 */
function removeWiggles (nodes) {
   if (!nodes) {
      return debug.log('No nodes specified as param 1 for removeWiggles()!')
   }
   $(nodes).find('.cth_redWiggle').contents().unwrap()
   // Concatenate adjacent text nodes and similar. Node.normalize() is awesome.
   normalizeTextNodes(nodes)
}

const Spellcheck = {
   run,
   getLanguageToUse,
   removeWiggles
}

export {Spellcheck}
