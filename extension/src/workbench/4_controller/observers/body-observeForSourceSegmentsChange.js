/* global MutationObserver */

function observeForSourceSegmentsChange (cb) {
   const observer = new MutationObserver((mutations) => {
      mutations.forEach((mut) => {
         cb(mut)
      })
   })

   const target = window.cth.dom.sourceDoc
   const config = {
      "attributes": false,
      "subtree": true,
      "childList": true,
      "characterData": true
   }

   observer.observe(target, config)
}
