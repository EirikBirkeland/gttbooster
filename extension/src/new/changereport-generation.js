/**
 *  @type {string[]} - an array of strings
 */
import $ from 'jquery'
import {Storage} from 'cth-storage'
import customPrettyHtml from '../4_other/custom-pretty-html'
import convertPlaceholders from '../2_classes/Segment/convertPlaceholders'
import notifier from '../4_other/notifier'

import _ from 'lodash'
import gDiff from 'diff-match-patch'

const debug = require('cth-debug')(__filename)

let gBasisDocument

/**
 *  @type {string} - "original translator"
 */
let gTranslator

/**
 *  @type {string} - "reviewer" or "current user". Sometimes translator and reviewer may be identical.
 */
let gReviewer

/**
 *  @type {string} - the current doc name
 */
let gDocName

$(document).ready(() => { // Load this code upon each page load ... giving time for initialization
   if (localStorage['cth-dev-mode']) {
      setTimeout(() => {
         gTranslator = $('#lastmodified').html().replace(/.* [0-9] by (.*)$/, '$1')

         gReviewer = window.cth.docInfo.brukerNavn

         gDocName = window.cth.docInfo.dokNavn.innerHTML

         Storage.get({"storeName": 'cachedDocuments'}, gDocName, (res) => {
            gBasisDocument = (() => {
               const theText = Array.from(window.cth.dom.targetSegments).map((ele) => convertPlaceholders(ele))

               const toSave = {
                  theText,
                  "translator": gTranslator
               }

               if (res) {
                  debug.log('res.translator', res.translator)
                  debug.log('lastTranslator', gTranslator)
                  // Override retrieved data in case the lastTranslator has changed from the stored result. This would likely overlap with user preference.
                  if (res.translator !== gTranslator) {
                     const pro = confirm('This document was already stored, but the last translator has changed. Would you like to overwrite the existing document?')
                     if (pro) {
                        Storage.set({"storeName": 'cachedDocuments'}, gDocName, toSave, debug.log)
                        return theText
                     }
                  }
                  return res.theText
               }
               if (!res) { // Always store if not existing.
                  Storage.set({"storeName": 'cachedDocuments'}, gDocName, toSave, debug.log)
                  // Return current doc state
                  return theText
               }
            })()
         })
      }, 3000)
   }
})

/*
 * Display ChangeReport in new window or modal w/ html
 * FUTURE: Add a 'share with team members' feature ... the other team members will now get access to the ChangeReports from within GTT.
 */
require('jquery-ui')
require('cth-prototype')

// TODOz: Replace with ReactJS?
const hiddenModalThing = function (args) {
   const matchPatternRe = /<del style|<ins style/

   return `<div class="bootstrap-wrapper">
    <div class="modal fade in" data-backdrop="static" id="cth-changeReport-modal" role="dialog" style="display: block;">
        <div class="modal-dialog modal-lg">
            <div class="modal-content col-md-12">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">×</button>
                    <h4 class="modal-title">ChangeReport for ${args.docName}</h4>
                    <div>
                        <span class="col-md-6">Translator: ${args.translator}</span>
                        <span class="col-md-6">Reviewer: ${args.reviewer}</span>
                    </div>
                </div>
                <br/>
                <div class="modal-body">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Segments</th>
                        </tr>
                        </thead>
                        <tbody>
                        ${args.diffReport.map((ele, i) => `<tr class="${ele.match(matchPatternRe) ? '' : 'bad'}">
                                        <td class="col-md-1">${i}</td>
                                        <td class="col-md-11">${ele}</td>
                                    </tr>`).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                <span>No # of changed segments: ${args.diffReport.reduce((acc, ele) => ele.match(matchPatternRe) ? acc + 1 : acc, 0)}</span>
                    <input type="checkbox" id="show-changes-checkbox" checked>Show all segments</input>
                    <button type="button" class="btn" id="copy-text-button"
                            title="Copy to pasteboard. Paste into Google Docs with preserved color formatting.">Copy text
                    </button>
                    <button type="button" class="btn btn-primary" id="close-button" data-dismiss="modal"
                            data-target="#cth-changeReport-modal">Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>`.clean()
}

function displayChangeReport (e, cb) {
   const diffReport = (function generateReport () {
      const currentText = Array.from(window.cth.dom.targetSegments).map((ele) => convertPlaceholders(ele))

      debug.log(gBasisDocument)
      debug.log(currentText)

      return _.map(gBasisDocument, (ele, i) => {
         const str2 = gBasisDocument[i]
         const str1 = currentText[i]
         const dmp = new gDiff()
         const diffs = dmp.diff_main(str1, str2)
         dmp.diff_cleanupEfficiency(diffs)
         return customPrettyHtml(diffs)
      })
   }())

   const toAppend = hiddenModalThing({
      "translator": gTranslator,
      "reviewer": gReviewer,
      "docName": gDocName,
      diffReport
   })

   if (!$('#cth-changeReport-modal').length) {
      $('body').append(toAppend)
   }

   const $root = $('#cth-changeReport-modal')

   $root.modal({"html": true}).on('hidden.bs.modal', () => {
   })

   $root.find('#close-button').click(() => {
      $root.parent().remove()
   })

   $root.find('#copy-text-button').click((e) => {
      e.preventDefault()
      // Select the email link anchor text
      const changeReport = $('#cth-changeReport-modal').find('.modal-content')[0]
      const range = document.createRange()
      range.selectNode(changeReport)
      window.getSelection().addRange(range)

      try {
         // Now that we've selected the anchor text, execute the copy command
         const successful = document.execCommand('copy')
         const msg = successful ? 'successful' : 'unsuccessful'
         // Alert("Copied data to clipboard.")
         notifier.info('Copied rich text to clipboard.')
         debug.log(`Copy email command was ${msg}`)
      } catch (err) {
         debug.log('Oops, unable to copy')
      }

      /*
       * Remove the selections - NOTE: Should use
       * removeRange(range) when it is supported
       */
      window.getSelection().removeAllRanges()
   })

   $root.find('#show-changes-checkbox').click(() => $root.find('.bad').toggle())

   $root.draggable({"handle": '.modal-header'})

   if (cb) {
      cb()
   }
}

export {displayChangeReport}
