/*
 * FIXME: For whatever reason, the /vendor version doesn't work with the below settings. It could very well be that the URL is considered invalid.
 * const Tabletop = require('../../../vendor/tabletop/tabletop.js')
 */

// TODO: Make this work with the dist version of Tabletop. Also, I shoul fork Tabletop again and implement my necessary changes.

import $ from 'jquery'
import _ from 'lodash'

const debug = require('cth-debug')(__filename)

const Tabletop = require('../../../vendor/tabletop/tabletop')
// Import Tabletop from 'tabletop'
window.Tabletop = Tabletop

const Spreadsheet = {}

Spreadsheet.getSheet = function init(callbackFunction) {

   Tabletop.init({
      "key": 'https://docs.google.com/spreadsheets/d/1287wd9QbvrvkQrf2ZJ4mLcXHyjYiDy6yCvgaJmK7sWQ/edit#gid=865803184',
      "callback": callbackFunction,
      "simpleSheet": false,
      "debug": true
   })

}

Spreadsheet.addLimeHighlightingAndCheck = function addLimeHighlightingAndCheck() {

   debug.log('Now adding highlighting if applicable')
   const $rowArray = $('.ui-widget-content.jqgrow.ui-row-ltr')

   _.forEach($rowArray, (row) => {

      for (const key in window.cth.spreadsheetData) {

         _.forEach(window.cth.spreadsheetData[key].elements, (element) => {

            const jobIdInSpreadsheet = element['Job ID']

            const jobIdInDom = $(row).find('[aria-describedby=tasks_requestName]')[0]
            if (jobIdInSpreadsheet && jobIdInDom.innerHTML.match(jobIdInSpreadsheet)) {

               $(jobIdInDom).addClass('cth-spreadsheet-highlighting')

            }

         })

      }

   })

}

export {Spreadsheet}
