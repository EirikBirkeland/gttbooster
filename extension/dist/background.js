webpackJsonp([2],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.handleTcRequest = handleTcRequest;

var _escapeGoat = __webpack_require__(148);

var _escapeGoat2 = _interopRequireDefault(_escapeGoat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = __webpack_require__(1)(__filename);

function handleTcRequest(info, tab) {
   debug.log('item ' + info.menuItemId + ' was clicked');
   debug.log('info: ' + JSON.stringify(info, 0, 3));
   debug.log('tab: ' + JSON.stringify(tab, 0, 3));

   chrome.tabs.sendMessage(tab.id, "tcLookup", function (res) {
      debug.warn(res);
      var abc = 'https://www.google.com/transconsole/externaltc/btviewer/searchresult?SearchText=' + _escapeGoat2.default.escape(res.payload) + '&SearchField=search_field_src&SearchType=search_type_token_and_phrase&ProductSelect=&LanguagesSelected=' + res.language + '&TranslationFilterStatus=translated&TranslationFilterAnyOrAll=any&TranslationFilterStage=LEVERAGED&ShowTranslationStage=showTranslationStage&CreatedAfter=&CreatedBefore=&ResourcesFilter=&IncludeObsolete=obsolete';
      window.open(abc);
   });
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/background/handleTcRequest.js"))

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = _;

/***/ }),

/***/ 485:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _helpers = __webpack_require__(486);

var _putGlossariesInWindow = __webpack_require__(487);

var _putGlossariesInWindow2 = _interopRequireDefault(_putGlossariesInWindow);

var _getFingerprint = __webpack_require__(492);

var _getFingerprint2 = _interopRequireDefault(_getFingerprint);

var _analytics = __webpack_require__(118);

__webpack_require__(493);

var _checkIfGlossaryWindowIsOpen = __webpack_require__(494);

var _checkIfGlossaryWindowIsOpen2 = _interopRequireDefault(_checkIfGlossaryWindowIsOpen);

var _systemInfo = __webpack_require__(495);

var _handleTcRequest = __webpack_require__(189);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: Implement for some statistics purpose ...
var debug = __webpack_require__(1)(__filename.replace(/^src\//, '')); /* global _gaq chrome */

window.Storage = __webpack_require__(15).Storage;

(0, _analytics.loadAnalytics)();

(0, _systemInfo.getMemInfo)(function (res) {

   debug.log(res);
});
(0, _systemInfo.getCpuInfo)(function (res) {

   debug.log(res);
});

var fingerprint = void 0;
(0, _getFingerprint2.default)(function (res) {

   fingerprint = res;
});

// Update extension when update is available, by calling for the background page to reload
chrome.runtime.onUpdateAvailable.addListener(function () {

   chrome.runtime.reload();
});

var API_DOMAIN = __webpack_require__(104).API_URL;

var LATEST_VERSION_FILE = 'latest.json';

chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {

   debug.log('Req with content', req, ' received from content page');

   var common = {
      "extensionVersion": (0, _helpers.getExtensionVersion)(),
      "chromeVersion": (0, _helpers.getChromeVersion)(),
      "user": req.user,
      fingerprint: fingerprint
   };

   switch (req.header) {

      case 'click':
         debug.log('Sending GA ...');
         _gaq.push(['_trackEvent', req.obj.eventCategory, req.obj.eventAction]);
         return true;
      case 'glossaries':
         debug.log('Putting glossaries in window ...');
         (0, _putGlossariesInWindow2.default)(req.body);
         return true;
      case 'glossaryWindowExists':
         debug.log('Checking for existence of glossaries window');
         sendResponse(Boolean((0, _checkIfGlossaryWindowIsOpen2.default)()));
         return true;
      case 'latest version':
         debug.log('Sending $.get request');

         _jquery2.default.get(API_DOMAIN + '/' + LATEST_VERSION_FILE, function (data) {

            sendResponse(data);
            debug.log('Succeeded in checking latest.json on server');
         }).done(function (res) {
            return (0, _helpers.doneHandler)(res, sendResponse);
         }).fail(function (error) {
            return (0, _helpers.errorHandler)(error, sendResponse);
         });
         return true;

      case 'auth':
         debug.log('Authorizing ...');
         _jquery2.default.ajax({
            "url": API_DOMAIN + '/auth3',
            "type": 'POST',
            "dataType": 'json',
            "data": Object.assign(common, {})
         }).done(function (res) {
            return (0, _helpers.doneHandler)(res, sendResponse);
         }).fail(function (error) {
            return (0, _helpers.errorHandler)(error, sendResponse);
         });
         return true;

      case 'spellcheck':
         debug.log('spellcheck');
         _jquery2.default.ajax({
            "url": API_DOMAIN + '/spell2',
            "type": 'POST',
            "dataType": 'json',
            "data": Object.assign(common, {
               "text": req.text,
               "language": req.language
            })
         }).done(function (res) {
            return (0, _helpers.doneHandler)(res, sendResponse);
         }).fail(function () {
            return (0, _helpers.errorHandler)(sendResponse);
         });
         return true;

      case 'openOptionsPage':
         debug.log('openOptionsPage');
         if (req.suffix) {

            chrome.tabs.create({ "url": chrome.runtime.getURL('html/options.html' + req.suffix) });
         } else {
            // Canonical way

            chrome.runtime.openOptionsPage();
         }
         return true;

      case 'clickReport':
         debug.log('clickReport');
         _jquery2.default.ajax({
            "url": API_DOMAIN + '/clickReport',
            "type": 'POST',
            "data": Object.assign(common, { "body": req.body })
         }).done(function (res) {
            return (0, _helpers.doneHandler)(res, sendResponse);
         }).fail(function () {
            return (0, _helpers.errorHandler)(sendResponse);
         });
         return true;

      case 'storage':
         debug.log('storage');
         switch (req.type) {
            case 'get':
               Storage.get({ "storeName": req.name }, req.key, sendResponse);
               return true;
            case 'set':
               Storage.set({ "storeName": req.name }, req.key, req.value, sendResponse);
               return true;
            case 'keys':
               Storage.keys({ "storeName": req.name }, sendResponse);
               return true;
            case 'remove':
               Storage.remove({ "storeName": req.name }, req.key, sendResponse);
         }
         return true;
      case 'tcLookup':
         (0, _handleTcRequest.handleTcRequest)();

   }
});
/* WEBPACK VAR INJECTION */}.call(exports, "src/background/background.js"))

