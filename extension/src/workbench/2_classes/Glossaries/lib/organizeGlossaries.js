/* global chrome */
// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2016/02/19.
 */

import $ from 'jquery'
import _ from 'lodash'

import tinysort from '../../../../../vendor/tinysort'
import {highlightRelevant} from './organizeGlossaries/highlightRelevant'

const notifier = typeof window !== 'undefined' ? require('../../notifier') : console

const debug = require('cth-debug')(__filename.replace(/^src\//, ''))

/**
 *
 * @param productName {string} - the product name, e.g. as retrieved from the document title
 */
function alphabetizeAndHighlight (productName) {
   const $glossItems = $('.gtc-tools-autosearch').find('div.gtc-glossary-content-holder').find('li.gtc-glossary-match-holder')

   if ($glossItems && $glossItems.length && $glossItems.length > 1) {
      tinysort($glossItems)
      highlightRelevant(productName)
   }
}

const sendToBackground = (() => {
   const debouncedSend = _.debounce((header, body) => {
      try {
         chrome.runtime.sendMessage({
            header,
            body
         }, (response) => {
            debug.log(response)
         })
      } catch (err) {
         if (window) {
            notifier.info("Chrome is refusing to open the glossary window. Please reload the page and try again.")
         }
      }
   }, 250, {
      "leading": false,
      "trailing": true
   })

   return function () {
      const header = 'glossaries'
      const body = _prepareGlossaryPage()

      const combined = {
         header,
         body
      }
      debug.log(combined)

      debouncedSend(header, body)

      function _prepareGlossaryPage () {
         const glossaryContentHolder = $(document).find('.gtc-tools-autosearch').find('.gtc-glossary-content-holder .gtc-glossary-list')

         try {
            var glossaryList = glossaryContentHolder[0].innerHTML
         } catch (err) {
            debug.log('gtc-glossary-content-holder was not ready?')
         }

         return glossaryList
      }
   }
})()

export {alphabetizeAndHighlight, sendToBackground}
