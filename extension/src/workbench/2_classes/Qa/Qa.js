// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2016/01/07.
 */
/* eslint-env browser, webextensions */

import $ from 'jquery'
import _ from 'lodash'
import runChecks from './runChecks'
import {Spellcheck} from '../Spellcheck/Spellcheck'
import toggleSpellcheckLanguageIndication from './toggleSpellcheckLanguageIndication'
import {ProgressBar} from './ProgressBar'

const debug = require('cth-debug')(__filename)

const SPELLCHECK_OVERRIDE_TOGGLE = false;

class Qa {
   constructor () {
      this.sheet = window.cth.dataJSON[window.cth.option.sheetName]
      this.dataElements = this.sheet ? this.sheet.elements.filter(x=>x.toggle === 'on') : null
      this.qaObserveAll = null
      this.targetSegments = (() => {
         const visibleUnits = $(window.cth.dom.targetDoc).find('.goog-gtc-unit:visible')

         if (window.cth.option.disableIceQa) {
            return _.filter(
               visibleUnits,
               (ele) => !$(ele)[0].firstChild.classList.contains('goog-gtc-from-tm-score-100-ice')
            )
         }
         return visibleUnits
      })()

      /**
       *  Only filtered target segments are returned. Nice! :-)
       */
      this.sourceSegments = _.map(this.targetSegments, (ele) => $(window.cth.dom.sourceDocClone).find(`#${ele.id}`)[0])
   }

   start () {
      if (this.targetSegments.length <= 0) {
         return debug.warn("Refusing to run QA because no targetSegments have been provided")
      }
      if (!this.dataElements) {
          return debug.warn("Refusing to run QA because dataElements is falsy")
      }

      ProgressBar.add({
         "targetSegments": this.targetSegments,
         "$targetNode": $(window.cth.dom.wbmenu)
      })

      runChecks({
         "sourceSegments": this.sourceSegments,
         "targetSegments": this.targetSegments,
         "iterationCallback": ProgressBar.increment,
         "dataElements": this.dataElements
      }, () => {
         if (SPELLCHECK_OVERRIDE_TOGGLE && window.cth.option.spellcheckEnabled) {
            const translatableSegments = $(this.targetSegments).find('.goog-gtc-translatable')
            Spellcheck.run(translatableSegments)
         }
      })

      if (SPELLCHECK_OVERRIDE_TOGGLE && window.cth.option.spellcheckEnabled) {
         _.defer(toggleSpellcheckLanguageIndication, 100)
      }
   }

   stop () {
      ProgressBar.remove()

      removeAllQaLabels()

      if (SPELLCHECK_OVERRIDE_TOGGLE && window.cth.option.spellcheckEnabled) {
         Spellcheck.removeWiggles(this.targetSegments)
         toggleSpellcheckLanguageIndication()
      }

      function removeAllQaLabels () {
         $(window.cth.dom.sourceDoc).find('.cth-message').contents().unwrap()
         $(window.cth.dom.targetDoc).find('.cth-message').remove()
      }
   }
}

export {
   Qa
}
