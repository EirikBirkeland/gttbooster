import $ from 'jquery'
import {convertPlaceholders} from '../Segment/convertPlaceholders'
import removeExactMessage from './removeExactMessage'
import addRating from './addRating'
import changeDiffHighlighting from './changeDiffHighlighting'
import sortItems from './sortItems'

const debug = require('cth-debug')(__filename)

export function updateTmView() {

   // $('.bootstrap-wrapper.cth-fuzzy-copy-container').remove()

   const $currentHighlightedTargetSegment = $(window.cth.dom.targetDoc).find('.goog-gtc-unit-highlight')

   try { // Allows for undefined as well!

      var currentHighlightedTargetSegmentId = $currentHighlightedTargetSegment[0].parentNode.id

   } catch (e) {

      debug.info('No segment currently highlighted, so will not attempt to add fuzzy % and rating')
      return

   }

   const correspondingSourceSegment = $(window.cth.dom.sourceDocClone).find(`#${currentHighlightedTargetSegmentId}`)

   const sourceSegmentText = convertPlaceholders(correspondingSourceSegment[0])

   removeExactMessage()
   addRating(sourceSegmentText)
   sortItems()
   changeDiffHighlighting(sourceSegmentText)

}
