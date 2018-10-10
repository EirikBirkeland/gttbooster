import $ from 'jquery'
import _ from 'lodash'

const debug = require('cth-debug')(__filename)

const logTransEditorNotReady = _.debounce(() => debug.log('The transEditor is not currently in the DOM, so not proceeding to update window.cth.dom.currentSourceSegment)'), 500)

export default function updateCurrentSegments () {
   const $transEditor = $(window.cth.dom.targetDoc).find('#transEditor')

   if ($transEditor.length > 0) {
      const transEditorId = $transEditor.closest('.goog-gtc-unit').attr('id')
      window.cth.dom.currentSourceSegment = $(window.cth.dom.sourceDoc).find(`#${transEditorId}`)[0]
      window.cth.dom.currentTargetSegment = $(window.cth.dom.targetDoc).find(`#${transEditorId}`)[0]
   } else {
      logTransEditorNotReady()
   }
}
