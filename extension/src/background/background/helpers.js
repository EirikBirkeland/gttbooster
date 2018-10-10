/* global chrome */

const debug = require('cth-debug')(__filename)

function getChromeVersion () {
   const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)

   return raw ? parseInt(raw[2], 10) : false
}

function getExtensionVersion () {
   return chrome.runtime.getManifest().version
}

function doneHandler (res, sendResponse) {
   debug.warn('Sending response to content page...')
   debug.log(res)
   sendResponse(res)
}

function errorHandler (error, sendResponse) {
   debug.log('Error was handled ...')
   debug.log(error)
   sendResponse(null)
}

export {getChromeVersion, getExtensionVersion, errorHandler, doneHandler}
