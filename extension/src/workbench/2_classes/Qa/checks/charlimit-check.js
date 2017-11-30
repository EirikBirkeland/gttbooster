// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2016/03/02.
 */

import _ from 'lodash'

import * as eastAsianWidth from 'east-asian-width'

const $ = typeof window !== 'undefined' ? require('jquery') : require('cheerio')

const debug = require('cth-debug')(__filename.replace(/^src\//, ''))

/**
 *  TODO: Replace below with a textnode-based version or similar -- which would be more robust in the event of future changes.
 */

/**
 *
 * @param {jQuery} $sourceSegment
 * @param {jQuery} $targetSegment
 * @param {jQuery} sourceDoc
 * @returns {string|null}
 */
export default function runCharLimitCheck ($sourceSegment, $targetSegment, sourceDoc) {
   if (!$(sourceDoc).find('.goog-gtt-messageblock .messageHeader').length) {
      return null
   }

   /*
    * _TODO: Replace or merge with the 'convert to placeholders' thing.
    * _FIXME: Needs much more testing.
    */
   const _normalize = (str) => str.replace(/\r?\n/g, ' ').replace(/<span class="goog-gtc-glossary-highlight"[^>]+>(.*?)<\/span>/g, '$1').replace(/<span class="cth[^>]+>(.*?)<\/span>/g, '$1').// Preserve my own wrapped stuff
   replace(/<span[^>]+>&nbsp;<\/span>/g, ' ').// Preserve NBSPs
   replace(/<span[^>]+> <\/span>/g, ' ').// Preserve spaces
   replace(/<span[^>]+><\/span>/g, '').// Strip empty PH
   replace(/<span[^>]+>.*?<\/span>/g, '').// Strip all concrete PHs
   replace(/<bdi[^>]+>.*?<\/bdi>/g, '').// Strip all concrete BDI PHs
   replace(/&amp;/g, '&')

   const description = $(sourceDoc).find(`#${$targetSegment.attr('id')}`).closest('.goog-gtt-messageblock').find('.messageHeader')

   if (!description.length
      || typeof description.html() !== 'string'
      || description.html().match(/\[CHAR LIMIT=NONE\]/)) {
      return null
   }

   const charLimitRe = /CHAR[ _-]LIMIT.*?=([0-9]+).*?\]|([0-9]+) chars|([0-9]+) characters/

   // Fix me: This actually triggers when the segment itself contains text like "5 characters" !

   const charLimit =
      description.html().match(charLimitRe)
         ? _.compact(description.html().match(charLimitRe))[1] // compact is a hack because sometimes multiple undefineds are included before the actual match at [3].
         : null

   debug.log('**********')
   debug.log($sourceSegment.children().html())
   debug.log($targetSegment.children().html())

   const strippedTarget = _normalize($targetSegment.children().html())
   const strippedSource = _normalize($sourceSegment.children().html())

   const adjustedWidth = eastAsianWidth.str_width(strippedTarget)

   debug.log(`charLimit: ${charLimit}`)
   debug.log(`adjustedWidth: ${adjustedWidth}`)

   debug.log('Standard length: ', strippedTarget.length)
   debug.log('East Asian width: ', adjustedWidth)

   let returnMsg = ''

   const gtcTextNode = $targetSegment.find('.gtc-text').html()
   if (gtcTextNode) {
      const gtcTextLength = parseInt(gtcTextNode.replace(/.*?(\d+).*/, '$1'))
      if (gtcTextLength !== adjustedWidth) {
         /*
          * TODO: Investigate this later ...
          * returnMsg += `WARNING: The calculated target segment width was different from Google's own.<br/>`
          */
         debug.log(`gtcText: ${gtcTextLength}`)
         debug.log(`adjustedWidth: ${adjustedWidth}`)
         debug.log(strippedTarget)
      }
   }

   if (charLimit &&
      charLimit.match(/^\d+$/) &&
      charLimit > 0) {
      if (adjustedWidth > charLimit) {
         returnMsg += `Character limit exceeded by ${adjustedWidth - charLimit}<br>Source string length is ${strippedSource.length}`
      }
   }
   return returnMsg
}