import $ from 'jquery';

function checkForRepeatedSegmentsButtonAndHighlightIt () {
   const repeatAttr = $(window.cth.dom.targetDoc.body).find('#goog-gtc-repbutton');
   if (!repeatAttr.hasClass('jfk-button-disabled')) {
      repeatAttr.children().first().css('background-color', '#40E0D0');
   } else {
      repeatAttr.children().first().css('background-color', '');
   }
}

export { checkForRepeatedSegmentsButtonAndHighlightIt };
