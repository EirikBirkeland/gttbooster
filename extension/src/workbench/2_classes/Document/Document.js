/* global cth */

import _ from 'lodash';
import { Segment } from '../Segment/Segment';
import { completeAssign } from '../../../model/completeAssign';

const debug = require('cth-debug')(__filename);

const $ = typeof window === 'undefined' ? require('cheerio') : require('jquery');

const BaseDocument = {
   hasMessageBlocks () {
      return Boolean($(this.node).find('.goog-gtt-messageblock').length);
   },

   isShort () {
      return Boolean($(this.node).find('.goog-gtc-unit').length) < 100;
   },

   isLong () {
      return Boolean($(this.node).find('.goog-gtc-unit').length) > 100;
   },

   getStrippedArr () {
      return _.map($(this.node).find('.goog-gtc-unit'), ($_) => {
         const item = Segment.create($_);
         return item.innerWithConvertedPlaceholders;
      });
   }
};

// SourceDocument is nothing special
const SourceDocument = completeAssign({
   get "node" () {
      return typeof cth !== 'undefined' ? cth.dom.sourceDoc : null;
   },
   set "node" (val) {
      debug.warn('An attempt was made to change `node` property. Not permitted.');
   }
}, BaseDocument);

// TargetDocument2 is a static wrapper object - no init needed, a getter is used.
const TargetDocument = completeAssign({
   get "node" () {
      return typeof cth !== 'undefined' ? cth.dom.targetDoc : null;
   },
   set "node" (val) {
      debug.warn('An attempt was made to change `node` property. Not permitted.');
   }
}, BaseDocument);

TargetDocument.hasIceSegments = function hasIceSegments () {
   return Boolean($(this.node).find('.goog-gtc-from-tm-score-100-ice').length);
};

export { SourceDocument, TargetDocument };
