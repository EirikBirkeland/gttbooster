// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2015/11/30.
 */
(function (cth, win) {
    'use strict'

    function runSingleQA(e) {
        var errorOutput = []
        var insertedElement = e.target
        var segmentArea = e.relatedNode

        var segmentStatus = insertedElement.parentNode.firstChild.className
        removeInserted(e.target, 'cth-tool-message') // Otherwise we get ever-expanding list of duplicate results.

        insertedElement.style.border = 'ridge'
        insertedElement.style.borderColor = insertedElement.parentNode.firstChild.style.color
        insertedElement.style.borderWidth = '2px'
        insertedElement.style.borderRadius = '5px'

        var sourceSegment = cth.sourceDoc.getElementById(segmentArea.id)
        var sourceSegmentText = sourceSegment.firstChild.cloneNode(true)

        var targetSegment = cth.dom.targetDoc.getElementById(segmentArea.id)
        var targetSegmentText = targetSegment.firstChild.cloneNode(true)

        var sourceStripped = sourceSegmentText.innerHTML
        var targetStripped = targetSegmentText.innerHTML

        for (var i = 0; i < cth.regexes.length; i += 2) { // Strip unnecessary HTML from segments
            sourceStripped = sourceStripped.replace(cth.regexes[i], cth.regexes[i + 1])
            targetStripped = targetStripped.replace(cth.regexes[i], cth.regexes[i + 1])
        }

        if (/^(?:\/|http)\S+$/.test(targetStripped)) {
            if (targetStripped != sourceStripped) {
                errorOutput.push('URL mismatch\r\n')
            }
        }

        logger.log('STRIPPED_SOURCE: ' + sourceStripped)
        logger.log('STRIPPED_TARGET: ' + targetStripped);

        (function () {
            var a = sourceStripped
            var b = targetStripped
            if (runAdvancedTestsSingle(a, b)) {
                errorOutput.push(runAdvancedTests(a, b))
            }
            if (compareNumbers(a, b)) {
                errorOutput.push(compareNumbers(a, b))
            }
            if (targetEqualsSource(a, b, segmentStatus)) {
                errorOutput.push(targetEqualsSource(a, b, segmentStatus))
            }
            /*if (runUntrans(a, b)) {
             errorOutput.push(runUntrans(a, b))
             }*/
            if (compareLengths(a, b)) {
                errorOutput.push(compareLengths(a, b))
            }
            if ((cth.dom.docInfo.getDocLanguage() === 'NO') && (!/goog-gtc-from-source/.test(segmentStatus.match))) {
                if (runTestCollection(a, b)) {
                    errorOutput.push(runTestCollection(a, b))
                }
                if (runSpreadsheetUntranslatablesTests(a, b)) {
                    errorOutput.push(runSpreadsheetUntranslatablesTests(a, b))
                }
            }
        })()

        if (typeof errorOutput !== 'undefined') {
            var toInsert = sourceSegmentText.cloneNode(true)
            toInsert.innerHTML = errorOutput
            toInsert.className = 'QA'
            toInsert.id = 'cth-tool-message'
            toInsert.style.color = '#000000'
            insertedElement.insertBefore(toInsert, insertedElement.firstChild)
        }
    }

    function runAdvancedTestsSingle(a, b) { // ACTION
        for (var i = 0; i < advancedHash.length; i++) {
            if (advancedHash[i].Flags.match(/disabled/)) {
                if ((a.match(advancedHash[i].Source)) && (!b.match(advancedHash[i].Target))) {
                }
            } else if (advancedHash[i].Flags.match(/invertTarget/)) {
                if ((a.match(advancedHash[i].Source)) && (!b.match(advancedHash[i].Target))) {
                    return advancedHash[i].Desc + '\r\n'
                }
            } else if (advancedHash[i].Flags.match(/invertSource/)) {
                if ((!a.match(advancedHash[i].Source)) && (b.match(advancedHash[i].Target))) {
                    return advancedHash[i].Desc + '\r\n'
                }
            } else if ((a.match(advancedHash[i].Source)) && (b.match(advancedHash[i].Target))) {
                return advancedHash[i].Desc + '\r\n'
            } else {
                if ((a.match(advancedHash[i].Source)) && (b.match(advancedHash[i].Target))) {
                    return advancedHash[i].Desc + '\r\n'

                    highlightStuff()

                    /* function highlightStuff() { // unused as of may 2015
                     if (advancedHash[i].Flags.match(/Highlighting/)) { // Stuff for perfect highlighting! :)
                     var TargetStrippedNew = targetStripped;
                     TargetStrippedNew = TargetStrippedNew.replace(advancedHash[i].Target, "<span style=\"font-weight:normal;background-color:#abffbe\">$1</span>");
                     errorOutput += TargetStrippedNew + "\r\n";
                     }
                     }*/
                }
            }
        }
    }

    // candidate for removal:
    function stripAllButTags(input) {
        input = input.replace(/[^{}0-9/]/g, '')
    }

})(window.cth, window)