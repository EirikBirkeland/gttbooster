// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2015/12/15.
 */
(function (cth, win) {
    'use strict'

    // message block detection
    /*  if (cth.dom.targetDoc.querySelectorAll('goog-gtt-messageblock').length > 0) {
     // This doc has messageBlocks
     }*/


    function confirmSegmentHotkey() {
        $('#transarea').find('iframe').contents().keydown(function (e) {
            if (e.keyCode == 115) {
                var currSegment = cth.dom.targetDoc.getElementsByClassName('goog-gtc-translatable goog-gtc-from-human goog-gtc-unit-highlight')[0]
                currSegment.style.color = 'DodgerBlue'
                currSegment.style.fontStyle = 'italic'
                cth.confirmedArray.push(currSegment.parentNode.id)
                //   var button = document.createElement('')
            }
        })
    }

    function decodeHtml(html) {
        let txt = document.createElement('textarea')
        txt.innerHTML = html
        return txt.value
    }


    function _commaTestForSingle(targetStripped) {
        // TODO: The following fails if transEditor not open. Should add a graceful try/catch or similar.
        let transEditor = targetSeg[i].getElementsByClassName('gtc-trans-inline-cont goog-inline-block')[0]
        let newResult = document.createElement('span')
        // comma test here with output. TODO: Figure out where to put this.
        if (targetStripped.match(/[a-zæøå]+, [a-zæøå]+(,)(?= og [a-zæøå]+)/i)) {
            let re1 = /[a-zæøå]+, [a-zæøå]+(,)(?= og [a-zæøå]+)/i
            let reForLength = /([a-zæøå]+, [a-zæøå]+,(?= og [a-zæøå]+))/i
            newResult.innerHTML = _highlightWithRegex(targetStripped, re1, reForLength)
            newResult.className = 'message' + targetSeg[i].id
        }
        $(transEditor).prepend(newResult)
    }

//DIRTY
    function runNorwegianTests(target) {
        return _.compact(_.map(cth.noHash, function (ele) {
            if (target.match(ele.Target))
                return ele.Desc
        })).join('')
    }

// TODO: F4 and F6 should toggle(add/close) the new tag; F4 and F6 should not be possible to add to the same item; there should be a "close all tags" button by the toolbar which is only visible when tags exist in the document.

    function getInteresting() {
        let script = document.querySelectorAll('script')[14]
        let lmodtime = script.innerHTML.match(/lmodtime.*?([0-9]+)/)
        lmodtime = new Date(parseInt(lmodtime[1]))
        // to be continued
        let time = document.querySelector('#lastmodified')
        time.innerHTML = 'modified ' + lmodtime
    }

    function clearStorage() { // action
        if (confirm('Reset saved glossary items and any cached settings?')) {
            window.localStorage.clear()
            logger.log('Local storage has been cleared.')
        }
    }

    function bookmarkFunc(targetSegments, cth_btnid) { // TODO: Clicking an element on the list should bring you to that item (scroll)
        var outArr = []
        for (var i = 0; i < targetSegments.length; i++) {
            var ID = targetSegments[i].id
            var myMatchArr = []
            var outData = []
            var blockNum = ''
            if (myMatchArr = targetSegments[i].firstChild.innerHTML.match(/¤.*?¤/) ? targetSegments[i].firstChild.innerHTML.match(/¤(.*?)¤/g) : null) {
                for (let j = 0; j < myMatchArr.length; j++) {
                    outData = []
                    outData.push(ID)
                    outData.push(myMatchArr[j].replace(/<[^>]+>/g, ''))
                    if (targetSegments[i].parentNode.classList.contains('gtc-split')) {
                        blockNum = targetSegments[i].parentNode.id.replace(/goog-gtc-([0-9]+)_[0-9]+/, '$1')
                        outData.push('Message' + blockNum)
                    }
                    if (outData.length > 0)  outArr.push(outData)
                }
            }
        }
        logger.log(outArr)
        // display a list of items, which are individually clickable, and take you to the bookmarked word.
        var toolTip = ''
        for (var i = 0; i < outArr.length; i++) {
            var ID = outArr[i][0].match(/[0-9]+/)
            var string = outArr[i][1]
            var messageNum = outArr[i][2]
            logger.log(typeof string)
            toolTip += ID + ' : ' + string + ' ' + messageNum + '\r\n'
        }
        $('#' + cth_btnid).attr('data-tooltip', toolTip)
    }

    function changeColorOnHoverAndPressKey() {
        var segBeingHovered = null

        var $haha = $('#transarea').find('iframe').contents().find('.goog-gtc-translatable')

        $.each($haha, function (index, item) {
            $(item).on('mouseover', function () {
                segBeingHovered = $(this).parent().attr('id')
                logger.log(segBeingHovered)
            })
        })

        $('#transarea').find('iframe').contents().keypress(function (e) {
            if (segBeingHovered) {
                changeColor()
            }
        })

        function changeColor() {
            logger.log('now in changeColor, and segBeingHovered is ' + segBeingHovered)
            var currSegment = cth.dom.targetDoc.getElementById(segBeingHovered)
            currSegment.parentNode.style.color = 'DodgerBlue'
            currSegment.parentNode.style.fontStyle = 'italic'
            cth.confirmedArray.push(currSegment.parentNode.id)
        }
    }

    cth.action.invertColor = function () {
        'use strict'

        let segTypes = `goog-gtc-from-tm-score-100-ice
goog-gtc-from-tm-score-100
goog-gtc-from-tm-score-90
goog-gtc-from-tm-score-99
goog-gtc-from-tm-score-100-fuzzy
goog-gtc-from-mt
goog-gtc-from-human
goog-gtc-ph-missing
goog-gtc-from-source`.
        split('\n')

        const invert = (rgb) => {
            rgb = [].slice.call(arguments).join(',').replace(/rgb\(|\)|rgba\(|\)|\s/gi, '').split(',')
            for (let i = 0; i < rgb.length; i++)
                rgb[i] = (i === 3 ? 1 : 255) - rgb[i]
            return `rgb\(
            ${rgb.join(', ')}
        \)`
        }

        // TODO: segments containing 2 things get double inverted
        for (let i = 0; i < segTypes.length; i++) {
            let arr = cth.dom.targetDoc.querySelectorAll('.' + segTypes[i])
            for (let j = 0; j < arr.length; j++) {
                arr[j].style.color = invert(arr[j].style.color)
            }
        }
    }

    function compareNumbers(sourceStr, targetStr) {
        let $1 = sourceStr.replace(/.*?(\d{2,}).*/, '$1')
        let $2 = targetStr.replace(/.*?(\d{2,}).*/, '$1')
        //logger.debug($1 + "+" + $2)
        $1 = XRegExp.escape($1)
        if ($1.match(/(\d{2,})/) && !targetStr.match($1)) { // this was the cause of the problem. $1 is treated as a regex here!  2015/07/13
            if (Math.round($1 * 2.54) === $2) {
                return 'Numbers do not match, but if this is an inch to cm conversion, you are correct: ' + $1 + ' x 2.54 = ' + ($1 * 2.54) + ', which rounds to ' + $2 + '.'
            }
        }
    }

    //testMakeMenu();
    function testMakeMenu() {
        let menuNode = document.getElementById('doctitlebar')
        let textElem = document.createElement('select')
        textElem.id = 'yoyo'
        let op = new Option()
        let op2 = new Option()
        op.value = 'TEST'
        op2.value = 'TEST2'
        op.text = 'First entry'
        op2.text = 'Second entry'
        textElem.options.add(op)
        textElem.options.add(op2)
        menuNode.parentNode.appendChild(textElem)
        document.getElementById('yoyo').addEventListener('change', function () {
            logger.log(this.value) //this.value will return the label of the item being clicked!
        }, false)
    }

})(window.cth, window)