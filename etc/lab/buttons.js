// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 03.09.2016.
 */
'use strict'
const $ = require('jquery')
const _ = require('lodash')
import icons from '../icons'

export default function () {
    const buildButton = (() => {
        const button = document.createElement('div')
        button.className = cth.stripped.buttonClasses + ' cth_effect'
        button.role = 'button'

        const buttonImage = document.createElement('img')
        buttonImage.className = 'cth_buttonImage'
        button.appendChild(buttonImage)

        const inputField = document.createElement('input')
        inputField.className = cth.stripped.buttonClasses + ' cth_effect cth_input'
        inputField.size = 8

        const textArea = document.createElement('textarea')
        textArea.className = cth.stripped.buttonClasses

        return function (type, id, tooltipMsg, iconName, defValue) {
            let newItem
            if (type == 'button') {
                newItem = button.cloneNode(true)
                if (iconName)
                    newItem.childNodes[0].src = icons[iconName]
            } else if (type == 'inputField') {
                newItem = inputField.cloneNode(true)
                newItem.value = defValue
            }
            newItem.id = id
            $(newItem).attr('data-toggle', 'tooltip')
            newItem.title = tooltipMsg
            return newItem
        }
    })()
    return [
        {searchSourceField: buildButton('inputField', 'cth_searchSourceField', 'Input source word to highlight...', '', 'Source')},
        {wholeQaButton: buildButton('button', 'cth_wholeQaButton', 'Toggle in-line QA messages', 'binocularsOffState')},
        {insertButton: buildButton('button', 'cth_insertButton', 'Merge source and target (proofreading mode)', 'sourceArrowOffState')},
        {tradosButton: buildButton('button', 'cth_tradosButton', 'Toggle tradosText', 'tradosOffState')},
        {descButton: buildButton('button', 'cth_descButton', 'Hide descriptions', 'descriptionsOffState')},
        {glossaryWindowButton: buildButton('button', 'cth_glossaryWindowButton', 'Open glossaries in separate window', 'windowPlus')},
        {searchTargetField: buildButton('inputField', 'cth_searchTargetField', 'Input target word to highlight...', '', 'Target')},
        {decrFontButton: buildButton('button', 'cth_decrFontButton', 'Decrement font size', 'minus')},
        {incrFontButton: buildButton('button', 'cth_incrFontButton', 'Increment font size', 'plus')},
        {timerButton: buildButton('inputField', 'cth_timerButton', 'Left-click to start or pause. Double-click to reset', '', '00:00:00')},
        {loadSheetButton: buildButton('button', 'cth_loadSheetButton', 'Reload spreadsheet data', 'arrowCircleLarge')},
        {loadSettingsButton: buildButton('button', 'cth_settingsButton', 'Load settings screen', 'settings')}
    ]
}