/***/ }),

/***/ 486:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
   value: true
});
/* global chrome */

var debug = __webpack_require__(1)(__filename);

function getChromeVersion() {

   var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);

   return raw ? parseInt(raw[2], 10) : false;
}

function getExtensionVersion() {

   return chrome.runtime.getManifest().version;
}

function doneHandler(res, sendResponse) {

   debug.warn('Sending response to content page...');
   debug.log(res);
   sendResponse(res);
}

function errorHandler(error, sendResponse) {

   debug.log('Error was handled ...');
   debug.log(error);
   sendResponse(null);
}

exports.getChromeVersion = getChromeVersion;
exports.getExtensionVersion = getExtensionVersion;
exports.errorHandler = errorHandler;
exports.doneHandler = doneHandler;
/* WEBPACK VAR INJECTION */}.call(exports, "src/background/background/helpers.js"))

/***/ }),

/***/ 487:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _persistFontSize = __webpack_require__(488);

var _persistFontSize2 = _interopRequireDefault(_persistFontSize);

var _htmlHeadBody = __webpack_require__(489);

var _hideDefinitionsStuff = __webpack_require__(490);

var _hideDefinitionsStuff2 = _interopRequireDefault(_hideDefinitionsStuff);

var _removeAndUpdateDatastore = __webpack_require__(491);

