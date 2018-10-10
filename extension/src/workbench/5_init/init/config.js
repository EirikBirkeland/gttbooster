// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 10.07.2016.
 */
/* eslint-env browser, webextensions */

import {load} from '../../../model/SettingsStorage'

const defaults = require('../../../options/settings').defaults
const debug = require('cth-debug')(__filename)

export const getOptions = function (cb) {
   const opt = {}

   debug.log('Toolkit found')
   opt.CONSISTENCY_SYNC_TOGGLE = false
   opt.WHOLE_DOC_QA_TOGGLE = false
   opt.SOURCE_TOGGLE = false
   opt.GLOSSARY_TOGGLE = false
   opt.QA_TOGGLE = false
   opt.GLOSSARY_WINDOW_TOGGLE = false
   opt.TRADOS_TOGGLE = false
   opt.DESCRIPTIONS_TOGGLE = false
   opt.LOCK_TOGGLE = false
   opt.AUTOCOMPLETE_TOGGLE = false
   opt.GENERAL_GLOSSARY_ACTIVE = true
   opt.ICE_LOCK = false

   opt.LOAD_TYPE = 'full'
   opt.SPREADSHEET_UPDATE_INTERVAL = 900000
   opt.TEXT_TOGGLE_DELAY = 250
   opt.UPDATE_DOCUMENT_STATUS = 360000
   opt.QA_DELAY = 0

   load(defaults, (retrievedSettings) => {
      // This should mutate opt
      Object.assign(opt, retrievedSettings)
      cb(opt)
   })
}