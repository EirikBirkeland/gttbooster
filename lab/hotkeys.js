// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2016/01/09.
 */

import icons from './icons'
export default function () {
    'use strict'

    const cth = window.cth

    function importantHotKey() {
        $('#transarea').find('iframe').contents().keydown(function (e) {
            if (e.keyCode == 117) {
                var currSegment = cth.dom.targetDoc.getElementsByClassName('goog-gtc-translatable goog-gtc-from-human goog-gtc-unit-highlight')[0]
                currSegment.style.color = 'Crimson'
                currSegment.style.fontStyle = 'italic'
                cth.importantArray.push(currSegment.parentNode.id)
                var button = document.createElement('img')
            //button.style = "margin-top: -3px; vertical-align: middle; opacity: 1; cursor: default;";
                button.src = icons.exclamation
                currSegment.appendChild(button)
            }
        })
    }

    function loadSegmentStatusAndApplyColors() {
        logger.log('Running loadSegmentStatusAndApplyColors.')
        cth.importantArray = JSON.parse(localStorage['importantArray_' + cth.dom.docInfo.getDocName])
        cth.confirmedArray = JSON.parse(localStorage['confirmedArray_' + cth.dom.docInfo.getDocName])
        let button = document.createElement('img')
        button.src = icons.exclamation

        applyColors(cth.importantArray, 'exclamation')
        applyColors(cth.confirmedArray, 'checkMark')

        function applyColors(array, icon) {
            _.forEach(array, (ele)=> {
                let button = document.createElement('img')
                button.src = icons[icon]
                let segment = cth.dom.targetDoc.getElementById(ele)
                segment.appendChild(button.cloneNode(true))
                segment.firstChild.style.color = 'DodgerBlue'
                segment.firstChild.style.fontStyle = 'italic'
            })
        }
    }

}