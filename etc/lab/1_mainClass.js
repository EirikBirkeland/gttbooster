// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2016/01/07.
 */

   // TODO: Make function that can output the difference between two nodelists at the first level.
   // _.difference([1,2,3], [2,3,4])
   // yields [1]
   // why doesn't it output 4 as well?
   // OK ._difference seems to compare contents at deep level, but i need a shallow comparison.
   // ( file in question is https://translate.google.com/toolkit/workbench?did=00ek7j600sb9urbzqccg&hl=en )

(function (cth, win) {
    'use strict'

    function replacePairwise(str, arr) {
        arr.forEach((element, pos, array) => {
            if (pos % 2 == 0)
                str = str.replace(new RegExp(array[pos], 'g'), array[pos + 1], 'g')
        })
        return str
    }


    // TODO: I definitely need classes / prototypes in here. I should practice a bit in my practice project first. Where was it hm.
    function onSegmentAreaModified() {
        $(cth.dom.targetDoc).keyup(function (event) {
            cth.dom.currentTargetSegment = cth.dom.currentTargetSegment || cth.dom.targetDoc.getElementById('goog-gtc-unit-1')
            logger.log('Keyup events registered')
         // Newer MutationObserver gives simpler / more granular control than old MutationEvents.
            const observer = new MutationObserver(function (mutations) {
                setTimeout(function () {
                    cth.action.runQA(cth.dom.currentSourceSegment, cth.dom.currentTargetSegment)
                }, 750)
                observer.disconnect()
            })
            const config = {attributes: true, childList: true, characterData: true, subtree: true}
            observer.observe(cth.dom.currentTargetSegment, config)
        })
    }

    var QA = (function () {
      // TODO: Figure out how to use:
        var runCheck = (fn, internalUse) => {
            if (internalUse = fn)
                output.push(internalUse)
        }

        var isSingleNode = (node)=>!!(!node.hasOwnProperty(length) && node.nodeType === 1)

      // this is part of preparation of arrays
        function validateArrayLengths() {
            if (this.sourceNodeList.length != this.targetSeg.length) {
                return alert('QA failed! The arrays are not of the same length!')
            }
        }

      // this is part of preparation of arrays
        var preProcess = (nodeList) => {
            let literals = getLiteral(nodeList)
            let stringsArr = literals.map((ele)=> {
                return replacePairwise(ele, cth.regexes)
            })
            function getLiteral(nodeList) {
                return [].map.call(nodeList, (ele)=> {
                    return ele.childNodes[0].innerHTML
                })
            }
            return stringsArr
        }

        class QA {
         // What to pass in when running QA... arrays, settings:
            constructor(sourceNodes, targetNodes) {
                this.sourceNodes = isSingleNode(sourceNodes) ? [sourceNodes] : sourceNodes
                this.targetNodes = isSingleNode(targetNodes) ? [targetNodes] : targetNodes
                this.sourceStr = preProcess(this.sourceNodes)
                this.targetStr = preProcess(this.targetNodes)
                this.segments = Array.apply(null, Array(this.sourceStr.length))
                this.output = []
            }

            targetEqualsSource(segNum) {
                let source = this.sourceStr[segNum]
                let target = this.targetStr[segNum]
                if (!this.targetNodes[segNum].firstChild.className.match('goog-gtc-from-source') && source === target && target.length > 10 && target.match(/\S+/g).length >= 3 && target.match(/[a-z]/)) {
                    this.output.push('Target equals source<br>')
                }
            }

            compareLengths(source, target) {
                let sourceStrippedWords = source.match(/\S+/g).length
                let targetStrippedWords = 0
                if (target.match(/\S+/g)) {
                    targetStrippedWords = target.match(/\S+/g).length
                }
                if ((source.length > 5) && (sourceStrippedWords > 2)) {
                    if (((source.length / target.length) > ((cth.option.lengthPercent / 100) || 1.75)) && (target.length > 0)) {
                        return 'Short target<br>'
                    } else if ((source.length / target.length) < 0.5) {
                        return 'Long target<br>'
                    }
                }
            }

      }
        return QA
    })()

    var myQa = new QA(cth.dom.sourceSegments, cth.dom.targetSegments)
    myQa.segments.forEach((unused, segNum)=> {
        myQa.targetEqualsSource(segNum)
      //myQa.runCoreTests(sourceStripped, targetStripped));
      //myQa.runCheck(compareLengths(sourceStripped, targetStripped));
      //myQa.runCheck(compareNumbers(sourceStripped, targetStripped));
      //myQa.runCheck(targetEqualsSource(sourceStripped, targetStripped, segmentClass));
    })
    var result = myQa.fetchResult()
    logger.log(result)


    cth.action.runQA = (sourceSeg, targetSeg) => {
      // This is the actual test run, to be mostly written outside the class itself.
        for (let i = 0, cachedLength = sourceSeg.length; i < cachedLength; i++) {

         //sourceStripped = sourceStripped.replace(/<[^>]+>/g, "");
         //targetStripped = targetStripped.replace(/<[^>]+>/g, "");

         // Run standard spreadsheet tests:
            let localize
            if (localize = runSpreadsheetTests(sourceStripped, targetStripped)) {
                for (let key of Object.keys(localize)) {
                    output.push('<span style="font-weight:normal;background-color:' + localize[key].priority + '">' + localize[key].result + '<br><\/span>')
                }
            }

            if (cth.option.spreadUntrans) {
                if (result = runSpreadsheetUntranslatablesTests(sourceStripped, targetStripped, sourceSeg[i], true)) {
                    output.push(result)
                }
            }

            self.runCheck(runNorwegianTests(targetStripped))
            self.runCheck(checkMåtePå(targetStripped))

            if (sourceSeg[i].id.match(/goog-gtc-unit-attr-[0-9]+/)) {
                self.runCheck(runURLTest(sourceStripped, targetStripped))
            }

            if (output.length > 0) {

            // Set wrapInHTML as an option to class
                (function wrapInHTML() {
                    output.forEach((item, pos, array) => {
                        if (!item.match(/^<span/)) {
                            array[pos] = '<span style="font-weight:normal;background-color:' + (('#' + cth.option.noSeverity) || 'wheat') + '">' + item + '<\/span>'
                        }
                    })
                })()

            // Highlighting stuff
                if (sourceSeg.length == 1 && targetSeg.length == 1) {
                    let transEditor = targetSeg[i].getElementsByClassName('gtc-trans-inline-cont goog-inline-block')[0]
                    let newResult = document.createElement('span')
               // comma test here with output. TODO: Figure out where to put this.
                    if (targetStripped.match(/[a-zæøå]+, [a-zæøå]+(,)(?= og [a-zæøå]+)/i)) {
                        let re1 = /[a-zæøå]+, [a-zæøå]+(,)(?= og [a-zæøå]+)/i
                        let reForLength = /([a-zæøå]+, [a-zæøå]+,(?= og [a-zæøå]+))/i
                        newResult.innerHTML = self.highlightWithRegex(targetStripped, re1, reForLength)
                        newResult.className = 'cth-tool-message' + targetSeg[i].id
                    }
                    $(transEditor).prepend(newResult)
                }
                self.assembleAndRenderOutput(output, targetSeg[i])
            }
        }
        document.getElementById('cth_btnid8').childNodes[0].src = cth.icons.binocularsOnState
    }

    cth.action.runQA.assembleAndRenderOutput = (output, targetNode) => {
        output = output.join('') // stringify array
        let outputNode = document.createElement('span')
        let br_insert = document.createElement('span')

        br_insert.innerHTML = '<br>'
        br_insert.className = 'cth-tool-message'
        br_insert.classList.add('cth-tool-message' + targetNode.id)
        outputNode.className = 'cth-tool-message' + targetNode.id
        outputNode.classList.add('cth-tool-message')
        outputNode.innerHTML = output
      /*TEMP*/
        outputNode.innerHTML = outputNode.innerHTML.replace(/^(?!<br>)/, '<br>') // Prepend a <br> if none available
      /*TEMP*/
        outputNode.innerHTML = outputNode.innerHTML.replace(/<br><\/span>$/, '</span>') // Remove trailing <br>

        targetNode.parentNode.insertBefore(br_insert.cloneNode(true), targetNode.nextSibling)
        targetNode.parentNode.insertBefore(outputNode.cloneNode(true), targetNode.nextSibling)
    }

    cth.action.runQA.removeSourceLabels = (node = null) => {
        let sourceLabels = node
        if (sourceLabels !== null)
            $(sourceLabels).contents().unwrap()
    }

    cth.action.runQA.removeTargetLabels = (node = null) => {
        let targetLabels = node
        if (targetLabels !== null)
            $(targetLabels).remove()
    }

    cth.action.runQA.highlightWithRegex = (str, reOriginal, reForLength) => {
        let re1Length = str.match(reForLength)[1].length
        let $1Length = str.match(reOriginal)[1].length
        let startIndex = reOriginal.exec(str).index
        let thePosition = startIndex + re1Length
        let arr = splitValue(str, thePosition - $1Length, $1Length)
        arr[1] = arr[1].replace(/(.*)/, '<span style=\'background-color: lightpink\'>$1</span>')
        return arr.join('')
        function splitValue(str, index, length) {
            return [str.substring(0, index), str.substring(index, index + length), str.substring(index + $1Length)]
        }
    }

    function runSpreadsheetUntranslatablesTests(source, target, oriSource, option) {
        let sourceMatchPattern
        let targetMatchPattern
        const myArray = []

        if (typeof cth.dataJSON === 'object' && Object.keys(cth.dataJSON).length >= 1) {
            for (let i = 0; i < cth.dataJSON.Untranslatables.elements.length; i++) {
                let a = cth.dataJSON.Untranslatables.elements[i]

                sourceMatchPattern = a.source_match_type == 'whole_word' ? '\\b' + a.term + '\\b' : a.term
                targetMatchPattern = a.target_match_type == 'whole_word' ? '\\b' + a.term + '\\b' : a.term

            // if source term starts with lowercase, make target matching insensitive
                if (/^[a-z]/.test(a.term)) {
                    targetMatchPattern = new RegExp(targetMatchPattern, 'i')
                }

                if ((a.toggle === 'on')) {
                    if (source.toLowerCase().indexOf(a.term.toLowerCase()) !== -1) {
                        if (source.match(sourceMatchPattern) && !target.match(targetMatchPattern)) {
                            myArray.push('<span style="font-weight:normal;background-color: lightgreen" data-tooltip="' + a.desc + ' (' + a.note + ')\r\n' + '" data-tooltip-position="left"><u>Untranslatable:\r\n' + a.term + ' is missing in target</u></span><br>')
                     // Direct source highlighting
                            if (option) {
                                let cached = cth.dom.sourceDoc.getElementsByClassName('cth-tool-message' + oriSource.id)
                                if (source.match(sourceMatchPattern) && !target.match(targetMatchPattern)) {
                                    sourceMatchPattern = sourceMatchPattern.replace(/ /g, '<span class="goog-gtc-inchars-highlight goog-gtc-inchars-space goog-gtc-highlight"> </span>')
                                    let re = new RegExp('(' + sourceMatchPattern + ')', 'i')
                                    let part1 = '<span class=\'cth-tool-message cth-tool-message' + oriSource.id + '\' style=\'background-color:pink\'>'

                                    if (cached.length == 0) {
                                        oriSource.firstChild.innerHTML = oriSource.firstChild.innerHTML.replace(re, part1 + '$1</span>')
                                    }
                                    else {
                              // logger.log("msg was already inserted, how kind of someone :) was it you?");
                                    }
                                } else {
                                    if (cached) {
                                        $(cached).contents().unwrap() // TODO: The unwrapping is not working?
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            logger.log('No spreadsheets could be found.')
        }
        let result = myArray.join('')
      //if (result.length > 0) logger.log(result);
        return result
    }

    function runSpreadsheetTests(sourceSeg, targetSeg, format) {
      // TODO: Add document analysis function, then choose glossaries based on content (e.g., determine whether it's an Ingress document.)

      // if (format == inSegment) {} else if (format == wholeDoc) {} // basically, the function should be passed a parameter depending on which output format is wanted.
        let sourceMatchPattern, targetMatchPattern, correctionMatchPattern, result = []


        if (Object.keys(cth.dataJSON).length === 0) {
            postErrorMsg()
        } else if ((typeof cth.dataJSON === 'object') && (Object.keys(cth.dataJSON).length >= 1)) {
            for (let i = 0; i < cth.dataJSON.Data.elements.length; i++) {
                let ss = cth.dataJSON.Data.elements[i]

            // TODO: Test this thoroughly and refine it
                if (ss.products && !ss.products.match(cth.dom.docInfo.getProductName())) {
               // Skipping test as it is not applicable to this product.
                    continue
                }

                let color = ss.priority == 'low' ? ('#' + cth.option.lowSeverity) || 'Lime' : ss.priority == 'med' ? ('#' + cth.option.medSeverity) || 'Yellow' : ('#' + cth.option.highSeverity) || 'LightPink'


                if (ss.toggle === 'on') { // First things first.

                    let invertSource = false, invertTarget = false

               // TODO: The below should be moved into a "create match patterns" function (helper function) or something -- after moving the tool stuff to a separate file.

               // TODO: The below needs MASSIVE cleaning up - lots of add hoc testing and edge cases (heck even some central cases are not propely accounted for). Moving to separate file and then keeping runQA + helped functions there should simplify everything (I expect 500-1500 lines in the long run just for central QA logic.)

                    correctionMatchPattern = ss.correction

                    if (ss.source_simple.match(/^-".*?"/)) { // Check if the source match should be inverted and strip the inversion data.
                        invertSource = true
                        sourceMatchPattern = ss.source_simple
                        sourceMatchPattern.replace(/^-"/, '')
                        sourceMatchPattern.replace(/"$/, '')
                    } else {
                        if (ss.flags == 'i') {
                            sourceMatchPattern = new RegExp(ss.source_simple, 'i')
                        } else {
                            targetMatchPattern = ss.source_simple
                        }
                        correctionMatchPattern = new RegExp(ss.correction, 'i')
                    }

                    if (ss.target_simple.match(/^-".*?"/)) { // Check if the source match should be inverted and strip the inversion data.
                        invertTarget = true
                        targetMatchPattern = ss.target_simple
                        targetMatchPattern.replace(/^-"/, '')
                        targetMatchPattern.replace(/"$/, '')
                    } else {
                        if (ss.flags == 'i') {
                            targetMatchPattern = new RegExp(ss.target_simple, 'i')
                        } else {
                            targetMatchPattern = ss.target_simple
                        }
                    }

                    if (ss.source_regex.length >= 1) {
                        sourceMatchPattern = ss.source_regex
                    } else {
                        if (ss.match_type === 'whole_word') {
                            sourceMatchPattern = cth.tool.wrapBorders.new(ss.target_simple)
                        } else {
                            sourceMatchPattern = ss.source_simple
                        }
                    }
                    if (ss.target_regex.length >= 1) {
                        targetMatchPattern = ss.target_regex
                    } else {
                        if (ss.match_type === 'whole_word') {
                            targetMatchPattern = cth.tool.wrapBorders.new(ss.target_simple)
                        } else {
                            targetMatchPattern = ss.target_simple
                        }
                    }

                    let tmpObj

                    const pushResult = (str) => {
                        tmpObj = {
                            result: str,
                            priority: color
                        }
                        result.push(tmpObj)
                    }

                    let missingInSourceMsg = 'The term \'' + ss.target_simple + '\' found in target, is not found in source!! '
                    if (ss.regex_type == 'XRegExp') {
                  // for RegExp
                        if (invertSource && !invertTarget) {
                            if (ss.target_simple.length >= 1) {
                                if (!XRegExp.match(sourceSeg, XRegExp(targetMatchPattern), 'one') && XRegExp.match(targetSeg, XRegExp(targetMatchPattern), 'one')) {
                                    pushResult(missingInSourceMsg)
                                }
                            }
                        }
                        else if (!invertSource && invertTarget) {
                            if (ss.target_simple.length >= 1) {
                                if (!XRegExp.match(sourceSeg, XRegExp(targetMatchPattern), 'one') && !XRegExp.match(targetSeg, XRegExp(targetMatchPattern), 'one')) {
                                    pushResult(missingInSourceMsg)
                                }
                            }
                        }
                        else if (invertSource && invertTarget) {
                            if (ss.target_simple.length >= 1) {
                                if (!XRegExp.match(sourceSeg, XRegExp(targetMatchPattern), 'one') && !XRegExp.match(targetSeg, targetMatchPattern, 'one')) {
                                    pushResult(missingInSourceMsg)
                                }
                            }
                        }

                  // Source only is empty
                        else if (ss.source_simple.length === 0 && ss.target_simple.length >= 1 && correctionMatchPattern.length >= 1) {
                            if (XRegExp.match(targetSeg, XRegExp(targetMatchPattern), 'one')) {
                        // Removing escape characters for the view output
                                pushResult(ss.target_simple.replace(/\\/, '') + '→' + correctionMatchPattern)
                            }
                        }
                  // Target only is empty
                        else if (ss.source_simple.length >= 1 && ss.target_simple.length === 0 && correctionMatchPattern.length >= 1) {
                            if (XRegExp.match(sourceSeg, XRegExp(ss.source_simple), 'one') && !XRegExp.match(targetSeg, XRegExp(correctionMatchPattern), 'one')) {
                                pushResult('The translation of ' + ss.source_simple + ' should be ' + correctionMatchPattern)
                            }
                        }
                  // All three conditions present
                        else if (ss.source_simple.length >= 1 && ss.target_simple.length >= 1 && ss.target_simple.length >= 1) {
                            if (XRegExp.match(sourceSeg, XRegExp(ss.source_simple), 'one') &&
                        XRegExp.match(targetSeg, XRegExp(targetMatchPattern), 'one')) {
                                pushResult(ss.target_simple + '→' + correctionMatchPattern)
                            }
                        } else if (correctionMatchPattern.length == 0) {
                            logger.warn(ss.target_simple + ' is missing a correction!')
                        } else {
                            logger.warn(ss)
                            logger.warn('is likely an invalid test! Are fields missing ...?')
                        }

                    } else {
                  // Inversions
                        if (invertSource && !invertTarget) {
                            if (ss.target_simple.length >= 1) {
                                if (!sourceSeg.match(targetMatchPattern) && targetSeg.match(targetMatchPattern)) {
                                    pushResult('The term \'' + ss.target_simple + '\' found in target, is not found in source!! ')
                                }
                            }
                        }

                        else if (!invertSource && invertTarget) {
                            if (ss.target_simple.length >= 1) {
                                if (sourceSeg.match(targetMatchPattern) && !targetSeg.match(targetMatchPattern)) {
                                    pushResult('The term \'' + ss.target_simple + '\' found in target, is not found in source!! ')
                                }
                            }
                        }

                        else if (invertSource && invertTarget) {
                            if (ss.target_simple.length >= 1) {
                                if (!sourceSeg.match(targetMatchPattern) && !targetSeg.match(targetMatchPattern)) {
                                    pushResult('The term \'' + ss.target_simple + '\' found in target, is not found in source!! ')
                                }
                            }
                        }

                  // Source only is empty
                        else if (ss.source_simple.length === 0 && ss.target_simple.length >= 1 && ss.correction.length >= 1) {
                            if (targetSeg.match(targetMatchPattern)) {
                        //Removing escape characters for the view output
                                pushResult(ss.target_simple.replace(/\\/, '') + '→' + correctionMatchPattern)
                            }
                        }

                  // Target only is empty
                        else if (ss.source_simple.length >= 1 && ss.target_simple.length == 0 && ss.correction.length >= 1) {
                            if (sourceSeg.match(ss.source_simple) && !targetSeg.match(correctionMatchPattern)) {
                                pushResult('The translation of ' + ss.source_simple + ' should be ' + correctionMatchPattern)
                            }
                        }

                  // All three conditions present
                        else if (ss.source_simple.length >= 1 && ss.target_simple.length >= 1 && ss.correction.length >= 1) {
                            if (sourceSeg.match(ss.source_simple) && targetSeg.match(targetMatchPattern)) {
                                pushResult(ss.target_simple + '→' + correctionMatchPattern)
                            }
                        } else if (ss.correction.length === 0) {
                            logger.warn(ss.target_simple + ' is missing a correction!')
                        } else {
                            logger.warn(ss)
                            logger.warn('is likely an invalid test! Are fields missing ...?')
                        }
                    }
                }
            }
        }
        return result

        function postErrorMsg() {
            if (!document.getElementById('cth_tmp542162')) {
                let message = document.createElement('span')
                message.innerHTML = '<br>Spreadsheet was not yet ready – running partial QA.'
                message.id = 'cth_tmp542162'
                message.style.color = 'blue'
                message.className = 'cth_testClass'
                win.cth.dom.gtcQuickbarTipParent.appendChild(message)
                setTimeout(function () {
                    let a = document.getElementById('tmp542162')
                    if (a) {
                        $(a).remove()
                    }
                }, 5000)
            }
        }
    }

    function runCoreTests(source, target) {
        let out = []
        for (let i = 0; i < cth.tests.coreTests.length; i++) {
            let test = cth.tests.coreTests[i]
            if (test.userDisable === true) continue
            if (test.Flags.match(/disabled/)) {
                continue
            } else if (test.Flags.match(/invertTarget/)) {
                if ((source.match(test.Source)) && (!target.match(test.Target))) {
                    out.push(test.Desc + '<br>')
                }
            } else if (test.Flags.match(/invertSource/)) {
                if ((!source.match(test.Source)) && (target.match(test.Target))) {
                    out.push(test.Desc + '<br>')
                }
            } else if ((source.match(test.Source)) && (target.match(test.Target))) {
                out.push(test.Desc + '<br>')
            }

        }
        return out.join('')
    }

   // SINGLE TESTS
    cth.action.toggleWholeDocQA = function toggleWholeDocQA() {
        var opt = cth.option

        if (opt.WHOLE_DOC_QA_TOGGLE === false) {
            opt.WHOLE_DOC_QA_TOGGLE = true
         // TODO: Maybe reactivate last bits below (filter visible). But first make sure documents are working fine.
            let sourceSegments = $(cth.dom.sourceDoc
            .querySelectorAll('.goog-gtc-unit:not(.cth_exclude)'))//.filter(':visible');
            let targetSegments = $(cth.dom.targetDoc
            .querySelectorAll('.goog-gtc-unit:not(.cth_exclude)'))//.filter(':visible');
            runCharLimitCheck(sourceSegments, targetSegments)
            cth.action.runQA(sourceSegments, targetSegments)
            onSegmentAreaModified()
        }
        else if (opt.WHOLE_DOC_QA_TOGGLE === true) {
            removeAllQaLabels()
        } else {
            throw new EvalError('cth.option.WHOLE_DOC_QA_TOGGLE doesn\'t exist')
        }
        function removeAllQaLabels() {
            $(cth.dom.sourceDoc).find('.cth-tool-message').contents().unwrap()
            $(cth.dom.targetDoc).find('.cth-tool-message').remove()
            cth.option.WHOLE_DOC_QA_TOGGLE = false
            $('#cth_btnid8').childNodes[0].src = cth.icons.binocularsOffState
        }
    }

    function runNorwegianTests(target) {
      // Note: String concatenation is about 10x faster in Chrome 47 compared with array pushing
      // MEMO: _.compact removes undefs from array
        return _.compact(_.map(cth.noHash, function (ele) {
            if (target.match(ele.Target))
                return ele.Desc + '<br>'
        })).join('')
    }

    function runURLTest(source, target) {
      // Limitation: This doesn't react when spaces only are incorrect ... not important, but wonder why.
        let out = ''
        if (target != source) {
            logger.log('URLs differ')
            out += 'URLs differ<br>'
        }
        if (target.match(/hl=en/)) {
            logger.log('URL is not localized')
            out += 'URL is not localized!<br>'
        }
        return out
    }

   // Needs more testing - some weird regex parsing error here. However, makeLiteral might have taken care of it already.
    function compareNumbers(source, target) {
        let $1 = source.replace(/.*?(\d{2,}).*/, '$1')
        let $2 = target.replace(/.*?(\d{2,}).*/, '$1')
      //logger.log($1 + "+" + $2);
        $1 = escape($1)
        if ($1.match(/(\d{2,})/) && !target.match($1)) { // this was the cause of the problem. $1 is treated as a regex here!  2015/07/13
            if (Math.round($1 * 2.54) === $2) {
                return 'Numbers do not match, but if this is an inch to cm conversion, you are correct: ' + $1 + ' x 2.54 = ' + ($1 * 2.54) + ', which rounds to ' + $2 + '.\r\n'
            }
        }
    }

    function checkMåtePå(str) {
        if (str.match(/måte/)) {
            let arr = str.split(/\./)
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].match(/\bmåte(?:ne|r|n)/) && !arr[i].match(/på/)) {
                    return '"' + arr[i] + '" contains \'måte\' but is missing på!'
                }
            }
        }
    }

   //    TODO: Add support for other char limit descriptions such as this:
   /* Subtitle of a hand curated collection.
    Max char length (English): 23 characters.
    Context: If Any Song You Want. Anytime translation goes over the English character count, please just cut the Anytime (So just Any Song You Want).

    "On us" refers to it being free. If "First 60 days on us" doesn't make sense, please translate as "First 60 days free"
    From project: Music Global - GPM Translations (60 Day)
    Contact: */
    function runCharLimitCheck(sourceSegments, targetSegments) {
        function normalize(str) {
            str = str.replace(/\r?\n/g, ' ')
            str = str.replace(/<span[^>]+> <\/span>/g, ' ') // preserve spaces
            str = str.replace(/<span[^>]+><\/span>/g, '') // strip empty PH
            str = str.replace(/<span[^>]+>.*?<\/span>/g, '') // strip all concrete PHs
            str = str.replace(/<bdi[^>]+>.*?<\/bdi>/g, '') // strip all concrete BDI PHs
            return str
        }

        for (let i = 0; i < targetSegments.length; i++) {
            let charLimit

         // Cool but needs refactor to be legible:
            let description = cth.dom.targetDoc.getElementById(targetSegments[i].id).parentNode.parentNode.innerHTML
            charLimit = description.match(/CHAR[ _]LIMIT.*?=([0-9]+).*?\]/) ? description.match(/CHAR[ _]LIMIT.*?=([0-9]+).*?\]/)[1] : charLimit = cth.dom.targetDoc.getElementById(targetSegments[i].id).parentNode.parentNode.innerHTML.match(/([0-9]+) characters/) ? cth.dom.targetDoc.getElementById(targetSegments[i].id).parentNode.parentNode.innerHTML.match(/([0-9]+) characters/)[1] : null

            let strippedTarget = normalize(targetSegments[i].firstChild.innerHTML)
            let strippedSource = normalize(sourceSegments[i].firstChild.innerHTML)

            if (charLimit && charLimit.match(/^[0-9]+$/) && typeof charLimit === 'string' && charLimit > 0 && strippedTarget.length > charLimit) {
            //  logger.log("[CHAR LIMIT] is " + charLimit + " for " + targetSegments[i].id + " and target segment length is " + strippedTarget.length);
            //  logger.log(targetSegments[i].id + ": " + strippedTarget);
                let toInsert = document.createElement('span')
                toInsert.style.background = 'red'
                toInsert.style.color = 'white'
                toInsert.innerHTML = 'CHAR LIMIT exceeded by ' + (strippedTarget.length - charLimit) + ' (above)'
                toInsert.className = 'cth-tool-message'
                cth.dom.targetDoc.getElementById(targetSegments[i].id).parentNode.parentNode.appendChild(toInsert)
            } else if (charLimit && charLimit.match(/^[0-9]+$/) && typeof charLimit === 'string' && charLimit > 0) {
                let toInsert2 = document.createElement('span')
                toInsert2.style.background = 'grey'
                toInsert2.style.color = 'white'
                toInsert2.innerHTML = '<br>The source length is ' + strippedSource.length + '.<br> The source limit is ' + charLimit + '.'
                toInsert2.className = 'cth-tool-message'
            // cth.dom.targetDoc.getElementById(targetSegments[i].id).parentNode.parentNode.appendChild(toInsert2);
            }
            charLimit = undefined
        }
    }

})(window.cth, window)