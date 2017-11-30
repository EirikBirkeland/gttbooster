/* eslint camelcase: [2, {properties: "never"}] */

// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 14.09.2016.
 */

import Autocomplete from '../../../2_classes/Autocomplete'
import {Glossaries} from '../../Glossaries/Glossaries'
import {startTrados} from '../../TradosMode/TradosMode'
import {MergePanes} from '../../Panes/MergePanes'
import {Qa} from '../../Qa/Qa'
import {Ice} from '../../Ice/Ice'
import {TransEditor} from '../../TransEditor/TransEditor'
import toggleMeta from './toggles/toggleMeta'
import toggleItem from './toggles/toggleItem'

let qa = null

const Toggles = {
   trados() {

      toggleItem({
         "optionName": 'TRADOS_TOGGLE',
         "cthBtnId": 'cth_tradosButton',
         "insertedElementId": 'cth_tempTradosText',
         "icon": [
            'tradosOnState',
            'tradosOffState'
         ],
         "onFunc": startTrados,
         "offFunc": startTrados
      })

   },
   autocomplete() {

      toggleItem({
         "optionName": 'AUTOCOMPLETE_TOGGLE',
         "cthBtnId": 'cth_autocompleteButton',
         "icon": [
            'autocompletionGreen',
            'autocompletionGrey'
         ],
         onFunc() {

            Autocomplete.init({"fuzzyHigherThan": window.cth.option.autocompleteEnabled})

         },
         "offFunc": Autocomplete.destroy
      })

   },
   mergePanes() {

      toggleItem({
         "optionName": 'SOURCE_TOGGLE',
         "cthBtnId": 'cth_insertButton',
         "icon": [
            'sourceArrowOnState',
            'sourceArrowOffState'
         ],
         "onFunc": () => {

            localStorage['cth-merge-panes'] = 'true'
            MergePanes.insertAll()

         },
         "offFunc": () => {

            localStorage['cth-merge-panes'] = 'false'
            MergePanes.removeAll()

         }
      })

   },
   sendGlossariesToBackground() {

      toggleItem({
         "optionName": 'GLOSSARY_WINDOW_TOGGLE',
         "cthBtnId": 'cth_glossaryWindowButton',
         "icon": [
            'windowMinus',
            'windowPlus'
         ],
         "onFunc": Glossaries.sendToBackground,
         "offFunc": null
      })

   },
   hideMeta() {

      toggleItem({
         "optionName": 'DESCRIPTIONS_TOGGLE',
         "cthBtnId": 'cth_descButton',
         "icon": [
            'descriptionsOnState',
            'descriptionsOffState'
         ],
         "onFunc": toggleMeta,
         "offFunc": () => {

            toggleMeta()
            TransEditor.focus()

         }
      })

   },
   qa() {

      toggleItem({
         "optionName": 'WHOLE_DOC_QA_TOGGLE',
         "cthBtnId": 'cth_wholeQaButton',
         "icon": [
            'binocularsOnState',
            'binocularsOffState'
         ],
         "onFunc": () => {

            qa = qa || new Qa()
            qa.start()

         },
         "offFunc": () => {

            qa.stop()

         }
      })

   },
   lockIce() {

      toggleItem({
         "optionName": 'ICE_LOCK',
         "cthBtnId": 'cth_lockIceButton',
         "icon": [
            'lockIceOnState',
            'lockIceOffState'
         ],
         "onFunc": () => {

            localStorage['cth-ice-lock'] = 'true'
            Ice.add()

         },
         "offFunc": () => {

            localStorage['cth-ice-lock'] = 'false'
            Ice.remove()

         }
      })

   }
}

export default Toggles
