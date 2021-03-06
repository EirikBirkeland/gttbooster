import $ from 'jquery';
import _ from 'lodash';
import localforage from 'localforage';

import * as Analytics from './init/analytics';
import { Storage } from '../../model/GeneralStorage';

import { Segment } from '../2_classes/Segment/Segment';

import upper from '../4_controller/upper-index';
import * as body from '../4_controller/body-index';
import * as lower from '../4_controller/lower-index';
import * as other from '../4_controller/emitters/other-index';

import { getOptions } from './init/config';
import { getDocInfo, getDomRefs, getModel } from './init/doc-references';
import versionCheck from './init/version-check';
import { injectCssSourceTargetDoc } from './init/injectCssTargetDoc';
// TODO: Implement as function
import './init/onMessage';

import * as Sentry from '@sentry/browser';
Sentry.init({ dsn: 'https://ef8dacc8c76346b5a1857f4fc49d083d@sentry.io/266142' });

const debug = require('cth-debug')(__filename);

require('../../../vendor/jquery-ui-compact/jquery-ui.min');
require('../../../vendor/jquery-ui-compact/jquery-ui.css');
require('bootstrap');
require('../../../css/localize-bootstrap.less');

window.XRegExp = require('xregexp');

Analytics.load();

/**
 * This is loaded synchronously after being injected into the webpage perhaps? Which could cause issues, so I decided to defer the loading.
 */
setTimeout(() => {
    Analytics.addButtonListeners();
}, 10000);

window.cth = window.cth || {

   "dom": {},
   "model": {},
   "option": {},
   "dataJSON": {},
   "util": require('./util'),
   "sandbox": require('./sandbox'),
   "browserLanguage": navigator.languages ? navigator.languages[0] : navigator.language,

   "resetAll" () {
      localStorage.clear();
      chrome.storage.local.clear();
      localforage.clear();
   },

   Storage,

   "exceptionHandler" (e) {
      debug.log(e.stack);
   }
};

function initWorkbench () {
   versionCheck({
      "popup": false,
      "indicator": true
   });

   getOptions((retrievedOptions) => {
      window.cth.option = retrievedOptions;
   });

   window.cth.devMode = localStorage['cth-dev-mode'];

   _.delay(() => {
      window.cth.dom = getDomRefs();
      window.cth.docInfo = getDocInfo();
      window.cth.model = getModel();
      window.cth.segmentLabels = require('./labels').default;

      // Add any stored labels
      Object.keys(window.cth.segmentLabels).forEach((labelKey) => {
         const seg = Segment.create($(cth.dom.targetDoc).find(`#${cth.segmentLabels[labelKey].segmentId}`));
         seg.toggleLabel(cth.segmentLabels[labelKey]);
      });

      _initWorkbenchModules();
   }, 1000);

   function _initWorkbenchModules () {
      debug.log('Running _initWorkbenchModules()');

      require('../../../css/main.less');
      
      injectCssSourceTargetDoc([
         'css/bothDocs.css',
         'css/localize-bootstrap.css',
         'vendor/jquery-ui-compact/jquery-ui.css',
         'css/jquery-ui-custom.css'
      ]);

      upper.init(cth.option);

      body.init(cth.option);

      lower.init();

      other.init(cth.option);
   }
}

export { initWorkbench };
