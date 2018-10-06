/* global MutationObserver */
import $ from 'jquery';
import _ from 'lodash';

const debug = require('cth-debug')(__filename);

function updateTrados (transEditor, segmentArea) {
   const tempTradosText = $(window.cth.dom.targetDoc).find('#cth_tempTradosText')[0];

   const $sourceSegmentText = segmentArea
      ? $(window.cth.dom.sourceDoc).find(`#${segmentArea.id}`).children().clone()
      : $(window.cth.dom.currentSourceSegment).children().clone();

   const toInsert = $sourceSegmentText.clone()[0];
   toInsert.className = 'QA';
   toInsert.id = 'cth_tempTradosText';
   toInsert.appendChild($('<br/>')[0]);

   if (tempTradosText) {
      tempTradosText.parentNode.replaceChild(toInsert, tempTradosText);
   } else {
      transEditor.insertBefore(toInsert, transEditor.firstChild);
   }
}

function startTrados () {
   try {
      var transEditor = $(window.cth.dom.targetDoc).find('#transEditor')[0].parentNode;
   } catch (e) {
      debug.info('The transEditor is not open, so startTrados() does nothing.');
   }

   if (transEditor) {
      updateTrados(transEditor, null);
   }
}

function trados (insertedNode, segmentArea) {
   if (window.cth.option.TRADOS_TOGGLE === true) {
      const observer = new MutationObserver(() => {
         updateTrados(insertedNode, segmentArea);
      });

      const correspondingSourceSegment = $(window.cth.dom.sourceDoc).find(`#${segmentArea.id}`)[0];

      /**
       *  Stop observing a little after segment insertion, in order to pick up the glossaries being added in the source by other code.
       *  todoz: I could perhaps use a debounce method instead, but I'm not sure at this point which is better. Low priority!
       */

      observer.observe(correspondingSourceSegment, {
         "childList": true,
         "subtree": true
      });

      _.delay(observer.disconnect.bind(observer), 1000);

      updateTrados(insertedNode, segmentArea);
   } else {
      $(window.cth.dom.targetDoc).find('#cth_tempTradosText').remove();
   }
}

export {updateTrados, startTrados, trados};
