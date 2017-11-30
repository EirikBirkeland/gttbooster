// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 23.06.2016.
 */
import $ from 'jquery'

const debug = require('cth-debug')(__filename)

export function scrollTo(opts) {

   opts = Object.assign({
      "targetDoc": window.cth.dom.targetDoc,
      "node": '#transEditor',
      "delay": 'fast',
      "offset": parseInt($('iframe')[1].style.height) / 3
   }, opts)

   const {targetDoc, node, offset} = opts

   const transEditorNode = $(targetDoc).find(node)
   const firstUntranslatedSegment = $(targetDoc).find('.goog-gtc-from-mt, .goog-gtc-ph-missing, .goog-gtc-from-tm-score-90, .goog-gtc-from-source').first()

   if (transEditorNode.length) {

      debug.log('Scrolling to the transEditor')
      scroll(transEditorNode, offset)

   } else if (firstUntranslatedSegment.length) {

      scroll(firstUntranslatedSegment, offset)

      setTimeout(() => {

         firstUntranslatedSegment.click()

      }, 100)

   }

   /**
    * Note: The animation broke in Chrome v61, and I decided to simply throw it out.
    * @param $a
    * @param {Number} offset
    * @private
    */
   function scroll($a, offset) {

      const theOffset = $a.offset().top - offset
      if (typeof theOffset !== 'number') {

         debug.warn({theOffset})

      }
      $(targetDoc).scrollTop(theOffset)

   }

}
