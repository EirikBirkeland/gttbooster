/* global cth */
import _ from 'lodash';
import { convertPlaceholders } from './convertPlaceholders';
import consistencyCheck from '../../2_classes/Qa/checks/consistencyCheck';
import { SourceDocument, TargetDocument } from '../../2_classes/Document/Document';
import filterSegmentTypes from './filterSegmentTypes';

const $ = typeof window === 'undefined' ? require('cheerio') : require('jquery');

const debug = require('cth-debug')(__filename.replace(/^src\//, ''));

/*
 * INIT LABELS
 * 1. get labels from localStorage
 * 2. init them all by running toggleLabel on relevant segments
 */

// TODO: Make Segment, and then SourceSegment and TargetSegment. TargetSegment will have a few extra methods.
const Segment = {
   create (googGtcUnit) {
      const newObj = Object.create(this);
      newObj.init(googGtcUnit);
      newObj.isBasedOn = 'Segment';
      return newObj;
   },

   init (googGtcUnit) {
      this.googGtcUnit = googGtcUnit;
      this.translatable = $(googGtcUnit).find('.goog-gtc-translatable')[0];
      this.id = $(googGtcUnit).attr('id');
      this._isExcluded = false;
      this.cache = { "index": null };
   },

   toggleLabel ({ bsStyle, id }) {
      const $thing = $(this.googGtcUnit).find(`.label-${bsStyle}`);
      if ($thing.length > 0) {
         $thing.parent().remove();
         return delete window.cth.segmentLabels[this.id + bsStyle];
      }

      window.cth.segmentLabels[this.id + bsStyle] = {
         "segmentId": this.id,
         bsStyle,
         "addDate": Date.now()
      };

      const $wrapper = $('<span/>').addClass('bootstrap-wrapper').css({ "margin": '0.5em' }).attr('id', id);

      const $content = $('<span/>').html(`${bsStyle} <span class='cth-X'></span>`).addClass(`label-${bsStyle} label`);

      $content.find('.cth-X').click(() => {
         $wrapper.remove();
      }).css({ "cursor": 'pointer' });

      const $combined = $wrapper.append($content);
      $(this.googGtcUnit).append($combined);
   },

   toggleLabels ({ bsStyle, id }) {
      this.toggleLabel({
         bsStyle,
         id
      });
      const indices = this._duplicateIndices;
      if (indices.length > 0) {
         _.forEach(indices, (index) => {
            const dupSeg = this.create($(window.cth.dom.targetDoc).find(`#goog-gtc-unit-${index + 1}`)[0]);
            dupSeg.toggleLabel({
               bsStyle,
               id
            });
         });
      }
   },

   get "index" () {
      if (this.cache.index) {
         return this.cache.index;
      }
      const sourceId = Array.from($(cth.dom.sourceDocClone).find('.goog-gtc-unit')).indexOf(this.googGtcUnit);
      const targetId = Array.from(cth.dom.targetSegments).indexOf(this.googGtcUnit);

      const theIndex = sourceId !== -1 ? sourceId : targetId;
      this.cache.index = theIndex;
      return theIndex;
   },

   get "inner" () {
      return $(this.translatable).html();
   },

   get "innerWithConvertedPlaceholders" () {
      return convertPlaceholders($(this.getSanitizedNodeCopy()));
   },

   getSanitizedNodeCopy () {
      // Make a copy to avoid editing original
      const copy = $(this.googGtcUnit).clone();

      $(copy).children().find('*').each((i, ele) => {
         const toUnwrap = [
            'cth-searchHighlight-highlight-source',
            'cth-searchHighlight-container-source',
            'cth-searchHighlight-highlight-target',
            'cth-searchHighlight-container-target',
            'cth_redWiggle'
         ];

         toUnwrap.forEach((x) => {
            if ($(ele).hasClass(x)) {
               debug.log('unwrapping');
               $(ele).contents().unwrap();
            }
         });
      });
      return copy;
   },

   get "segmentType" () {
      return filterSegmentTypes($(this.translatable).attr('class').split(/\s+/));
   },

   get "description" () {
      const messageblock = $(this.googGtcUnit).closest('.goog-gtt-messageblock');
      const messageHeader = messageblock.find('.messageHeader');
      const notranslate = messageHeader.find('.notranslate');
      if (notranslate.length > 0) {
         return $(notranslate[1]).html();
      }
      return null;
   },

   get "isPartOfList" () {
      return Boolean($(this.translatable).closest('ul, ol').length);
   },

   get "isInsideAListItem" () {
      return Boolean($(this.googGtcUnit).closest('li').length);
   },

   get "hasInconsistencies" () {
      return this.inconsistentSegmentIds ? this.inconsistentSegmentIds.length : null;
   },

   get "hasDuplicates" () {
      return Boolean(this._duplicateIndices.length);
   },

   get "numDuplicates" () {
      return this._duplicateIndices.length;
   },

   copyContentsToDuplicates () {
      if (this._duplicateIndices.length > 0) {
         _.forEach(this._duplicateIndices, (ele) => {
            cth.dom.targetSegments[ele].firstChild.innerHTML = this.translatable.innerHTML;
         });
      }
   },

   get "_duplicateIndices" () {
      debug.log('The segment id being tested will be omitted from this array (_duplicateIndices)');

      const sourceStrippedArr = (() => {
         const doc = SourceDocument;
         return doc.getStrippedArr();
      })();

      const str = sourceStrippedArr[this.index];

      const res = _.chain(sourceStrippedArr).map((ele, i) => ele === str ? i : null).filter((ele) => ele !== null && ele !== undefined).value();

      /**
       * Shockingly, the following is not standard JS. The same thing can be achieved with "splice", but mutating sucks.
       * @param array
       * @param value
       */
      function returnExcept (array, value) {
         const index = array.indexOf(value);
         return array.slice(0, index).concat(array.slice(index + 1));
      }

      return returnExcept(res, this.index);
   },

   get "inconsistentSegmentIds" () {
      const sourceStrippedArr = (() => {
         const doc = SourceDocument;
         return doc.getStrippedArr();
      })();

      const targetStrippedArr = (() => {
         const doc = TargetDocument;
         return doc.getStrippedArr();
      })();

      debug.log('sourceStrippedArr: ', sourceStrippedArr);
      debug.log('targetStrippedArr: ', targetStrippedArr);

      const num = this.id.replace(/.*?([0-9]+).*/, '$1');
      const check = consistencyCheck.init(parseInt(num, 10) - 1, sourceStrippedArr, targetStrippedArr);
      const res = check.getResults();
      debug.log(res);
      return res.inconsistentIds;
   },

   get "isUnitAttribute" () {
      return Boolean($(this.googGtcUnit).attr('id').match(/goog-gtc-unit-attr-[0-9]+/));
   },

   get "isUrlEntity" () {
      return Boolean($(this.translatable).html().match(/^https?\/\/\S+$/));
   },

   hasExtraneousPlaceholders () {
      // Info: Normal placeholders should be wrapped in a span with the class notranslate.
      const arr = Array.from($(this.translatable).contents()).filter((ele) => ele.textContent.match(/{[0-9]+}/));
      return Boolean(arr.every((ele) => !$(ele).parent().hasClass('notranslate')));
   }
};
// Prevent object consumer from adding new properties
Object.preventExtensions(Segment);

export { Segment };
