// Copyright © 2016 Eirik Birkeland. All rights reserved.
    cth.iceSegments = {
        getDocName: function () {
            return document.getElementsByClassName('gtc-docname goog-inline-block')[0].innerHTML
        },
        iceArr: function () {
            return JSON.parse(localStorage.getItem(this.getDocName()))
        },
        mark: function () {
            var iceArr
            if (localStorage.getItem(this.getDocName())) {
                logger.log('This document was already stored - using original ICE status for segments.')
                iceArr = JSON.parse(localStorage.getItem(this.getDocName()))
            } else {
                var iceSegments = cth.targetDoc.getElementsByClassName('goog-gtc-from-tm-score-100-ice')
                iceArr = []
                for (var i = 0; i < iceSegments.length; i++) {
                    iceArr.push(iceSegments[i].parentNode.id)
                }
                localStorage.setItem(this.getDocName(), JSON.stringify(iceArr))
            }
            var newNode = document.createElement('span')
            newNode.style.cssText = 'border: 2px ridge orange;color:orange;background:purple;border-radius:5px'
            var newContent = document.createTextNode('ICE')
            newNode.appendChild(newContent)
            for (var i = 0; i < iceArr.length; i++) {
                cth.targetDoc.getElementById(iceArr[i]).appendChild(newNode.cloneNode(true))
            }
        },
        markPHOnly: function () {
            var iceArr
            if (localStorage.getItem(this.getDocName())) {
                logger.log('This document was already stored - using original ICE status for segments.')
                iceArr = this.iceArr()
            } else {
                var iceSegments = cth.targetDoc.getElementsByClassName('goog-gtc-from-tm-score-100-ice goog-gtc-ph-missing')
                iceArr = []
                for (var i = 0; i < iceSegments.length; i++) {
                    iceArr.push(iceSegments[i].parentNode.id)
                }
                localStorage.setItem(this.getDocName(), JSON.stringify(iceArr))
            }
            var newNode = document.createElement('span')
            newNode.style.cssText = 'border: 2px ridge orange;color:orange;background:purple;border-radius:5px'
            var newContent = document.createTextNode('ICE')
            newNode.appendChild(newContent)
            for (var i = 0; i < iceArr.length; i++) {
                cth.targetDoc.getElementById(iceArr[i]).appendChild(newNode.cloneNode(true))
            }
        },
        lock: function () {
            var x
            var iceArr = this.iceArr()
            for (x = 0; x < iceArr.length; x++) {
                cth.targetDoc.getElementById(iceArr[x]).childNodes[0].classList.remove('goog-gtc-translatable')
            }
        },
        delete: function () {
            var x
            var iceSegments = cth.targetDoc.getElementsByClassName('goog-gtc-from-tm-score-100-ice')
            for (x = 0; x < iceSegments.length; x++) {
                iceSegments[0].parentNode.parentNode.removeChild(iceSegments[0].parentNode)
            }
        },
        toggle: function () {
            var x
            var iceArr = this.iceArr()
            for (x = 0; x < iceArr.length; x++) {
                $('#transarea').find('iframe').contents().find('#' + iceArr[x]).toggle(cth.option.TEXT_TOGGLE_DELAY)
            }
        }
    }