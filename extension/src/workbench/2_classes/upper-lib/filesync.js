// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2016/02/27.
 */
import $ from 'jquery'

const _ = require('lodash')
const debug = require('cth-debug')(__filename)

export function filesync (mountPoint) {
   const input = $('<input/>').attr('type', 'file').attr('id', 'cth-files').attr('name', 'files[]')[0]

   const view = $('#doctitlebar')[0]
   view.appendChild(input)

   // Defaults to window.fileSync if no mount point specified
   mountPoint.fileSync = {}
   const app = mountPoint.fileSync
   app.xlf = {}

   $('#cth-files').bind('change', handleFileSelect)

   function handleFileSelect (e) {
      const file = e.target.files[0]

      const reader = new FileReader()

      reader.onload = (e) => {
         if (!app.timestamp || file.lastModified !== app.timestamp) {
            app.timestamp = file.lastModified
            app.file = file

            const parser = new DOMParser()

            app.xlf = parser.parseFromString(e.target.result, 'text/xml')
            debug.log('app.xlf')
            debug.log(app.xlf)
            app.nodeList = app.xlf.getElementsByTagName('trans-unit')

            app.translations = []

            _.forEach(app.nodeList, (ele) => {
               app.translations.push(ele.getElementsByTagName('target')[0].innerHTML)
            })

            debug.log(e.target)

            // Validate lengths
            if (app.translations.length !== window.cth.dom.targetSegments.length) {
               if (!confirm('Invalid length. Continue anyway?')) {
                  debug.log(`The length of doc for import is ${app.translations.length}`)
                  debug.log(`The length of existing DOM segments is ${window.cth.dom.targetSegments.length}`)
                  return
               }
            }

            // Validate filename
            const oriDocTitle = window.cth.dom.docTitleBar.children[0].innerHTML
            if (!file.name.includes(oriDocTitle.replace(/ /g, '_'))) {
               if (!confirm('Invalid filename. Continue anyway?')) {
                  return
               }
            }

            // Insert translation
            _.forEach($(window.cth.dom.targetDoc).find('.goog-gtc-translatable'), (ele, i) => {
               debug.log(`Overwriting segment index ${i}`)
               ele.innerHTML = app.translations[i]
            })
         }
      }

      // This one needs way more handling. Loading the file every 350 ms and replacing everything is overkill for large documents.
      _.delay(() => {
         try {
            reader.readAsText(file)
         } catch (err) {
            debug.log(err)
         }
      }, 350)
   }
}
