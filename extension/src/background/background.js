/* global _gaq chrome */
import $ from 'jquery'
import {doneHandler, errorHandler, getChromeVersion, getExtensionVersion} from './background/helpers'
import putGlossariesInWindow from './background/putGlossariesInWindow'
import {loadAnalytics} from '../workbench/5_init/init/analytics'
import './contextMenu'
import checkIfGlossaryWindowIsOpen from './background/putGlossariesInWindow/checkIfGlossaryWindowIsOpen'
// TODO: Implement for some statistics purpose ...
import {handleTcRequest} from './handleTcRequest'

const debug = require('cth-debug')(__filename.replace(/^src\//, ''))
window.Storage = require('../model/GeneralStorage').Storage

loadAnalytics()

// Update extension when update is available, by calling for the background page to reload
chrome.runtime.onUpdateAvailable.addListener(() => {
   chrome.runtime.reload()
})

const API_DOMAIN = require('../../cth_modules/cth-config/index').API_URL

const LATEST_VERSION_FILE = 'latest.json'

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {

   debug.log('Req with content', req, ' received from content page')

   const common = {
      "user": req.user
   }

   switch (req.header) {
      case 'click':
         debug.log('Sending GA ...')
         _gaq.push([
            '_trackEvent',
            req.obj.eventCategory,
            req.obj.eventAction
         ])
         return true

      case 'glossaries':
         debug.log('Putting glossaries in window ...')
         putGlossariesInWindow(req.body)
         return true

      case 'glossaryWindowExists':
         debug.log('Checking for existence of glossaries window')
         sendResponse(Boolean(checkIfGlossaryWindowIsOpen()))
         return true

      case 'spellcheck':
         debug.log('spellcheck')
         $.ajax({
            "url": `${API_DOMAIN}/spell2`,
            "type": 'POST',
            "dataType": 'json',
            "data": Object.assign(common, {
               "text": req.text,
               "language": req.language
            })
         }).done((res) => doneHandler(res, sendResponse)).fail(() => errorHandler(sendResponse))
         return true

      case 'openOptionsPage':
         debug.log('openOptionsPage')
         if (req.suffix) {
            chrome.tabs.create({"url": chrome.runtime.getURL(`html/options.html${req.suffix}`)})
         } else { // Canonical way
            chrome.runtime.openOptionsPage()
         }
         return true

      case 'storage':
         debug.log('storage')
         switch (req.type) {
            case 'get':
               Storage.get({"storeName": req.name}, req.key, sendResponse)
               return true
            case 'set':
               Storage.set({"storeName": req.name}, req.key, req.value, sendResponse)
               return true
            case 'keys':
               Storage.keys({"storeName": req.name}, sendResponse)
               return true
            case 'remove':
               Storage.remove({"storeName": req.name}, req.key, sendResponse)
         }
         return true
      case 'tcLookup':
         handleTcRequest()

   }

})
