/* global MutationObserver */
import $ from 'jquery'
import _ from 'lodash'
import {_retrieveStatusFromDoc} from '../../2_classes/upper-lib/runCompletionCheck/Completion'

const debug = require('cth-debug')(__filename.replace(/^src\//, ''))

export default function observeForStatusChange (cb) {
   const fileMenuButton = $('.goog-inline-block.goog-imageless-menu-button.gtc-share-menu-button')[0]
   const config = {
      "characterData": true,
      "attributes": true
   }

   const observer = new MutationObserver((muts) => {
      const debouncedWrapperCb = _.debounce(() => {
         if (window.cth.docInfo.docStatusOnLoad !== _retrieveStatusFromDoc()) {
            // Debugger
            return cb()
         }
      }, {
         "leading": false,
         "trailing": true
      }, 50)

      _.forEach(muts, (ele) => {
         debouncedWrapperCb()
         // The new button may spawn
         const spawnedButton = $('.goog-buttonset-default.goog-buttonset-action')
         spawnedButton.on('click', () => {
            debug.log('clicked doc status button')
            _.delay(() => debouncedWrapperCb('click'))
         })
      })

      _.delay(debouncedWrapperCb, 2000)
      _.delay(debouncedWrapperCb, 3000)
      _.delay(debouncedWrapperCb, 4000)
      _.delay(debouncedWrapperCb, 5000)
      _.delay(debouncedWrapperCb, 10000)
   })

   if (fileMenuButton) {
      observer.observe(fileMenuButton, config)
   } else {
      debug.log(`the fileMenuButton doesn't exist!`)
   }
}
