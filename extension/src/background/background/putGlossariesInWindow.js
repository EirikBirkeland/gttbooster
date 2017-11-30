/*
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

import $ from 'jquery'
import persistFontSize from './putGlossariesInWindow/persistFontSize'
import {getBody, getHead} from './putGlossariesInWindow/htmlHeadBody'
import hideDefinitionsStuff from './putGlossariesInWindow/hideDefinitionsStuff'
import removeAndUpdateDatastore from './putGlossariesInWindow/removeAndUpdateDatastore'

const debug = require('cth-debug')(__filename)

function putGlossariesInWindow (content) {
   // Notez: might not work well on small viewports due to screen.height - 840
   if (!window.wind) {
      if (!content) {
         window.wind = window.open('', 'Title', `toolbar=no, location=no, directories=no, status=yes, menubar=1, scrollbars=yes, resizable=yes, width=780, height=1000, top=${screen.height - 400}, left=${screen.width - 840}`)
         window.wind.document.head.innerHTML = getHead()
         window.wind.document.body.innerHTML = 'No glossary matches available.'
      } else if (content) {
         window.wind = window.open('', 'Title', `toolbar=no, location=no, directories=no, status=yes, menubar=1, scrollbars=yes, resizable=yes, width=780, height=1000, top=${screen.height - 400}, left=${screen.width - 840}`)
         window.wind.document.head.innerHTML = getHead()
      }
   }

   $(window.wind).on('beforeunload', () => {
      window.wind = undefined
   })

   if (content) {
      try {
         window.wind.document.body.innerHTML = getBody(content)
      } catch (e) {
         debug.warn(e)
      }
   }

   try {
      $(window.wind.document.body).find('.cth-NEW').click(removeAndUpdateDatastore)
      $(window.wind.document.body).find('.cth-CHANGE').click(removeAndUpdateDatastore)

      hideDefinitionsStuff(window.wind.document)
      persistFontSize(window.wind.document)
   } catch (e) {
      debug.warn(e)
   }

   window.wind.blur()
}

export default putGlossariesInWindow
