/* global cth */
import $ from 'jquery';
import _ from 'lodash';

const debug = require('cth-debug')(__filename.replace(/^src\//, ''));

// Plain version
/**
 *
 * @param sourceDoc {Node} - body of the source doc
 * @param targetSegments {NodeList} - translation units
 */
export function replaceSegmentTypeWithSource (segmentType, sourceDoc, targetSegments) {
   const targetSegmentsWithMt = Array.from(targetSegments).filter((ele) => ele.firstChild.classList.contains(segmentType));

   debug.log(targetSegmentsWithMt);

   const correspondingSourceSegments = (() => _.map(targetSegmentsWithMt, (ele) => $(sourceDoc).find(`#${ele.id}`)[0]).filter((ele) => Boolean(ele)))();

   debug.log(correspondingSourceSegments);

   _.forEach(targetSegmentsWithMt, (ele, i) => {
      debug.log(targetSegmentsWithMt[i].firstChild.innerHTML);
      debug.log(correspondingSourceSegments[i].firstChild.innerHTML);
      targetSegmentsWithMt[i].firstChild.innerHTML = correspondingSourceSegments[i].firstChild.innerHTML;
   });

   // Handle the open translation editor separately
   const transEditor = $(cth.dom.targetDoc).find('#transEditor');
   const nearestSegment = $(cth.dom.targetDoc).find('#transEditor').closest('.goog-gtc-unit');
   const nearestSegmentText = nearestSegment.children().first().html();

   // Replace the transEditor text as well
   transEditor.html(nearestSegmentText);

   // Get rid of the glossary highlights
   transEditor.find('.goog-gtc-glossary-highlight').contents().unwrap();
}

function checkInterface (Segment) {
   if (!Segment.id) {
      debug.log('id property missing');
   }
}

/**
 * @param sourceSegments - Segment[]
 * @param targetSegments - Segment[]
 * @returns undefined
 */
function futureReplaceMtWithSource (sourceSegments, targetSegments) {
   const targetSegmentsWithMt = targetSegments.filter((ele) => ele.segmentType === 'mt');
   const correspondingSourceSegments = (() => {
      _.forEach(targetSegmentsWithMt, (ele, i) => sourceSegments[i].id === ele.id);
   })();

   _.forEach(targetSegmentsWithMt, (ele, i) => {
      targetSegmentsWithMt[i].html = correspondingSourceSegments[i].html;
   });
}
