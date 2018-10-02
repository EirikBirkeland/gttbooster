/* eslint-env browser, webextensions */

import {Sheet} from '../../../model/qa-sheet-google'
import {notifier} from '../notifier'
import {icons} from '../icons'
import $ from 'jquery'

const debug = require('cth-debug')(__filename)

function changeStatusIndicator (type, msg) {
   const iconColor = (() => {
      switch (type) {
         case 'alert':
            return 'Red'
         case 'success':
            return 'Green'
      }
   })()

   const $loadSheetButton = $('#cth_loadSheetButton')
   $loadSheetButton.tooltip('hide').attr('data-original-title', msg).tooltip('fixTitle')

   $loadSheetButton.find('img').attr('src', icons[`arrowCircle${iconColor}`])
}

export function qaSheet (finalCb) {
   /**
    *  Display red icon on initiation, in case there is an uncaught spreadsheet error
    */
   $('#cth_loadSheetButton').find('img').attr('src', icons.arrowCircleRed)

   const opts = {
      "url": localStorage['cth-spreadsheet-override'] || window.cth.option.spreadsheetURL,
      "sheetname": window.cth.option.sheetName || 'Main',
      onValidationError (msg) {
         if (window.cth.option.displaySpreadsheetNotifications) {
            notifier.info(msg)
         }
         changeStatusIndicator('alert', msg)
         finalCb()
         debug.warn(msg)
      },
      onError (msg) {
         /**
          * My Sheet class is not really supporting custom clickhandlers in a sensible manner, and instead of changing qa-sheet-google.js I decided to add a custom implementation here for now.
          */
         changeStatusIndicator('alert', msg)
         msg += '<br/><a href=\'#\' id="optionsSpreadsheetPageUrl">⇨ Go to options screen ⇦</a>'
         if (window.cth.option.displaySpreadsheetNotifications) {
            notifier.info(msg)
         }

         /**
          *  Attach a click listener so that the link in ${msg} works!
          *  Notez: It may be better to deliver this as a function to the notifier.info function.
          */
         $('#optionsSpreadsheetPageUrl').on('click', () => {
            chrome.runtime.sendMessage({
               "header": 'openOptionsPage',
               "suffix": '#menu6'
            })
         })
         finalCb()
         debug.warn(msg)
      }
   }

   const qaSheet = new Sheet(opts)

   qaSheet.fetch(function (err, res) {
      if (err) {
         debug.error(qaSheet.httpErrors[err])
      }

      if (res) {
         changeStatusIndicator('success', 'Sheet loaded and passed validation. Your individual tests will now be included in QA.')
      }

      window.cth.dataJSON = res
   })
}
