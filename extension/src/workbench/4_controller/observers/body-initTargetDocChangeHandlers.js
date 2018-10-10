/* global MutationObserver */
import _ from 'lodash'
import $ from 'jquery'

/**
 *
 * @param {Object[]} handlers - an array of handlers to execute
 */
export default function initTargetDocChangeHandlers (handlers) {
   // Set default values
   window.cth.dom.currentSourceSegment = $(window.cth.dom.sourceDoc).find('#goog-gtc-unit-1')[0]
   window.cth.dom.currentTargetSegment = $(window.cth.dom.targetDoc).find('#goog-gtc-unit-1')[0]

   const targetDocBody = window.cth.dom.targetDoc.body

   const observer = new MutationObserver((mutations) => {
      mutations.forEach((mut) => {
         const nodes = Array.from(mut.addedNodes)

         nodes.forEach((node) => {
            if ($(node).attr('id') === 'transEditor') {
               _.forEach(handlers, (ele) => {
                  _.defer(() => ele(node, mut.target))
               })
            }
         })
      })
   })

   observer.observe(targetDocBody, {
      "childList": true,
      "subtree": true
   })
}
