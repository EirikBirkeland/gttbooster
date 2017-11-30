import $ from 'jquery'
import _ from 'lodash'

import {Storage} from '../../model/GeneralStorage'
import {Spreadsheet} from './Spreadsheet'

window.Storage = Storage

const debug = require('cth-debug')(__filename)

export function getStatusFromStorageAndApply() {

   chrome.storage.local.get(null, (obj) => {

      // Console.log(obj)
      window.cth.projectStatus = obj
      markCompleted()

   })

}

export function addButtons() {

   _addButton('cthBtnId1', 'Update', () => {

      getStatusFromStorageAndApply()
      Spreadsheet.getSheet((spreadsheet) => {

         $('.cth-spreadsheet-highlighting').removeClass('cth-spreadsheet-highlighting')
         window.cth.spreadsheetData = spreadsheet
         Spreadsheet.addLimeHighlightingAndCheck()

      })

   }, 'listener')

   _addButton('cthBtnId2', 'Refresh', 'refreshScreen()', 'onClick')

   // _addButton('cthBtnId3', 'Abbr.', makeDateVisible, 'listener')

   function _addButton(newId, newLabel, func, type) {

      const oriButton = document.getElementsByClassName('subMenuLi activeSubDropItem').item(4)
      const button = oriButton.cloneNode(true)
      button.id = newId
      button.removeChild(button.firstChild)
      const toInsert = document.createElement('div')
      toInsert.innerHTML = newLabel
      toInsert.id = 'dialog_link' // For CSS stylesheet
      toInsert.className = 'ui-state-default ui-corner-all subItemLink defaultMenuItem dialog_link' // For CSS stylesheet
      button.appendChild(toInsert)
      oriButton.parentNode.appendChild(button)

      const inserted = document.getElementById(newId).firstChild
      inserted.style.background = '#C7F2FF'
      inserted.style.cursor = 'pointer'
      if (type === 'onClick') {

         inserted.setAttribute('onClick', func)

      } else if (type === 'listener') {

         inserted.addEventListener('click', func, false)

      }

   }

}

export function highlightNonstandardDates(timeRe = /1[67]:59/) {

   if (!localStorage['cth-dev-mode']) {

      return

   }
   const dueArr = $('[aria-describedby=tasks_dueDate]')
   _.forEach(dueArr, (ele, i) => {

      if (!ele.innerHTML.match(timeRe)) {

         dueArr[i].innerHTML = `<span style='color:red'>${ele.innerHTML}</span>`

      }

   })

}

function makeDateVisible() {

   const rows = document.getElementsByClassName('ui-widget-content jqgrow ui-row-ltr')
   for (let i = 0; i < rows.length; i++) {

      rows[i].childNodes[17].innerHTML = rows[i].childNodes[25].innerHTML

   }
   $('#jqgh_tasks_taskTypeId').text('dueDate')

}

function reloadPage(interval) {

   debug.log('reloadPage has been run.')
   setInterval(() => {

      window.refreshScreen()

   }, interval)

}

function markCompleted() {

   debug.log('Running markCompleted()')

   function reduceOpacity(lineItem) {

      for (let j = 0; j < lineItem.childNodes.length; j++) {

         lineItem.childNodes[j].style.opacity = '0.4'

      }

   }

   function reFormat(lineItem, newStatus) {

      const short = $(lineItem).find('.stageTextJqgrid')[0]
      short.innerHTML = short.innerHTML.replace(/.*/, newStatus)
      short.style.color = 'gold'
      $(short).addClass('cth-highlight')

   }

   const $aRows = $('.ui-widget-content.jqgrow.ui-row-ltr')
   for (const key in window.cth.projectStatus) {

      debug.log('Iterating keys ...')
      if (window.cth.projectStatus.hasOwnProperty(key) && typeof key === 'string') {

         debug.log('Key valid')

         for (let i = 0; i < $aRows.length; i++) {

            debug.log('Iterating rows')

            const requestName = $($aRows[i]).find('[aria-describedby="tasks_requestName"]')[0].innerHTML

            const lineItem = window.cth.projectStatus[key]

            if (requestName === key) {

               const arrayOfFileContents = Object.keys(lineItem).map((ele) => lineItem[ele])

               if (arrayOfFileContents.every((ele) => Boolean(ele.status))) {

                  const statuses = arrayOfFileContents.map((ele) => ele.status)

                  if (_.uniq(statuses).length === 1) {

                     if (_.head(statuses).match(/Completed|In review|Translation complete|Pending/i)) {

                        reduceOpacity($aRows[i])
                        reFormat($aRows[i], 'Completed')

                     } else if (_.head(statuses).match(/In copy edit/i)) {

                        reFormat($aRows[i], 'In copy edit')

                     }

                  }

               }

            }

         }

      }

   }

}
