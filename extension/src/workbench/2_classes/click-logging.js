/* eslint-env browser, webextensions */
const debug = require('cth-debug')(__filename)
const Storage = require('../../model/GeneralStorage')
const dateFormat = require('date-format')

/**
 *  @returns {string}
 */
function getDate () {
   return dateFormat.asString('DD/MM/YYYY', new Date())
}

// Attach additional listeners for reporting statistics. Optimally, the API would handle both Google Analytics and my own server. Oh and might wish to try Google's Firebase!!! So, the API should be sufficiently generic so that it can changed later without changing much in the actual implementation.

/**
 *
 * @param {Object} opts - any options
 */
export default function listenForClick (opts) {
   const clickStatsName = 'cth-click-stats'
   const theId = this.id
   if (!theId) {
      return debug.log('No valid ID found.')
   }

   // Store clicks locally, incrementally (and later send results once a day to server)
   const stored = localStorage[clickStatsName]
      ? JSON.parse(localStorage[clickStatsName])
      : {}

   if (stored.date && stored.date !== getDate()) {
      localStorage.removeItem(clickStatsName)
      const stored = {}
      stored.date = getDate()
      stored[theId] = 1
      localStorage[clickStatsName] = JSON.stringify(stored)

      chrome.runtime.sendMessage({
         "header": 'clickReport',
         "body": stored,
         "user": window.cth.docInfo.brukerNavn
      }, (res) => {
         debug.log(res)
      })
   } else {
      if (!stored[theId]) {
         stored[theId] = 1
      } else {
         stored[theId] += 1
      }
      stored.date = getDate()
      localStorage[clickStatsName] = JSON.stringify(stored)
   }

   // 2. do analytics stuff .. just access the "ga" object if present?
   if (window.ga) {
      window.ga('send', 'event', theId)
   } else {
      debug.log('Google Analytics / window.ga does not exist.')
   }
}