// Copyright © 2016 Eirik Birkeland. All rights reserved.

/**
 * Created by eb on 2016/02/18.
 */

/* global MutationObserver */

import * as Panes from './Panes';
import {TransEditor} from '../TransEditor/TransEditor';
import $ from 'jquery';
import _ from 'lodash';
import {notifier} from '../notifier';
import {Cursor} from '../Cursor';

const debug = require('cth-debug')(__filename.replace(/^src\//, ''));

// Shared dependency with keyword-filtering (cth-goog-gtc-translatable-mirrored):
const cthGoogGtcTranslatableMirrored = 'cth-goog-gtc-translatable-mirrored';

/*
 * Dilemma: Do I also extract the verticalBarObserver from here? Right now I'm thinking probably, yes. While it would be nice to have completely separate components, it feels dirty and hard to manage when I have separate observers in each module. So, I would rather increase the separation of concerns.
 * Components are cool in a system like ReactJS, but in this case with manual listening, I think a separation of concerns is really a good thing for maintainability, scaling and optimization.
 */

// TODO: The filter menu should change when a segment type is gone due to changes.
const verticalBar = $('.goog-splitpane-handle-horizontal')[0];
const verticalBarObserver = new MutationObserver(() => {
   Panes.maximizeTransPane();
   TransEditor.expand(null, 1000);
});

const sourceDocObserver = new MutationObserver((mutations) => {
   mutations.forEach((mut) => {
      if (
         mut.target.parentNode &&
         $(mut.target.parentNode).hasClass('goog-gtc-unit')
      ) {
         if (window.cth.option.SOURCE_TOGGLE === true) {
            insertSourceSingle(mut.target.parentNode);
            TransEditor.expand(null, 1000);
         }
      }
   });
});

function autoUpdateSourceChange (signal) {
   const target = window.cth.dom.sourceDoc;
   const config = {
      "attributes": false,
      "subtree": true,
      "childList": true,
      "characterData": true
   };

   if (signal === 'start') {
      sourceDocObserver.observe(target, config);
   } else if (signal === 'stop') {
      sourceDocObserver.disconnect();
   }
}

function insertSourceSingle (sourceSegment) {
   const targetSegRef = $(window.cth.dom.targetDoc).find(`#${sourceSegment.id}`)[0];

   if (targetSegRef.style && targetSegRef.style.display === 'none') {
      return;
   }

   const sourceSegCopy = (() => {
      const mirrored = $(sourceSegment).find(`.${cthGoogGtcTranslatableMirrored}`);
      if (mirrored.length) {
         return mirrored.clone()[0];
      }
      return $(sourceSegment).find('.goog-gtc-translatable').clone()[0];
   })();

   debug.log(`targetSegRef: ${targetSegRef}`);

   const a = $(window.cth.dom.targetDoc).find(`.cth_insertedSourceText.${targetSegRef.id}`);

   if (a.length) {
      a[0].innerHTML = sourceSegCopy.innerHTML;
   } else {
      debug.warn('inserted source text was not defined; not updating innerHTML');
   }
}

function insertAll (opts = {}) {
   const {disableNotification} = opts;

   autoUpdateSourceChange('start');

   TransEditor.expand(null, 1000);

   Panes.maximizeTransPane();
   Cursor.showLoadIndication();

   if (!disableNotification && cth.dom.targetSegments.length > 75) {
      notifier.info('Creating merged view ...');

      // The delay is here to give the notifier a chance to display
      _.delay(insertSourceSegments, 500);
   } else {
      insertSourceSegments();
   }

   function insertSourceSegments () {
      _.forEach(cth.dom.sourceSegments, insertSegmentForEach);

      verticalBarObserver.observe(verticalBar, {"attributes": true});

      const $title = $('.gtc-trans-title');
      $title.html($title.html().replace(/Translation:/, 'Combined:'));

      /*
       * I should probably refactor insertAll to a separate implementation file, which then uses the MergePanes class's functionality (minimalistically, without extra behavior that might conflict later, or I'll just add a separate 'refresh' method ... ?
       * scrollTo({delay: 'fast', offset: 200})
       */
      Cursor.resetLoadIndication();
   }

   function insertSegmentForEach (ele, i, arr) {
      if (!window.cth.option.SOURCE_TOGGLE) {
         return;
      }

      const sourceSegments = window.cth.dom.sourceSegments;
      const targetSegments = window.cth.dom.targetSegments;

      // This works fine for only affecting segments that are not hidden.
      if (targetSegments[i].style.display === 'none') {
         return;
      }

      const $sourceSegCopy = (() => {
         const $mirrored = $(sourceSegments[i]).find(`.${cthGoogGtcTranslatableMirrored}`);
         if ($mirrored.length) {
            return $mirrored.clone();
         }
         return $(sourceSegments[i]).find('.goog-gtc-translatable').clone();
      })();

      $sourceSegCopy.removeClass('goog-gtc-unit-highlight').addClass(`cth_insertedSourceText ${sourceSegments[i].id}`);
      $sourceSegCopy.css({
         "color": '#444444',
         'white-space': 'pre-wrap'
      });

      const $textbreak = $('<div/>');
      $textbreak.addClass(`cth_insertedSourceTextBreak ${sourceSegments[i].id}`);

      $textbreak.insertBefore(targetSegments[i]);
      $sourceSegCopy.insertBefore(targetSegments[i]);
      $textbreak.clone().insertBefore(targetSegments[i]);
   }
}

function removeAll () {
   Cursor.showLoadIndication();

   autoUpdateSourceChange('stop');

   TransEditor.expand(null, 1000);

   $(window.cth.dom.targetDoc).find('.cth_insertedSourceText').remove();
   $(window.cth.dom.targetDoc).find('.cth_insertedSourceTextBreak').remove();

   verticalBarObserver.disconnect();

   Panes.resetPanePositions();

   const $title = $('.gtc-trans-title');
   $title.html($title.html().replace(/Combined:/, 'Translation:'));

   Cursor.resetLoadIndication();
}

const MergePanes = {
   insertSourceSingle,
   insertAll,
   removeAll
};

export {MergePanes};