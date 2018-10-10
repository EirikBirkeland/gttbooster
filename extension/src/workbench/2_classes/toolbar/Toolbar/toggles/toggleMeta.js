import $ from 'jquery'
import {TargetDocument} from '../../../Document/Document'

const debug = require('cth-debug')(__filename)

export default function toggleMeta () {
   if (TargetDocument.hasMessageBlocks()) {
      hideAllMarkupExceptGoogGtcUnit()
   } else {
      return debug.log('Not running _toggleMeta(), as hideMeta is unimplemented for documents without message blocks.')
   }

   function hideAllMarkupExceptGoogGtcUnit () {
      // 1. Hide everything inside messageBlocks except for .gtc-noSplit and descendants,
      $(cth.dom.bothDocs).find('.goog-gtt-messageblock :not(.gtc-noSplit) :not(.gtc-noSplit *)').toggleClass('cth-meta-hidden')
      // 2. but hide all br's
      $(cth.dom.bothDocs).find('br').toggleClass('cth-meta-hidden-br')
      // Then, add some spacing as specified in stylesheet
      $(cth.dom.bothDocs).find('.gtc-noSplit').toggleClass('cth-meta-added-spacing')
   }
}
