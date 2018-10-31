/* global cth */
/* global chrome */
// Copyright © 2016 Eirik Birkeland. All rights reserved.
import $ from 'jquery';
import { icons } from '../icons';

// FEATURE: Add more icons if any are useful ... e.g. GTT inbox
function addSgLink () {
   const docLang = window.cth.docInfo.dokumentSprak;
   _addIcon({
      "iconName": 'styleguide16',
      "hrefContent": `https://support.google.com/styleguides/faq/6356307?hl=${docLang}`,
      "onHoverDesc": `Style Guide for ${docLang}`
   });
}

// TODO: When switching to Copy Edit, there should be a warning if the user has not yet checked out QM.

function addQMLink () {
   const projNumber = window.cth.docInfo.prosjektNummer;

   // Using iconRef instead of global id's.
   const iconRef = _addIcon({
      "iconName": 'qm',
      "hrefContent": `https://gloc-qm.appspot.com/?show_all=yes&search=${projNumber}`,
      "onHoverDesc": `Query Manager for ${projNumber}`
   });
   $(iconRef).click(() => {
      cth.clickedQmIcon = true;
   });
}

function addTCLink () {
   const targetNode = window.cth.dom.docTitleBar;
   const img = $('<img/>')[0];
   img.src = 'https://www.google.com/transconsole/externaltc/static/images/world.ico';
   img.style.width = '16px';
   const toInsert = document.createElement('a');
   toInsert.href = `https://www.google.com/transconsole/externaltc/btviewer/search?ModifySearch=true&TranslationFilterAnyOrAll=any&TranslationFilterStage=LEVERAGED&ShowTranslationStage=showTranslationStage&ResourcesFilter&SearchField=search_field_src&ProductSelect&LanguagesSelected=${cth.docInfo.dokumentSprak}&CreatedAfter&TranslationFilterStatus=translated&SearchType=search_type_exact&CreatedBefore`;
   toInsert.target = '_blank';
   toInsert.title = 'Translation Console';
   toInsert.appendChild(img);
   targetNode.appendChild(toInsert);

   chrome.storage.local.get('tc-override', (res) => {
      if (res && res['tc-override']) {
         toInsert.href = res['tc-override'];
      }
   });
}

function _addIcon ({ iconName, hrefContent, onHoverDesc, optionalDestination }) {
   const targetNode = optionalDestination || window.cth.dom.docTitleBar;
   const img = $('<img/>')[0];
   img.src = icons[iconName];
   const a = document.createElement('a');
   a.href = hrefContent;
   a.target = '_blank';
   a.title = onHoverDesc;
   a.appendChild(img);
   targetNode.appendChild(a);
   return a;
}

export { addSgLink, addQMLink, addTCLink };