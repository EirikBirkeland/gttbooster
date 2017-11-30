// Copyright © 2016 Eirik Birkeland. All rights reserved.
﻿'use strict';

(function (cth, win) {
    'use strict'
    if (win.location.pathname == '/toolkit/workbench') {
        cth.modules.glossary = function () {
            logger.log('Started Glossary function...')
            var transarea = document.getElementById('transarea')
            var iframes = transarea.getElementsByTagName('iframe')
            cth.dom.targetDoc.addEventListener('DOMNodeInserted', nodeInsertedListener, false)
            var product = []
            var productNameShort = []

            if (cth.dom.docInfo.getProductName().match(/DoubleClick/)) {
                productNameShort = ['DoubleClick', 'AdMob', 'AdWords', 'AdSense']
                product = [gDoubleClickforPublishersDict, gAdMobDict, gAdWordsDict, gAdSenseDict]
            } else if (cth.dom.docInfo.getProductName().match(/Legal/)) {
                productNameShort = ['Legal']
                product = [gLegalDict]
            }

            var prodotto = {
                NO: function (x, i) {
                    return product[x][i].NO
                },
                DA: function (x, i) {
                    return product[x][i].DA
                },
                SV: function (x, i) {
                    return product[x][i].SV
                },
                FI: function (x, i) {
                    return product[x][i].FI
                }
            }

            var clickArray = [] // initialize array

            function nodeInsertedListener(e) {
                if (cth.option.GLOSSARY_TOGGLE === true) {
                    var InsertedElement = e.target
                    if (InsertedElement.className === 'gtc-trans-inline-cont goog-inline-block') {
                        clickArray = [] // empty the array
                        var tempGlossaryText = cth.dom.targetDoc.getElementById('tempGlossaryText')
                        if (tempGlossaryText !== null) {
                            tempGlossaryText.parentNode.removeChild(tempGlossaryText)
                        }
                        InsertedElement.style.borderColor = GtcTranslatableColor
                        InsertedElement.style.borderWidth = '2px'
                        var segmentStatus = InsertedElement.parentNode.firstChild.className
                        var segmentArea = e.relatedNode
                        var sourceSegment = cth.dom.sourceDoc.getElementById(segmentArea.id)
                        var sourceSegmentText = sourceSegment.firstChild.cloneNode(true)
                        var targetSegment = cth.dom.targetDoc.getElementById(segmentArea.id)
                        var targetSegmentText = targetSegment.firstChild.cloneNode(true)
                        var sourceStripped = sourceSegmentText.innerHTML
                        var targetStripped = targetSegmentText.innerHTML
                        for (var i = 0; i < cth.regexesLength; i += 2) {
                            sourceStripped = sourceStripped.replace(regexes[i], regexes[i + 1])
                            targetStripped = targetStripped.replace(regexes[i], regexes[i + 1])
                        }
                        var errorOutput = ''
                        errorOutput += '<span style="font-weight:normal">'

                        if (cth.option.GENERAL_GLOSSARY_ACTIVE === true) {
                            addGeneralGlossary(sourceStripped, errorOutput)
                        }

                        if (product[0] === gDoubleClickforPublishersDict) {
                            addGlossary()
                        } else if (product[0] === gLegalDict) {
                            addGlossary()
                        }
                        else if (product[0] === gAdWordsDict) {
                            addGlossary()
                        }

                        errorOutput += '<\/span>'
                        if (typeof errorOutput !== 'undefined') {
                            sourceSegmentText.innerHTML = errorOutput
                            sourceSegmentText.className = 'QA'
                            sourceSegmentText.id = 'tempGlossaryText'
                            sourceSegmentText.style.color = '#000000'
                            sourceSegmentText.style.background = '#FFFFFF'
                            InsertedElement.insertBefore(sourceSegmentText, InsertedElement.firstChild)
                        }

                        if (clickArray.length > 0) {
                            for (i = 0; i < clickArray.length; i++) {
                                if (cth.dom.targetDoc.getElementById('gloss_' + clickArray[i])) {
                                    cth.dom.targetDoc.getElementById('gloss_' + clickArray[i]).addEventListener('click', function () {
                                        logger.log(localStorage.getItem(this.id))
                                        if ((!localStorage.getItem(this.id))) {
                                            logger.log('Setting item ' + this.id)
                                            localStorage.setItem(this.id, '1')

                                            this.style.background = '#E3F5FF'
                                            $('#transarea iframe').contents().find(this).wrapInner('<strike />')
                                        } else if (localStorage.getItem(this.id)) {
                                            logger.log('Removing item ' + this.id)
                                            localStorage.removeItem(this.id)
                                            $('#transarea iframe').contents().find(this).unwrapInner()
                                            this.style.background = '#B0E2FF'
                                        }
                                    })
                                }
                            }
                        }
                    }
                } else if (cth.option.GLOSSARY_TOGGLE === false) {
                    var InsertedElement = e.target
                    if (InsertedElement.className === 'gtc-trans-inline-cont goog-inline-block') {
                        var tempGlossaryText = cth.dom.targetDoc.getElementById('tempGlossaryText')
                        if (tempGlossaryText !== null) {
                            tempGlossaryText.parentNode.removeChild(tempGlossaryText)
                        }
                        var GtcTranslatableColor = InsertedElement.parentNode.firstChild.style.color
                        InsertedElement.style.borderColor = InsertedElement.parentNode.firstChild.style.color
                        InsertedElement.style.borderWidth = '1px'
                    }
                }
                function addGlossary() {
                    for (var x = 0; x < product.length; x++) {
                        logger.log('now going through ' + productNameShort[x])
                        for (var i = 0; i < product[x].length; i++) {
                            var start = product[x][i].DEF.substring(0, 10)
                            var end = product[x][i].DEF.substring(product[0][0].DEF.length - 10)
                            var SourceStrippedLC = sourceStripped.toLowerCase()
                            var englishLC = product[x][i].EN.toLowerCase()
                            var combinedForm = product[x][i].EN + product[x][i].NO + start + end
                            var storageForm = 'gloss_' + product[x][i].EN + product[x][i].NO + start + end
                            if (localStorage.getItem(storageForm) === '1') {
                                    // if (product[x][i].EN in localStorage) { <--- poor way that doesn't account for conflicts between key names and object methods (e.g. "key")
                                    //	logger.log("Glossary item " + product[x][i].EN + " omitted because it was found in localStorage.gloss");
                            } else {
                                if ((SourceStrippedLC.indexOf(englishLC) >= 0) && ((product[x][i].EN.length > 0))) {
                                    errorOutput += '<span id="gloss_' + combinedForm + '" style="background-color: #B0E2FF" data-tooltip="' + '(' + product[x][i].CLASS + ') ' + product[x][i].DEF + ' [' + product[x][i].DATE + ']" data-tooltip-position="left">' + productNameShort[x] + ' Gloss.: ' + product[x][i].EN + ' → ' + prodotto[cth.dom.docInfo.getDocLanguage()](x, i) + '<\/span>\r\n'
                                    clickArray.push(combinedForm)
                                }
                            }
                        }
                    }
                }

                function addGeneralGlossary() {
                    for (var i = 0; i < gGeneralDict.length; i++) {

                        var modifiedEN

                            // Filter stuff resulting in RegEx problem
                        if (gGeneralDict[i].EN.match(/^[A-Z0-9]$/)) {
                            logger.log('Not altering this acronym [A-Z0-9])')
                        } else if (gGeneralDict[i].EN.length > 5) {
                            modifiedEN = cth.tool.wrapBorders.new(gGeneralDict[i].EN)
                        } else {
                            modifiedEN = new RegExp(gGeneralDict[i].EN, 'i')
                        }
                        if (gGeneralDict[i].EN.match(/\./)) {
                            gGeneralDict[i].EN = gGeneralDict[i].EN.replace('\.', '\\.')
                        }
                        if (gGeneralDict[i].EN.match(/\+/)) {
                            gGeneralDict[i].EN = gGeneralDict[i].EN.replace('\+', '\\+')
                        }

                        var start = gGeneralDict[i].DEF.substring(0, 10)
                        var end = gGeneralDict[i].DEF.substring(gGeneralDict[i].DEF.length - 10)
                        var combinedForm = gGeneralDict[i].EN + gGeneralDict[i].NO + start + end
                        var storageForm = 'gloss_' + gGeneralDict[i].EN + gGeneralDict[i].NO + start + end
                        if (localStorage.getItem(storageForm) === '1') {
                                //	logger.log("Glossary item " + gGeneralDict[i].EN + " omitted because it was found in localStorage.gloss");
                        } else {
                                /*if (gGeneralDict[i].EN.indexOf("\+") >= 0) {
                                 logger.log("Unexpected + found in " + gGeneralDict[i].EN);
                                 if ((SourceStripped.indexOf(gGeneralDict[i].EN) >= 0) && ((gGeneralDict[i].EN.length > 0))) {
                                 errorOutput += "<span id=\"gloss_" + combinedForm + "\" style=\"background-color: #B0E2FF\" data-tooltip=\"" + "(" + gGeneralDict[i].CLASS + ") " + gGeneralDict[i].DEF + " [" + gGeneralDict[i].DATE + "]\" data-tooltip-position=\"left\">" + "General Gloss.: " + gGeneralDict[i].EN + " → " + gGeneralDict[i].NO + "<\/span>\r\n";
                                 clickArray.push(combinedForm);
                                 }
                                 } */
                            if ((sourceStripped.match(gGeneralDict[i].EN)) && ((gGeneralDict[i].EN.length > 0))) {
                                errorOutput += '<span id="gloss_' + combinedForm + '" style="background-color: #B0E2FF" data-tooltip="' + '(' + gGeneralDict[i].CLASS + ') ' + gGeneralDict[i].DEF + ' [' + gGeneralDict[i].DATE + ']" data-tooltip-position="left">' + 'General Gloss.: ' + gGeneralDict[i].EN + ' → ' + gGeneralDict[i].NO + '<\/span>\r\n'
                                clickArray.push(combinedForm)
                            }
                        }
                    }
                }

                function addGeneralGlossaryOther() {
                    for (var i = 0; i < gGeneralDict.length; i++) {
                        var SourceStrippedLC = sourceStripped.toLowerCase()
                        var englishLC = gGeneralDict[i].EN.toLowerCase()
                        var combinedForm = gGeneralDict[i].EN + gGeneralDict[i].NO
                        var storageForm = 'gloss_' + gGeneralDict[i].EN + gGeneralDict[i].NO
                        if (localStorage.getItem(storageForm) === true) {
                            logger.log('Glossary item ' + gGeneralDict[i].EN + ' omitted because it was found in localStorage.gloss')
                        } else {
                            if ((SourceStrippedLC.indexOf(englishLC) >= 0) && ((gGeneralDict[i].EN.length > 0))) {
                                errorOutput += '<span id="gloss_' + combinedForm + '" style="background-color: #B0E2FF" data-tooltip="' + '(' + gGeneralDict[i].CLASS + ') ' + gGeneralDict[i].DEF + ' [' + gGeneralDict[i].DATE + ']" data-tooltip-position="left">' + 'General Gloss.: ' + gGeneralDict[i].EN + ' → ' + gGeneralDict[i].NO + '<\/span>\r\n'
                                clickArray.push(combinedForm)
                            }
                        }
                    }
                }

                jQuery.fn.extend({ // Delete children in a simple way.
                    unwrapInner: function (selector) {
                        return this.each(function () {
                            var t = this,
                                c = $(t).children(selector)
                            if (c.length === 1) {
                                c.contents().appendTo(t)
                                c.remove()
                            }
                        })
                    }
                })
            }
        }
    }
})(window.cth, window)
// http://stackoverflow.com/questions/3733580/javascript-variable-in-function-name-possible
// http://stackoverflow.com/questions/494035/how-do-you-pass-a-variable-to-a-regular-expression-javascript
