import _ from 'lodash'
import $ from 'jquery'
import Mutant from 'cth-mutant'

const glossaryChangeObserver = Object.create(Mutant)

glossaryChangeObserver.init = function (finalCb) {

   glossaryChangeObserver.observe({
      "target": $('.gtc-tools-autosearch').find('.gtc-tool-right-floating')[0],
      "config": {
         "childList": true,
         "subtree": true
      },
      callback(muts) {

         // Console.log(muts)
         if (_.some(muts, (mut) => _.some(mut.addedNodes, (el) => $(el).hasClass('gtc-glossary-content-holder')))) {

            finalCb()

         }

      }
   })

}

export {glossaryChangeObserver}
