// This wrapper class act as a proxy-wrapper for Browser-only stuff to ease unit-testing. If the detected environment is Node.js, it returns mocks as needed/relevant/requested.

const debug = require('debug')(__filename)
const isNode = typeof window === 'undefined' && typeof global === 'object'

const chromeNamespaceMock = {
   "runtime": {
      "sendMessage"(...args) {

         const msg = 'MOCK of chrome.runtime.sendMessage: '
         debug(msg, ...args)

      },
      "getURL": function getURL(str) {

         return `Omitted this image: ${str}`

      }
   },
   "storage": {
      "local": {
         "get"(settings, cb) {

            cb(null, {})

         },
         "set"() {
         },
         "keys"() {
         }
      }
   }
}

const ChromeProxy =
   isNode || !chrome.runtime || !chrome.storage
      ? chromeNamespaceMock
      : window.chrome

export {ChromeProxy}