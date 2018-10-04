// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 19.07.2016.
 */

const _ = require('lodash')
const $ = typeof window === 'undefined' ? require('cheerio') : require('jquery')
const debug = require('cth-debug')(__filename.replace(/^src\//, ''))

// TODO: See "TODO-contents-of-notranslate-should-not-be-included-in-qa.png". Perhaps add a flag to "convertPlaceholders" or similar, to allow omission of PH content.

/**
 *
 * @param {Node} element - a node with class goog-gtc-unit
 * @returns {String} - the cleaned up string
 */
export function convertPlaceholders (element) {
   let count = -1
   const prevSeen = 0
   let current = 0

   const logObj = {}

   element = $(element).children()[0] // EXAMPLE: span.goog-gtc-translatable.goog-gtc-from-human

   return recurse(element)

   /**
    *
    * @param string {string} - string to store
    * @param encodeoriginal {string} - example: gtc:encodedoriginal="PGJkaSBjbGFzcz0nbm90cmFuc2xhdGUnPg=="
    * @return {number}
    */
   function countEtc (string, encodeoriginal) {
      // Check if PH content exists or not.
      const toSave = `${string}__${encodeoriginal}`

      if (logObj.hasOwnProperty(toSave)) {
         return logObj[toSave]
      }
      count++
      logObj[toSave] = count
      return count
   }

   function recurse (elem) {
      if (!elem) {
         return
      }
      const childNodes = elem.childNodes
      let newString = ''

      _.forEach(childNodes, (ele) => {
         if (ele.nodeType === 1) {
            if (ele.tagName.match(/^a$/i) && $(ele).hasClass('zippy')) {
               const county = countEtc($(ele).html())

               const countSaved = county
               // This should be converted to the next tag
               newString += `{${countSaved}}${recurse(ele)}{/${countSaved}}`
            } else if ($(ele).attr('gtc:attrs')) {
               const county = countEtc(null)

               current = parseInt($(ele).attr('gtc:attrs').replace(/[^0-9]+/g, ''), 10)

               if (prevSeen === 0 || current === prevSeen + 1) {
                  const countSaved = county
                  // This should be converted to the next tag
                  newString += `{${countSaved}}${recurse(ele)}{/${countSaved}}`
               }
            } else if ($(ele).attr('gtc-suppressed-attr')) {
               const county = countEtc($(ele).html())

               const countSaved = county
               // This should be converted to the next tag
               newString += `{${countSaved}}${recurse(ele)}{/${countSaved}}`
            } else if (ele.tagName.match(/^SPAN$/i)) {
               if ($(ele).attr('class')
                  && $(ele).attr('class').match('cth_redWiggle')) {
                  newString += $(ele).text()
               } else if ($(ele).attr('class') &&
                  $(ele).attr('class').match('goog-gtc-glossary-highlight')) {
                  newString += $(ele).text()
                  // TODO: Change to "if has content" and thereby handle all tags in existence.
               } else if ($(ele).attr('contenteditable') &&
                  $(ele).attr('contenteditable').match(/^false$/i)) {
                  const county = countEtc(null)

                  newString += `{${county}/}`
               } else if ($(ele).hasClass('goog-gtc-inchars-space')) {
                  newString += ' '
               } else if ($(ele).hasClass('goog-gtc-inchars-nbsp')) {
                  newString += ' '
               } else if ($(ele).hasClass('goog-gtc-highlight')) {
                  newString += $(ele).text()
               } else if ($(ele).hasClass('notranslate') && $(ele).hasClass('hidefromparserselfclosedtags')) {
                  const county = countEtc($(ele).html())

                  // This should be converted to the next tag
                  newString += `{${county}/}`
               } else if ($(ele).hasClass('notranslate')) {
                  const county = countEtc($(ele).html())
                  newString += `{${county}/}`
               }
            } else if (ele.tagName.match(/^(?:BDI)$/i)
               && ele.firstChild // 10/4/2018 - sometimes firstChild is not defined             
               && $(ele).attr('class')
               && $(ele).attr('class').match('notranslate')) {
               const county = countEtc(ele.firstChild.data, $(ele).attr('gtc:encodedoriginal') || 'none')
               newString += `{${county}/}`
            } else if (ele.tagName.match(/^(?:B|STRONG|EM|I)$/i)) {
               const county = countEtc(ele.tagName)

               /*
                * Note: This caching (countSaved) is necessary since the template string below is evaluated bit by bit,
                * so that by the time countSaved is read a second time, it has already changed.
                */
               const countSaved = county
               newString += `{${countSaved}}${recurse(ele)}{/${countSaved}}`
            } else {
               newString += $(ele)[0].innerHTML
            }
         } else if (ele.nodeType === 3) {
            newString += $(ele).text()
         } else {
            debug.log(ele.nodeType)
         }
      })
      return newString
   }
}