var _removeAndUpdateDatastore2 = _interopRequireDefault(_removeAndUpdateDatastore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = __webpack_require__(1)(__filename); /*
                                               * TODO: Add a reactive layout, which changes the contents according to what's most appropriate -- e.g. removing descriptions when made small.
                                               * TODO: Allow for sorting according to these criteria:
                                               * 1. Alphabetically.
                                               * 2. Custom sorting according to product name as selected by user, with persistence!
                                               * E.g. if product is "Docs", then let's assume "Gmail" is considered relevant. But sometimes they might include some random other glossaries which are not useful. The user should be able to select listing order for each products. So e.g.:
                                               * Docs: Gmail, YouTube
                                               * AdWords: AdSense, AdGrants, etc.
                                               */

/*
 * HOWTO reorder elements in DOM: http://jsfiddle.net/vexw5/6/
 * or I could just use arrays in React
 */

function putGlossariesInWindow(content) {

   // Notez: might not work well on small viewports due to screen.height - 840
   if (!window.wind) {

      if (!content) {

         window.wind = window.open('', 'Title', 'toolbar=no, location=no, directories=no, status=yes, menubar=1, scrollbars=yes, resizable=yes, width=780, height=1000, top=' + (screen.height - 400) + ', left=' + (screen.width - 840));
         window.wind.document.head.innerHTML = (0, _htmlHeadBody.getHead)();
         window.wind.document.body.innerHTML = 'No glossary matches available.';
      } else if (content) {

         window.wind = window.open('', 'Title', 'toolbar=no, location=no, directories=no, status=yes, menubar=1, scrollbars=yes, resizable=yes, width=780, height=1000, top=' + (screen.height - 400) + ', left=' + (screen.width - 840));
         window.wind.document.head.innerHTML = (0, _htmlHeadBody.getHead)();
      }
   }

   (0, _jquery2.default)(window.wind).on('beforeunload', function () {

      window.wind = undefined;
   });

   if (content) {

      try {

         window.wind.document.body.innerHTML = (0, _htmlHeadBody.getBody)(content);
      } catch (e) {

         debug.warn(e);
      }
   }

   try {

      (0, _jquery2.default)(window.wind.document.body).find('.cth-NEW').click(_removeAndUpdateDatastore2.default);
      (0, _jquery2.default)(window.wind.document.body).find('.cth-CHANGE').click(_removeAndUpdateDatastore2.default);

      (0, _hideDefinitionsStuff2.default)(window.wind.document);
      (0, _persistFontSize2.default)(window.wind.document);
   } catch (e) {

      debug.warn(e);
   }

   window.wind.blur();
}

exports.default = putGlossariesInWindow;
/* WEBPACK VAR INJECTION */}.call(exports, "src/background/background/putGlossariesInWindow.js"))

/***/ }),

/***/ 488:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.default = persistFontSize;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var count = 0; // Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by Eirik on 12.07.2017.
 */
function persistFontSize(doc) {

   var $incr = (0, _jquery2.default)(doc).find('#cth-incr');
   var $decr = (0, _jquery2.default)(doc).find('#cth-decr');
   var $body = (0, _jquery2.default)(doc).find('body');

   var get = function get() {
      return localStorage['cth-stored-font-size'];
   };
   // Noinspection AssignmentResultUsedJS
   var put = function put(numPx) {

      localStorage['cth-stored-font-size'] = numPx;
   };

   var storedSize = get();
   if (storedSize) {

      $body.css({ 'font-size': storedSize + 'px' });
   }

   $incr.click(function () {
      return _change('incr');
   });
   $decr.click(function () {
      return _change('decr');
   });

   function _change(symbol) {

      if (symbol !== 'incr' && symbol !== 'decr') {

         return;
      }

      var fontSize = parseInt($body.css('font-size'));
      var modifier = symbol === 'incr' ? +2 : -2;

      fontSize += modifier;

      // There's no reason to ever go below font size 1:
      if (fontSize < 0) {

         fontSize = 1;
         count++;
      }

      $body.css({ 'font-size': fontSize + 'px' });
      put(fontSize);
   }
}

/***/ }),

/***/ 489:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by Eirik on 12.07.2017.
 */

/*
 * TODO: Change the numbers 1, 2, 3 - they are not needed.
 * TODO: Create a new view where items are listed according to product first!
 * e.g.
 * AdWordsUpdated
 * --------------
 * eligible - kvalifisert (noun)
 * IF - HVIS other
 */

var getHead = exports.getHead = function getHead() {

    return '<head>\n    <title>Detached Glossaries</title>\n    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"\n          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">\n\n    <style>\n        body {\n            font-size: 14px\n        }\n\n        .cth-spacious {\n            margin: 5px\n        }\n\n        .gtc-glossary-pos {\n            font-family: monospace\n        }\n\n        .gtc-glossary-sourceterm {\n            display: inline-block\n            *zoom: 1\n            *display: inline\n            width: 20%\n            vertical-align: top\n            color: red\n        }\n\n        .gtc-glossary-source {\n            color: #666\n            vertical-align: top\n        }\n\n        .gtc-glossary-terms {\n            clear: both\n            display: block\n            padding-bottom: 0.5em\n        }\n\n        .gtc-glossary-translation, .gtc-glossary-pos {\n            font-family: monospace\n        }\n\n        .gtc-glossary-translation {\n            font-size: larger\n            display: inline-block\n            vertical-align: top\n            font-weight: bold\n        }\n\n        .gtc-glossary-pos, .gtc-glossary-language {\n            font-style: italic\n            display: inline-block\n            vertical-align: top\n            font-size: smaller\n            color: #666\n        }\n\n        .gtc-glossary-description {\n            vertical-align: top\n            clear: both\n            display: block\n        }\n    </style>\n</head>';
};

