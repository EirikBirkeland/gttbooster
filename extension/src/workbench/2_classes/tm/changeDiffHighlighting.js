import getRating from './getRating'
import GoogleDiff from 'diff-match-patch'
import {customPrettyHtml} from '../custom-pretty-html'
import $ from 'jquery'
import _ from 'lodash'

const debug = require('cth-debug')(__filename.replace(/^src\//, ''))

/**
 *
 * @param sourceString {string} - some source string
 */
export default function changeDiffHighlighting (sourceString) {
   if (!sourceString && localStorage['cth-dev-mode'] === 'true') {
      alert('sourceString is undefined in fn changeDiffHighlighting. See debug info for lower-changeDiffHighlighting in the console for details. Why...?')
   }

   const $suggestions = $('.gtc-tools-autosearch').find('.gtc-tm-suggestion-source')

   const $cthTSwitchButtonClassname = 'cth-T-switch-button'

   _.forEach($suggestions, (ele) => {
      const $parentContainer = $(ele).parent()

      // Return early if the operations have already been carried out (indicated by the presence of the cth-fuzzy button.
      if ($parentContainer.find(`.${$cthTSwitchButtonClassname}`).length) {
         return debug.log('Returning early because the current TM suggestion already has highlighting + button')
      }

      const display = ele
      const tmText = ele.innerHTML.replace(/<.*?>+/g, '')

      const dmp = new GoogleDiff()

      debug.log('tmText: ', tmText)
      debug.log('sourceString: ', sourceString)

      const diffWords = dmp.diff_main(tmText, sourceString)
      dmp.diff_cleanupSemantic(diffWords)

      const $oldText = $('<span/>').html(display.innerHTML)
      const $newDiffedText = $('<span/>').html(customPrettyHtml(diffWords))

      // Simply hide the old text, which is kept to make sure I don't break any GTT dependency.
      if (cth.option.newHighlightingStyle) {
         $oldText.hide()
      } else {
         $newDiffedText.hide()
      }

      $parentContainer.append($('<span/>').html(' '), $newDiffedText, $oldText)

      const $switchButton = $('<button/>').css({
         "opacity": 0.5,
         "position": 'relative',
         "float": 'right',
         "top": '-2px',
         'margin-left': '5px'
      }).addClass(`label label-primary ${$cthTSwitchButtonClassname}`).html('T').attr('data-toggle', 'tooltip').attr('title', 'Toggle between new and old highlighting.')

      $switchButton.click(_toggleVisibility)

      $parentContainer.append($('<span/>').addClass('bootstrap-wrapper').append($switchButton))

      const percent = getRating(tmText, sourceString)

      $suggestions.hide()

      function _toggleVisibility () {
         $newDiffedText.toggle()
         $oldText.toggle()
      }
   })
}
