/* global cth */
// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2016/02/13.
 */
import $ from 'jquery';
import _ from 'lodash';
import XRegExp from 'xregexp';
import TransEditor from '../TransEditor';
import hideUnhighlighted from './hideUnhighlighted';
import { Diacritics } from '../../../../lib/Diacritics';
import { Cursor } from '../Cursor';

const debug = require('cth-debug')(__filename.replace(/^src\//, ''));
const cthGoogGtcTranslatableMirroredClass = 'cth-goog-gtc-translatable-mirrored';

class SearchAndHighlight {
   constructor(opts) {
      this.segments = opts.segments;
      this.otherSegments = opts.otherSegments;
      this.doc = opts.doc;
      this.docName = opts.docName;
      this.otherDoc = opts.otherDoc;
      this.otherDocName = opts.otherDocName;
      this.docLabel = opts.docLabel;
      this.searchFieldId = opts.searchFieldId;
      this.special = opts.special;

      this.transEditorWasOpenBeforeInitiatingSearch = null;
      this.sourceFieldPreviouslyUsedThisSession = null;
      this.cachedSegmentId = null;
   }

   initListeners() {
      const $searchField = $(`#${this.searchFieldId}`);

      $searchField.on('keypress', (event) => {
         if (event.keyCode === 13) {
            window.cth.shouldBeRunning = true;
            if (TransEditor.isOpen()) {
               this.transEditorWasOpenBeforeInitiatingSearch = true;
               this.cachedSegmentId = cth.dom.currentTargetSegment.id;
               TransEditor.close();
            }

            this.highlightMatchingKeyword(event);
         }
      });

      $searchField.on('click', (event) => {
         window.cth.shouldBeRunning = false;

         if ($searchField.val() &&
            this.sourceFieldPreviouslyUsedThisSession
         ) {
            debug.log(`$searchSourceField.val():${$searchField.val()}`);
            this.transEditorWasOpenBeforeInitiatingSearch = false;
            _.defer(() => {
               TransEditor.moveToX($(cth.dom.targetDoc).find(`#${this.cachedSegmentId}`));
            });
         }

         this.sourceFieldPreviouslyUsedThisSession = true;

         $searchField.val('');

         $searchField.css({
            'border-color': '',
            'border-width': ''
         });

         this.removeHighlightingAndNormalizeNodes();

         $(this.doc).find(`.cth-hidden-${this.docName}`).removeClass(`cth-hidden-${this.docName}`);

         $(this.otherDoc).find(`.cth-hidden-${this.docName}`).removeClass(`cth-hidden-${this.docName}`);

         if (this.special) {
            $(this.segments).find('.goog-gtc-translatable').show();
            $(this.segments).find(`.${cthGoogGtcTranslatableMirroredClass}`).remove();

            // Remove any remaining highlighting for source items in "combined" view.
            $(cth.dom.targetDoc).find('.cth-searchHighlight-container-source').contents().unwrap();
            $(cth.dom.targetDoc).find('.cth-searchHighlight-highlight-source').contents().unwrap();
         }
      });
   }

   removeHighlightingAndNormalizeNodes() {
      $(this.doc).find(`.cth-searchHighlight-container-${this.docName}`).contents().unwrap();
      $(this.doc).find(`.cth-searchHighlight-highlight-${this.docName}`).contents().unwrap();

      /*
       * Sometimes source highlighting sneaks its way into the target
       * $(this.doc).find('.cth-searchHighlight-highlight-source').contents().unwrap()
       * Concatenate adjecent text nodes and similar. Node.normalize() is awesome.
       */
      _.forEach(this.segments, (ele) => ele.normalize());
   }

   highlightMatchingKeyword(event) {
      Cursor.showLoadIndication();
      let $$segments;

      if (this.special) {
         _.forEach(cth.dom.sourceSegments, (ele, i, arr) => {
            const clone = $(arr[i]).children().first().clone();
            $(clone).removeClass('goog-gtc-translatable').addClass(cthGoogGtcTranslatableMirroredClass);
            $(arr[i]).append(clone);
         });

         $$segments = $(this.segments).find(`.${cthGoogGtcTranslatableMirroredClass}`);
         $$segments.show();
         $(this.segments).find('.goog-gtc-translatable').hide();
      } else {
         $$segments = $(this.segments).find('.goog-gtc-translatable');
      }

      const className = `cth-searchHighlight-highlight-${this.docName}`;

      this.removeHighlightingAndNormalizeNodes();

      let val = event.target.value;

      /**
       *   If input length is 0, close cth-hidden-${this.docName}
       */
      if (val.length === 0) {
         $(window.cth.dom.sourceDoc).find(`.cth-hidden-${this.docName}`).removeClass(`cth-hidden-${this.docName}`);
         $(window.cth.dom.targetDoc).find(`.cth-hidden-${this.docName}`).removeClass(`cth-hidden-${this.docName}`);
         $(event.target).css({
            'border-color': '',
            'border-width': ''
         });
         return;
      }
      debug.log('The target is: ');
      debug.log(event.target);
      $(event.target).css({
         'border-color': 'orange',
         'border-width': '2px'
      });

      /**
       *  Escape any regex characters
       */
      val = XRegExp.escape(val);

      /**
       * If option is set, normalize diacritics
       */
      if (window.cth.option.normalizeDiacritics === true) {
         val = Diacritics.normalizeDiacritics(val);
      }

      /**
       *
       * Wrap the val for capturing, while ignoring case differences
       */
      const inputKeyword = new RegExp(`(${val})`, 'ig');
      debug.log(val);
      debug.log(inputKeyword);

      replaceSpecialSpacesWithLiteralSpaces();

      /**
       *   Iterate through the doc segments, highlighting any matching text nodes
       *   TODO: Extract out into a separate unit and add unit test for it
       */
      _.forEach($$segments, (ele) => {
         _.forEach($(getTextNodesIn(ele)), (ele) => {
            if (ele.nodeValue.match(inputKeyword)) {
               if (!$(ele.parentNode).hasClass('notranslate')) {
                  const $newSpan = $(ele).wrap(`<span class="cth-searchHighlight-container-${this.docName}"/>`)[0].parentNode;
                  $newSpan.innerHTML = $newSpan.innerHTML.replace(inputKeyword, `<span class="${className}" style="color: red">$1</span>`);
               }
            }
         });
      });

      hideUnhighlighted(this.segments, this.docName, () => {
         Cursor.resetLoadIndication();
      });

      function getTextNodesIn(el) {
         return $(el).find(':not(iframe)').addBack().contents().filter(function () {
            return this.nodeType === 3;
         });
      }

      function replaceSpecialSpacesWithLiteralSpaces() {
         const toFind = 'span.goog-gtc-inchars-highlight.goog-gtc-inchars-space.goog-gtc-highlight';
         const a = $(window.cth.dom.sourceSegments).find(toFind);
         const b = $(window.cth.dom.targetSegments).find(toFind);
         _.forEach(a, (ele) => {
            ele.outerHTML = ' ';
         });
         _.forEach(b, (ele) => {
            ele.outerHTML = ' ';
         });
      }
   }
}

function run() {
   // Then, just show/hide as necessary during keyword filtering, and apply the highlighting to the mirrored segment.

   const source = new SearchAndHighlight({
      "segments": cth.dom.sourceSegments, // TODO: insert sourceSegmentsCopies here? Instead of altering the module internals.
      "otherSegments": cth.dom.targetSegments,
      "doc": cth.dom.sourceDoc,
      "docName": 'source',
      "otherDoc": cth.dom.targetDoc,
      "otherDocName": 'target',
      "searchFieldId": 'cth_searchSourceField',
      "special": true
   });
   source.initListeners();

   const target = new SearchAndHighlight({
      "segments": cth.dom.targetSegments,
      "otherSegments": cth.dom.sourceSegments,
      "doc": cth.dom.targetDoc,
      "docName": 'target',
      "otherDoc": cth.dom.sourceDoc,
      "otherDocName": 'source',
      "searchFieldId": 'cth_searchTargetField',
      "special": false
   });
   target.initListeners();
}

export const KeywordFiltering = { run };