/* global chrome */
import pify from 'pify'
import showPurchaseScreen from './auth/showPurchaseScreen'
import {notifier} from '../../2_classes/notifier'
import $ from 'jquery'
import _ from 'lodash'
import millisecond from 'millisecond'

require('cth-prototype')

const debug = require('cth-debug')(__filename)

const GTT_BOOSTER_STORE_URL = require('@eirikbirkeland/ob-config').GTT_BOOSTER_STORE_URL

/**
 * TODO: Add fancy popups in most places in UI, including auth.
 */

/**
 * @param res {Object}
 * @param res.user {string}
 * @param res.type {string}
 * @param res.daysLeft {string|number}
 */
function addAccountStatus(res) {

   checkProperties(res, [
      'user',
      'type',
      'daysLeft'
   ])

   if (res) {

      const string = res.type !== 'Expired'
         ? `${Math.round(res.daysLeft)} days left of ${res.type}`
         : `Click here to proceed to the store`

      $('#cth-corner-indicator').append(`
            <div>
              <a href="${GTT_BOOSTER_STORE_URL}" target="_blank">
                ${res.type.upperFirst()}
              </a>
            </div>`).attr({"title": string})

   } else {

      debug.log('The GTT Booster server may be unavailable due to maintenance. Please be patient.')

   }

   /**
    * Worth turning this into a Object.prototype module later perhaps...?
    * @param res {Object}
    * @param properties {string[]} - array of key names to check
    */
   function checkProperties(res, properties) {

      properties.forEach((ele) => {

         if (!res.hasOwnProperty(ele)) {

            return debug.log(`res is missing property res${ele}`)

         }

      })

   }

}

/**
 *
 * @param {function} authCallback
 */
function authorize(authCallback) {

   const alwaysValidUsers = [
      '003-da_0021@003vendor.com',
      '003-da_0026@003vendor.com',
      '003-da_0029@003vendor.com',
      '003-da_0037@003vendor.com',
      '003-sv_0010@003vendor.com',
      '003-sv_0033@003vendor.com',
      '003-sv_0034@003vendor.com',
      '003-fi_0007@003vendor.com',
      '003-fi_0015@003vendor.com'
   ]
   const raul6Months = [ // Expires a little after Xmas 2017
      '003-eu_0001@003vendor.com',
      '015-eu_0004@015vendor.com',
      '004-ca_0100@004vendor.com',
      '003-es_0083@003vendor.com'
   ]

   const tatyana12Months = [ // Expires around Xmas 2017
      '003-iw_0038@003vendor.com',
      '003-iw_0025@003vendor.com',
      '003-ar_0036@003vendor.com',
      '015-iw_0037@015vendor.com',
      '003-iw_0032@003vendor.com',
      '003-iw_0014@003vendor.com',
      '001-iw_01210485@001vendor.com',
      '001-iw_00710485@001vendor.com'
   ]

   const allUsers = alwaysValidUsers.concat(raul6Months).concat(tatyana12Months)

   const username = window.cth.docInfo.brukerNavn.toLowerCase()

   if (allUsers.includes(username)) {

      return authCallback()

   }

   let validResultReceived = false
   let resultReceived = false

   debug.log('Authorizing ...')

   chrome.runtime.sendMessage({
      "header": 'auth',
      "user": username
   }, (res) => {

      debug.log('User validation response received from background!')

      resultReceived = true

      if (res) {

         validResultReceived = true
         addAccountStatus(res)
         debug.log(res)

         if (res.valid !== true) {

            return showPurchaseScreen()

         }

         localStorage['cth-last-logged-in'] = new Date()

         return authCallback()

      }
      // If no POST result, authorize anyway
      debug.log('No valid res')
      if (localStorage['cth-last-logged-in']) {

         const str = new Date(localStorage['cth-last-logged-in'])
         // If stored time is less than 3 days, authorize.
         if (new Date() - str < millisecond('3 days')) {

            return authCallback()

         }

      } else {

         localStorage['cth-last-logged-in'] = new Date()
         return authCallback()

      }

   })

   _.delay(() => {

      if (!validResultReceived) {

         notifier.info('Negotiating with server...')

      }

   }, 3000)

   /**
    *  A delay override in case the server is slow to respond.
    */
   _.delay(() => {

      if (!resultReceived) {

         return authCallback()

      }

   }, 7000)

}

export default pify(authorize)
