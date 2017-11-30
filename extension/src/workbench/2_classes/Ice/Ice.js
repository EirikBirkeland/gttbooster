import $ from 'jquery'
import IceSegmentsCollection from './IceSegmentsCollection'

const debug = require('cth-debug')(__filename)

class Ice {

   constructor() {

      throw new Error('You\'re trying to instantiate a monad/wrapper')

   }

   static add() {

      const dom = window.cth.dom
      const iceSegments = new IceSegmentsCollection($(cth.dom.targetDoc).find('.goog-gtc-from-tm-score-100-ice'))

      iceSegments.addIndicatorIcons().disableMouseEvents()

      if (dom.transEditor) {

         const closestSegment = $(dom.transEditor).closest('.goog-gtc-unit').children().first()

         if (closestSegment[0].classList.contains('goog-gtc-from-tm-score-100-ice')) {

            $(dom.transEditor).attr('contenteditable', 'false')

         } else {

            $(dom.transEditor).attr('contenteditable', 'true').focus() // By focusing the caret is made available

         }

      }

   }

   static remove() {

      const dom = window.cth.dom
      const iceSegments = new IceSegmentsCollection($(cth.dom.targetDoc).find('.goog-gtc-from-tm-score-100-ice'))

      iceSegments.removeIndicatorIcons().enableMouseEvents()

      $(dom.transEditor).attr('contenteditable', 'true').focus()

   }

}

export {Ice}
