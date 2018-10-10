import $ from 'jquery'
import _ from 'lodash'

const debug = require('cth-debug')(__filename)

export default function observeForInsertedIframe (cb) {
   const obs = new MutationObserver((muts) => {
      debug.warn(muts)
      _.forEach(muts, (ele) => {
         if (ele.addedNodes && Boolean(ele.addedNodes.length)) {
            debug.warn(`returning CB with${ele.addedNodes}`)
            cb(_.filter(ele.addedNodes, (ele) => $(ele).hasClass('.gtc-revision-frame.gtc-document-frame')))
         }
      })
   })

   obs.observe($('.gtc-translation')[0], {"childList": true})
}