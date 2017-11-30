import $ from 'jquery'
import _ from 'lodash'
import localforage from 'localforage'

import {notifier} from '../2_classes/notifier'

import {addButtonListeners, loadAnalytics} from './init/analytics'
import {Storage} from '../../model/GeneralStorage'

import {Segment} from '../2_classes/Segment/Segment'

import upper from '../4_controller/upper-index'
import * as body from '../4_controller/body-index'
import * as lower from '../4_controller/lower-index'
import * as other from '../2_classes/other-index'

import {getOptions} from './init/config'
import {getDocInfo, getDomRefs, getModel} from './init/doc-references'
import versionCheck from './init/version-check'
import {injectCssSourceTargetDoc} from './init/injectCssTargetDoc'
// TODO: Implement as function
import './init/onMessage'

const debug = require('cth-debug')(__filename)

require('../../../vendor/jquery-ui-compact/jquery-ui.min')
require('../../../vendor/jquery-ui-compact/jquery-ui.css')
require('bootstrap')
require('../../../css/localize-bootstrap.less')

window.XRegExp = require('xregexp')

loadAnalytics()

/**
 * This is loaded synchronously after being injected into the webpage perhaps? Which could cause issues, so I decided to defer the loading.
 */
setTimeout(() => {
   addButtonListeners()
}, 10000)

window.cth = window.cth || {

   "dom": {},
   "model": {},
   "option": {},
   "dataJSON": {},
   "util": require('./util'),
   "sandbox": require('./sandbox'),
   "browserLanguage": navigator.languages ? navigator.languages[0] : navigator.language,

   "resetAll" () {
      localStorage.clear()
      chrome.storage.local.clear()
      localforage.clear()
   },

   Storage,

   "exceptionHandler": function (e) {
      debug.log(e.stack)
   } || function (e) {
      chrome.runtime.sendMessage({
         "header": 'debug',
         "user": window.cth.docInfo.brukerNavn.toLowerCase(),
         "message": e.stack || e
      }, (res) => {
      })
   }
}

function initWorkbench () {
   versionCheck({
      "popup": false,
      "indicator": true
   })

   getOptions((retrievedOptions) => {
      window.cth.option = retrievedOptions
   })

   window.cth.devMode = localStorage['cth-dev-mode']

   _.delay(() => {
      window.cth.dom = getDomRefs()
      window.cth.docInfo = getDocInfo()
      window.cth.model = getModel()
      window.cth.segmentLabels = require('./labels').default

      // Add the labels according to data in window.cth.label
      Object.keys(window.cth.segmentLabels).forEach((labelKey) => {
         const seg = Segment.create($(cth.dom.targetDoc).find(`#${cth.segmentLabels[labelKey].segmentId}`))
         seg.toggleLabel(cth.segmentLabels[labelKey])
      })

      _initWorkbenchModules()
   }, 1000)

   function _initWorkbenchModules () {
      debug.log('Running initWorkbenchModules()')

      injectCssSourceTargetDoc([
         'css/bothDocs.css',
         'css/localize-bootstrap.css',
         'vendor/jquery-ui-compact/jquery-ui.css',
         'css/jquery-ui-custom.css'
      ])

      upper.init(cth.option)

      body.init(cth.option)

      lower.init()

      other.init(cth.option)
   }
}

export {initWorkbench}
