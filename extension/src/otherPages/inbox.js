// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 23.06.2016.
 */
// GTT document other_pages
import $ from 'jquery'

function initListModules() {

   replaceTitleInbox()

}

function replaceTitleInbox() {

   const nameRepresentation = $('.gb_P.gb_R')[0]
   const accountEmail = $('.gb_xb')[0]

   if (document.title.match('Google Translator Toolkit')) {

      let extract = (nameRepresentation || accountEmail).innerHTML

      extract = extract.replace(/(.*?)@.*/, '$1')
      document.title = extract

   }

}

/**
 * Opens a list of URLs. Warns the user if they try to open more than 5 URLs at a time.
 */
function openAllSelectedDocuments() {

   const urls = getSelectedDocumentUrls()

   if (urls.length >= 5) {

      const con = confirm('Are you sure you wish to open more than 5 documents at a time?')
      if (con === true) {

         _open()

      }

   } else {

      _open()

   }

   function _open() {

      [].forEach.call(urls, (ele) => {

         window.open(ele)

      })

   }

}

/**
 *
 * @returns {string[]} urls - returns a list of URLs that can be opened
 */
function getSelectedDocumentUrls() {

   const $selectedDocuments = $('.gtc-list-row-select')
   const ids = [].map.call($selectedDocuments, (ele) => ele.id.replace(/^.*:(.*)$/, '$1'))
   const urls = [].map.call(ids, (ele) => `https://translate.google.com/toolkit/workbench?did=${ele}`)
   return urls

}

export {initListModules}
