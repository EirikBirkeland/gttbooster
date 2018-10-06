/* global MutationObserver */
import $ from 'jquery';
import _ from 'lodash';

/**
 * Created by Eirik on 09.08.2017.
 */
export default function observeForTransEditor (callback) {
   // Set default values
   window.cth.dom.currentSourceSegment = $(window.cth.dom.sourceDoc).find('#goog-gtc-unit-1')[0];
   window.cth.dom.currentTargetSegment = $(window.cth.dom.targetDoc).find('#goog-gtc-unit-1')[0];

   const targetDocBody = window.cth.dom.targetDoc.body;

   const observer = new MutationObserver((mutations) => {
      mutations.forEach((mut) => {
         const nodes = Array.from(mut.addedNodes);

         nodes.forEach((node) => {
            const classes = [
               'gtc-trans-inline-cont',
               'goog-inline-block'
            ];
            if ($(node).hasClass(classes[0]) &&
               $(node).hasClass(classes[1])) {
               _.defer(() => callback(node, mut.target));
            }
         });
      });
   });

   observer.observe(targetDocBody, {
      "childList": true,
      "subtree": true
   });
}
