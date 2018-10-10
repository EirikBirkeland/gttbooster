import _ from 'lodash'
import $ from 'jquery'
import Mutant from 'cth-mutant'

const tmChangeObserver = Object.create(Mutant)

tmChangeObserver.init = function (finalCb) {
   tmChangeObserver.observe({
      "target": $('.gtc-tools-autosearch').find('.gtc-tool-left-floating')[0],
      "config": {
         "childList": true,
         "subtree": true
      },
      callback (muts) {
         if (_.some(muts, (mut) => _.some(mut.addedNodes, (addedNode) => $(addedNode).hasClass('gtc-tm-suggestion-holder')))) {
            finalCb()
         } else if ($('.gtc-tools-autosearch').find('.gtc-tool-content').html().match(/No previous translations available/)) {
            finalCb()
         }
      }
   })
}

export {tmChangeObserver}
