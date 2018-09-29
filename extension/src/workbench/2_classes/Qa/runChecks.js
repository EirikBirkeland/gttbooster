/**
 * TODO: Major cleanup needed here - "modernization"
 */

import $ from 'jquery'
import _ from 'lodash'

import consistencyCheck from './checks/consistencyCheck'
import runCharLimitCheck from './checks/charlimit-check'
import compareLengths from './checks/compareLengths'
import {runURLTest, targetEqualsSource} from './qa-misc'
import checkPlaceholders from './checks/checkPlaceholders'
import {runChecksCollection} from './lqa-run-test-collection/index'
import {convertPlaceholders} from '../Segment/convertPlaceholders'
import coreTests from './checks/coreChecks'
import * as LangSpecChecks from './checks/languageSpecific'
import {Dev} from '../Dev'

import nuclearPoweredFilter from './runChecks/nuclearPoweredFilter'
import assembleAndRenderOutput from './runChecks/assembleAndRenderOutput'

import {Segment} from '../Segment/Segment'

const debug = require('cth-debug')(__filename.replace(/^src\//, ''))

/**
 * Run tests
 * @param opts {Object}
 * @param {Object|Object[]} opts.sourceSegments - a list of DOM elements
 * @param {Object|Object[]} opts.targetSegments - a list of DOM elements
 * @param {Object[]} opts.dataElements - a list of tests
 * @param {Function} [opts.iterationCallback] - returns a signal to controller every time a segment has been iterated
 * @param {Function} [finalCallback] - a final callback after QA-ing all the segments
 */
export default function runChecks (opts, finalCallback) {
   let {sourceSegments, targetSegments, dataElements, iterationCallback} = opts

   // Wrap the segment reference in an array if single node reference and no length prop:
   if (!sourceSegments.length) {
      sourceSegments = [sourceSegments]
   }
   if (!targetSegments.length) {
      targetSegments = [targetSegments]
   }

   if (!sourceSegments || !targetSegments) {
      Dev(() => alert('runChecks executed with invalid input'))
      debug.warn('runChecks executed with invalid input.')
   }

   if (sourceSegments.length !== targetSegments.length) {
      return alert('QA failed! The arrays are not of the same length!')
   }

   const sourceStrippedArr = _.map(window.cth.dom.sourceSegments, ($_) => {
      const item = Segment.create($_)
      return item.innerWithConvertedPlaceholders
   })
   const targetStrippedArr = _.map(window.cth.dom.targetSegments, ($_) => {
      const item = Segment.create($_)
      return item.innerWithConvertedPlaceholders
   })

   window.cth.dom.sourceStrippedArr = sourceStrippedArr
   window.cth.dom.targetStrippedArr = targetStrippedArr

   const len = sourceSegments.length

   testRange()

   function sourceCheckWrapper (index, sourceStrippedArr, targetStrippedArr) {
      debug.group('sourceCheckWrapper')
      debug.log('consistency:')
      debug.log(`index: ${index}`)
      debug.log(`sourceStrippedArr: ${sourceStrippedArr.length}`)
      debug.log(`targetStrippedArr: ${targetStrippedArr.length}`)

      const sourceCheck = consistencyCheck.init(index, sourceStrippedArr, targetStrippedArr)
      const tmp = sourceCheck.getReport()
      debug.log(`tmp: ${tmp}`)
      debug.groupEnd()
      return tmp
   }

   function testRange (index = 0) {
      const output = []
      output.nuclearPoweredFilter = nuclearPoweredFilter
      const segmentClass = targetSegments[index].firstChild.className
      // 2nd part after && is to avoid some segments getting multiple "Not translated" segments when edited by the user)
      if (segmentClass.match('goog-gtc-from-source')) {
         if (sourceSegments[index].childNodes[0].innerHTML === targetSegments[index].childNodes[0].innerHTML) {
            /*
             * TODO: Just disabled to avoid people seeing the repeating message if they try the tool!
             *     output.push("Not translated")
             */
         }
      } else {
         debug.log(sourceSegments[index])
         debug.log(targetSegments[index])

         const sourceStripped = convertPlaceholders(sourceSegments[index])
         const targetStripped = convertPlaceholders(targetSegments[index])

         debug.log(`sourceStripped: ${sourceStripped}`)
         debug.log(`targetStripped: ${targetStripped}`)

         const sourceSeg = Segment.create(sourceSegments[index])
         const targetSeg = Segment.create(targetSegments[index])

         // Remove any existing labels to prevent any duplicates:
         removeSourceLabels($(window.cth.dom.sourceDoc).find(`.cth-message${sourceSegments[index].id}`))
         removeTargetLabels($(window.cth.dom.targetDoc).find(`.cth-message${targetSegments[index].id}`))

         debug.log(sourceStripped)
         debug.log(targetStripped)

         const coreTestsFiltered = coreTests.filter((ele) => window.cth.option[ele.optionName] === true)

         {
            const res = runChecksCollection(sourceStripped, targetStripped, coreTestsFiltered, window.cth.option)
            if (res) {
               _.forEach(res, (ele) => {
                  if (ele) {
                     output.push(`<span style="font-weight:normal;color:${ele.priority.textColor};background-color: ${ele.priority.bgColor}">${ele.result}</span>`)
                  }
               })
            }
         }

         if (window.cth.option.lengthValidation[0]) {
            output.nuclearPoweredFilter(compareLengths, sourceStripped, targetStripped, {"lengthPercent": window.cth.option.lengthValidation[1]})
         }

         if (window.cth.option.sourceTargetIdentical) {
            output.nuclearPoweredFilter(targetEqualsSource, sourceSeg, targetSeg)
         }

         output.nuclearPoweredFilter(runCharLimitCheck, $(sourceSegments[index]), $(targetSegments[index]), window.cth.dom.sourceDoc)


         // TODO: Clean up / move this logic (unit attributes should be excluded)
         if (!sourceSegments[index].id.match(/goog-gtc-unit-attr-.*/)) {
            output.nuclearPoweredFilter(
               sourceCheckWrapper,
               sourceSegments[index].id.replace(/.*?([0-9]+).*/, '$1') - 1,
               // We just exclude unit-attr to avoid strange bug where attribute elements with an ID that corresponds to an ID that has inconsistency errors, gets tagged as being inconsistent
               window.cth.model.sourceSegments
                  .filter(seg => !seg.isUnitAttribute)
                  .map(seg => seg.innerWithConvertedPlaceholders),
               window.cth.model.targetSegments
                  .filter(seg => !seg.isUnitAttribute)
                  .map(seg => seg.innerWithConvertedPlaceholders)
            )
         }

         // Language-specific tests
         if (window.cth.option.extraSpacesBefore[0]) {
            output.nuclearPoweredFilter(LangSpecChecks.extraSpacesBefore, targetStripped, window.cth.option.extraSpacesBefore[1])
         }

         if (window.cth.option.forbiddenCharacters[0]) {
            output.nuclearPoweredFilter(LangSpecChecks.forbiddenCharacters, targetStripped, window.cth.option.forbiddenCharacters[1])
         }

         if (window.cth.option.endPunctuationMissing[0]) {
            output.nuclearPoweredFilter(LangSpecChecks.missingEndPunctuation, sourceStripped, targetStripped, window.cth.option.endPunctuationMissing[1])
         }

         if (window.cth.option.endPunctuationRedundant[0]) {
            output.nuclearPoweredFilter(
               LangSpecChecks.redundantEndPunctuation, sourceStripped,
               targetStripped, window.cth.option.endPunctuationRedundant[1]
            )
         }

         if (window.cth.option.consecutivePunctuation[0]) {
            output.nuclearPoweredFilter(LangSpecChecks.consecutivePunctuation, targetStripped, window.cth.option.consecutivePunctuation[1])
         }

         if (window.cth.option.validatePlaceholders) {
            output.nuclearPoweredFilter(checkPlaceholders, sourceStripped, targetStripped)
         }

         output.nuclearPoweredFilter(runURLTest, sourceStripped, targetStripped)
         
         if (!Array.isArray(dataElements) || !dataElements.length) {
            debug.log('dataElements is not an array or has a length of 0!')
         } else {
            const localize = runChecksCollection(sourceStripped, targetStripped, dataElements, window.cth.option)
            if (localize) {
               _.forEach(localize, (ele) => {
                  const string = `<span style="font-weight:normal;color:${ele.priority.textColor};background-color: ${ele.priority.bgColor}">${ele.result}</span>`
                  // FIXME: Sometimes multiple words is duplicated ... so this is a temporary way of avoiding that:
                  if (!output.includes(string)) {
                     output.push(string)
                  }
               })
            }
         }
      }

      if (userHasTurnedOffQa()) {
         return
      }

      if (output.length > 0) {
         debug.log(output)
         output.forEach((ele, i, arr) => {
            if (!ele.match(/^<span/)) {
               arr[i] = `<span class="bootstrap-wrapper"><span style="font-weight:normal;background-color: #${window.cth.option.noSeverity || 'wheat'}">${ele}</span></span>`
            }
         })
         assembleAndRenderOutput(output, targetSegments[index])
      }

      // Send signal that a segment has finished testing (callback?)
      if (iterationCallback) {
         iterationCallback(index, targetSegments)
      }

      // Check if any more segments to check.
      if (index + 1 < len) {
         _.delay(() => {
            testRange(++index)
         }, window.cth.option.QA_DELAY || 0)
      } else if (finalCallback) {
         finalCallback()
      }
   }
}

function userHasTurnedOffQa () {
   return Boolean(window.cth.option.WHOLE_DOC_QA_TOGGLE) === false
}

function removeSourceLabels ($sourceLabels) {
   if ($sourceLabels) {
      $sourceLabels.contents().unwrap()
   }
}

function removeTargetLabels ($targetLabels) {
   if ($targetLabels) {
      $targetLabels.remove()
   }
}