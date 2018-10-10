/* eslint-env browser, webextensions */
import $ from 'jquery'
import sweetalert from 'sweetalert'
import {ChromeProxy} from '../../../model/ChromeProxy'

const debug = require('cth-debug')(__filename)

const downloadURL = 'https://chrome.google.com/webstore/detail/gtt-enhancements-1568/pjankaakojbendjaejlcnpgeldmfpjed'
const userVersion = ChromeProxy.runtime.getManifest().version
require('cth-prototype')

const versionCheck = function (opts) {
   const {popup, indicator} = opts
   let needUpdate

   chrome.runtime.sendMessage({"header": 'latest version'}, (response) => {
      if (!response) {
         return
      }

      debug.log(response.version)
      debug.log(userVersion)

      if (response.version > userVersion) {
         needUpdate = true

         if (popup) {
            popupAlert(response)
         }
      }

      if (indicator) {
         addIndicator(response, needUpdate)
      }

      return {
         userVersion,
         "latestVersion": response.version
      }
   })
}

function addIndicator (response, needUpdate) {
   const title = response.version > userVersion
      ? `Your version is ${userVersion}, and the latest is ${response.version}`
      : 'Your version is up to date'

   const $versionIndicator = $('<div/>').attr({"id": 'cth-corner-indicator'}).css({
      "top": '0',
      "right": '0',
      "position": 'absolute',
      'z-index': '1000',
      "background": '#f5f5f5'
   }).html(`<span title="${title}">
                   <a style="font-size: 14px; color:${needUpdate ? 'orange' : 'green'}" href="${downloadURL}" target="_blank">
                       ${userVersion}
                   </a>
               </span>`.clean())

   $('#wbheader').prepend($versionIndicator)
}

function popupAlert (response) {
   sweetalert({
      "title": 'Open download page in new tab?',
      "text": `You do not have the latest version of GTT Booster, ${response.version}. Click OK to proceed to the download page. Thank you for your patience.`,
      "type": 'warning',
      "showCancelButton": true
   }, () => {
      // Redirect the user
      window.open(downloadURL)
   })
}

export default versionCheck
