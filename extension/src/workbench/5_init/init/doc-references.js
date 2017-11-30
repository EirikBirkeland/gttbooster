/**
 * Sticks docInfo and dom in their established positions.
 * @param cb
 */


import $ from 'jquery'
import _ from 'lodash'
import {SourceDocument, TargetDocument} from '../../2_classes/Document/Document'
import {Segment} from '../../2_classes/Segment/Segment'
import {_retrieveStatusFromDoc} from '../../2_classes/upper-lib/runCompletionCheck/Completion'

// TODO: Convert as many doc references as possible to getters to avoid the possibility of undefined references

const debug = require('cth-debug')(__filename.replace(/^src\//, ''))

export function getDomRefs () {
   const $iframe = $('#transarea').find('iframe.gtc-document-frame.jfk-scrollbar')
   const sourceDocClone = $iframe[0].contentDocument.cloneNode(true)
   const sourceDoc = $iframe[0].contentDocument
   const targetDoc = $iframe[1].contentDocument
   const bothDocs = $iframe.contents()

   const obj = {
      "existingToolbar": $('.gtc-toolbar')[0],
      "wbmenu": $('#wbmenu').get(0),
      "wbheader": $('#wbheader').get(0),
      "gtcGaiabar": $('#gtc-gaiabar').get(0),
      "gtcTopBar": $('#gtc-top-bar').get(0),
      "gtcSourceDocHeader": $('.gtc-document-header')[0],
      "gtcTargetDocHeader": $('.gtc-document-header')[1],
      "gtcQuickbarTipParent": $('#gtc-quickbar-tip-parent')[0],
      sourceDoc,
      targetDoc,
      "anyDoc": sourceDoc,
      bothDocs,
      sourceDocClone,
      // With these getters I am assured to get the complete list if available (it may take a while for the DOM to fully init with a giant document, probably because of async XHR being run by Google even after the page is 'ready').
      get "sourceSegments" () {
         return $(this.sourceDoc).find('.goog-gtc-unit')
      },
      get "copiedSourceSegments" () {
         return $(this.sourceDoc).find('.cth-goog-gtc-unit-copy')
      },
      get "targetSegments" () {
         return $(this.targetDoc).find('.goog-gtc-unit')
      },
      "docTitleBar": $('#doctitlebar')[0],
      "targetStripped": [], // TODO: phase out targetStripped
      "sourceStripped": [], // TODO: phase out sourceStripped
      get "transEditor" () {
         return $(targetDoc).find('#transEditor')[0]
      }
   }

   validate(obj)
   return obj
}

export function getDocInfo () {
   const docName = $('.gtc-docname')[0]

   const userName = (() => {
      const email = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i

      const $emailAccount = $('.gbps2')
      const $gbgs4 = $('#gbgs4')

      if ($emailAccount &&
         $emailAccount[0] &&
         email.test($emailAccount[0].innerHTML)) {
         return $emailAccount[0].innerHTML.match(email)[0]
      }
      if ($gbgs4 && $gbgs4[0] && email.test($gbgs4[0].innerHTML)) {
         return $gbgs4[0].innerHTML.match(email)[0]
      }
      return null
   })()

   const getConfig = function () {
      const scriptArray = $('script')
      const configScript = _.find(scriptArray, (ele) => ele.innerHTML.match(/var config = {}/))
      const str = configScript.innerHTML.replace(/gtc.app.Workbench.init\(config\);/, "return config")

      /* eslint-disable */
      return eval(str)
      /* eslint-enable */
   }

   const obj = {
      "brukerNavn": userName,
      "dokNavn": docName,
      "produktNavn": docName.innerHTML.replace(/\w{2}_([^_]+).*/, '$1'),
      "dokumentSprak": docName.innerHTML.replace(/(^.*?)_.*/, '$1'),
      "prosjektNummer": docName.innerHTML.replace(/^.*?_.*?_(\d{6}).*/, '$1'),
      "antallOrd": parseInt($('.gtc-workbench-words')[0].textContent, 10),
      "fullforingsGrad": $('.gtc-workbench-percent')[0].innerHTML,
      "docStatusOnLoad": _retrieveStatusFromDoc(),
      // TODO: Is this a safe use of eval ? Maybe I could extract the info and create an obj manually.
      get "gtcConfig" () {
         return getConfig()
      },
      get "sharedWith" () {
         const conf = getConfig()
         return conf.acl.map((ele) => ele.email)
      }
   }
   return obj
}

export function getModel () {
   return {
      SourceDocument,
      TargetDocument,
      Segment,
      "sourceSegments": Array.from(cth.dom.sourceSegments).map((ele) => Segment.create(ele)),
      "targetSegments": Array.from(cth.dom.targetSegments).map((ele) => Segment.create(ele))
   }
}

// Validate - ensure that all DOM nodes were found
function validate (obj) {
   _.forOwn(obj, (value, key) => {
      if (obj[key] === null || obj[key] === undefined) {
         // Use console.warn here instead of debug, because any error here could require developmental intervention.
         const str = `Info: keyname ${key} has the value ${value}`
         debug.warn(str)
         // Dev(() => alert(str))
      }
   })
}
