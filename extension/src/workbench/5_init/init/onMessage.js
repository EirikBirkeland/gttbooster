const debug = require('cth-debug')(__filename)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

   debug.log("request", request)

   if (request === "tcLookup") {

      const res = (() => {

         const source = cth.dom.sourceDoc.getSelection().toString()
         const target = cth.dom.targetDoc.getSelection().toString()
         const document = window.document.getSelection().toString()
         const data = source || target || document

         return data

      })()

      sendResponse({
         "payload": res,
         "language": cth.docInfo.dokumentSprak
      })
      return true

   }
})