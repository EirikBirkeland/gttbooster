// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 13.07.2016.
 */

import $ from 'jquery';

const $gtcTransPanel = $('.gtc-translation-panel');
const $leftPane = $gtcTransPanel.find('.goog-splitpane-first-container');
const $rightPane = $gtcTransPanel.find('.goog-splitpane-second-container');
const $separator = $('.gtc-splitpane-handle');

function maximizeTransPane () {
   $leftPane.css({ "width": '0px' });
   $rightPane.css({
      "width": '100%',
      "left": '5px'
   });
   $separator.css({ "left": '0px' });
}

function resetPanePositions () {
   $leftPane.css({ "width": '50%' });
   $rightPane.css({
      "width": '50%',
      "left": $leftPane.css('width')
   });
   $separator.css({ "left": '50%' });
}

export { maximizeTransPane, resetPanePositions };
