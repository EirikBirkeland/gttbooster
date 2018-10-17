// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 13.07.2016.
 */

import $ from 'jquery'

const $gtcTransPanel = $('.gtc-translation-panel')
const $leftPane = $gtcTransPanel.find('.goog-splitpane-first-container')
const $rightPane = $gtcTransPanel.find('.goog-splitpane-second-container')
const $separator = $('.gtc-splitpane-handle')

function maximizeTransPane () {
   $leftPane.addClass('cth-pane left-maximize')
   $rightPane.addClass('cth-pane right-maximize')
   $separator.addClass('cth-pane separator-maximize')
}

function resetPanePositions () {
   $leftPane.removeClass('cth-pane left-maximize')
   $rightPane.removeClass('cth-pane right-maximize')
   $separator.removeClass('cth-pane separator-maximize')
}

export {maximizeTransPane, resetPanePositions}