var getBody = exports.getBody = function getBody(content) {

    return '<body>\n                    <div style="margin:3px" class="btn-group" role="group">\n                        <button type="button" title="Increae font size" class="btn btn-default" id="cth-incr">\n                            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>\n                        </button>\n                        <button type="button" title="Decrease font size" class="btn btn-default" id="cth-decr">\n                            <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>\n                        </button>\n                        <button type="button" title="Toggle descriptions" class="btn btn-default" id="cth-compress">\n                            <span class="glyphicon glyphicon-compressed" aria-hidden="true"></span>\n                        </button>\n                    </div>\n                    ' + (content || 'No glossary matches available.') + '\n                </body>';
};

/***/ }),

/***/ 490:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.default = hideDefinitionsStuff;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = false;

function hideDefinitionsStuff(doc) {

   var stored = localStorage['cth-stored-descriptions-state'];
   var $desc = (0, _jquery2.default)(doc).find('.gtc-glossary-description');
   var $cthCompress = (0, _jquery2.default)(doc).find('#cth-compress');

   if (stored === 'true') {

      state = true;
      $desc.hide();
   }

   $cthCompress.click(function () {

      state = !state;
      $desc.toggle();
      localStorage['cth-stored-descriptions-state'] = state;
   });
}

/***/ }),

/***/ 491:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.default = removeAndUpdateDatastore;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _localforage = __webpack_require__(78);

var _localforage2 = _interopRequireDefault(_localforage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by Eirik on 12.07.2017.
 */
var NewStorage = _localforage2.default.createInstance({ "name": 'glossaries' });

function removeAndUpdateDatastore() {

   this.remove();
   //  Logger.log($(this).attr('data-database-name'))

   NewStorage.getItem((0, _jquery2.default)(this).attr('data-database-name')).then(function (existingEntry) {

      // Logger.log(existingEntry)

      existingEntry.lastUpdated = 691200000; // 8 days ago
      NewStorage.setItem(existingEntry.keyName, existingEntry).then(function (res) {
         //  Logger.log(res)
      });
   });
}

/***/ }),

/***/ 492:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.default = getFingerprint;

var _fingerprintjs = __webpack_require__(177);

var _fingerprintjs2 = _interopRequireDefault(_fingerprintjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFingerprint(cb) {

   new _fingerprintjs2.default().get(function (result, components) {

      cb(result); // A hash, representing your device fingerprint
   });
}

/***/ }),

/***/ 493:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

var _handleTcRequest = __webpack_require__(189);

var debug = __webpack_require__(1)(__filename);

/*
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * Found in the LICENSE file.
 */

// Create one test item for each context type.
/* global chrome */
var contexts = ["selection"];
var title = "Look up phrase in Translation Console";

chrome.contextMenus.create({
  title: title,
  contexts: contexts,
  "onclick": _handleTcRequest.handleTcRequest
});
/* WEBPACK VAR INJECTION */}.call(exports, "src/background/contextMenu/index.js"))

/***/ }),

/***/ 494:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkIfGlossaryWindowIsOpen;
// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by Eirik on 12.07.2017.
 */

/**
 *
 * @returns {boolean}
 */
function checkIfGlossaryWindowIsOpen() {

  return Boolean(window.wind);
}

/***/ }),

/***/ 495:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});
// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 25.02.2017.
 */

/* global chrome */

function getCpuInfo(cb) {

   chrome.system.cpu.getInfo(cb);
}

function getMemInfo(cb) {

   chrome.system.memory.getInfo(cb);
}

exports.getCpuInfo = getCpuInfo;
exports.getMemInfo = getMemInfo;

/***/ })

},[485]);
//# sourceMappingURL=background.js.map