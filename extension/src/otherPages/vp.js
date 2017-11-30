/*
 * Copyright © 2016 Eirik Birkeland. All rights reserved.
 * Check whether the project may be a multi-file on before applying highlighting. If it's a multi-file indicate that it 'may not be entirely delivered!'.\
 */

import $ from 'jquery'
import _ from 'lodash'
import {addButtons, getStatusFromStorageAndApply, highlightNonstandardDates} from './vp/helpers'
import {Spreadsheet} from './vp/Spreadsheet'
import './vp.css'
import {Dev} from '../workbench/2_classes/Dev'

const debug = require('cth-debug')(__filename)

// TODO: It should check for number of documents and then check that all documents are 'completed'.

const throttledGetStatusFromStorageAndApply = _.throttle(getStatusFromStorageAndApply, 2000, {
   "leading": false,
   "trailing": true
})

export default function () {

   window.cth = {}
   window.cth.projectStatus = {}

   chrome.storage.onChanged.addListener((changes, namespace) => {

      throttledGetStatusFromStorageAndApply()
      highlightNonstandardDates()

   })

   Spreadsheet.getSheet((err, spreadsheet) => {

      if (err) {

         Dev(() => alert(err))
         debug.warn(err)

      }
      debug.log('%c Loaded JSON data from Jobs Spreadsheet ', 'background: #000000; color: #FFFFFF')
      window.cth.spreadsheetData = spreadsheet
      Spreadsheet.addLimeHighlightingAndCheck()

   })

   setInterval(() => {

      if (!$('.cth-highlight').length) {

         getStatusFromStorageAndApply()
         highlightNonstandardDates()

      }

      if (!$('.cth-spreadsheet-highlighting').length) {


         Spreadsheet.addLimeHighlightingAndCheck()


      }

   }, 10000)

   // TODO: Highlight uncommon dates
   addButtons()

}
