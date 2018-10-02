import _ from 'lodash'
import xRegExp from 'xregexp'

import {contrastColor} from '../../tool'

require('../../xreg')()

const debug = require('cth-debug')(__filename)

const Stylez = {
   "html": {"code": (str) => `<strong><code>${str}</code></strong>`}
   // "ansi": {code: (str) => chalk.bold(str)}
}

/**
 *
 * @param {string} sourceSeg
 * @param {string} targetSeg
 * @param {Array<Object>} checksCollection
 * @param {Object} [opts]
 * @returns {Array}
 */
export function runChecksCollection (sourceSeg, targetSeg, checksCollection, opts) {
   if (!Array.isArray(checksCollection)) {
      throw new Error('checksCollection is not an array!')
   }

   opts = Object.assign({
      "lowSeverity": 'Lime',
      "medSeverity": 'Yellow',
      "highSeverity": 'LightPink',
      "addHighlighting": true,
      "output": 'html'
   }, opts)

   const Style = Stylez[opts.output]

   const result = []

   _.forEach(checksCollection, (ele, i) => {
      const test = ele

      if (test.toggle !== 'on') {
         return
      }

      if (!test.source_pattern && !test.target_pattern) {
         debug.warn(`Empty or incomplete test in spreadsheet, line ${i}`)
      }

      const messageBgColor = (() => {
         switch (test.priority) {
            case 'low':
               return `#${opts.lowSeverity}`
            case 'med':
               return `#${opts.medSeverity}`
            case 'high':
               return `#${opts.highSeverity}`
            default:
               return `#${opts.highSeverity}`
         }
      })()

      const messageTextColor = `#${contrastColor(messageBgColor.replace(/#/, ''))}`

      const _pushResult = (str) => {
         const tmpObj = {
            "result": str,
            "priority": {
               "bgColor": messageBgColor,
               "textColor": messageTextColor
            }
         }
         result.push(tmpObj)
      }

      if (test.products) {
         const tcProducts = xRegExp.escape(test.products).replace(/\\\|/g, '|')
         if (opts.produktNavn && !new RegExp(tcProducts).test(opts.produktNavn)) {
            debug.debug.log(`Skipping a test, spreadsheet row ${i + 2}, as it is not applicable to this product.`)
            return
         }
      }

      const config = {
         "invertSource": false,
         "invertTarget": false,
         "sourcePatternType": '',
         "targetPatternType": '',
         "sourceMatchPattern": test.source_pattern,
         "targetMatchPattern": test.target_pattern,
         "correctionMatchPattern": test.correction || test.message,
         "result": []
      }

      if (!config.sourceMatchPattern && !config.targetMatchPattern) {
         debug.warn(`A test is invalid, as both the source and target patterns evaluate to false. Please double-check row #${i} in your spreadsheet.`)
         return
      }

      _initVars(config, 'invertSource', 'sourcePatternType', 'sourceMatchPattern', test)
      _initVars(config, 'invertTarget', 'targetPatternType', 'targetMatchPattern', test)

      const {invertSource, invertTarget, sourceMatchPattern, targetMatchPattern, correctionMatchPattern} = config

      const smp = sourceMatchPattern
      const tmp = targetMatchPattern

      // Return if the user has forgotten to input smp/tmp
      if (smp.source === '(?:)' && tmp.source === '(?:)') {
         return debug.warn(`Test on line ${i + 2} of your Spreadsheet is toggled ON but contains no match patterns! You may wish to investigate these lines to ensure the tests are correct.`)
      }

      // Untrans handling:
      if (smp && !tmp && !correctionMatchPattern) {
         if (sourceSeg.indexOf(smp) !== -1 && !(targetSeg.indexOf(smp) !== -1)) {
            return _pushResult(`The untranslatable ${smp} is missing!`)
         }
      }

      const testCorrection = test.correction || test.message || ''; // support for legacy spreadsheets...

      // Everything else:
      if (!invertSource && !invertTarget) {
         const exp = /\[.*\]|\|/

         if (exp.test(smp) && exp.test(tmp)) {
            let allFound = false

            const srcArr = xRegExp.match(sourceSeg, xRegExp(smp), 'all')
            const trgArr = xRegExp.match(targetSeg, xRegExp(tmp), 'all')

            if (srcArr.length === 0 && trgArr.length === 0) {
               return
            }

            if (srcArr.length > 0 && trgArr.length > 0) {
               allFound = srcArr.slice().sort().join('') === trgArr.slice().sort().join('')
            }

            let msg = ''

            const orderValid = srcArr.join('') === trgArr.join('')

            if (allFound === false) {
               msg += `One or more elements matched by pattern ${tmp} are missing in the translation. `
            } else if (orderValid !== undefined) {
               if (orderValid === true) {
                  // Msg += "The order was correct."
               } else if (orderValid === false) {
                  msg += `The order was incorrect for pattern ${tmp}.`
               }
            }
            return _pushResult(msg)
         }

         if (xRegExp.test(sourceSeg, xRegExp(smp), 'one') &&
            xRegExp.test(targetSeg, xRegExp(tmp), 'one')) {
            // Note: New test syntax for moving matches to the 'correction'
            if (
               testCorrection.match(/\@{t1}/) &&
               xRegExp.match(targetSeg, xRegExp(tmp), 'one')
            ) {
               return _pushResult(testCorrection.replace(/\@{t1}/, xRegExp.match(targetSeg, xRegExp(tmp), 'one')))
            }

            return _pushResult(testCorrection ||
               `${Style.code(tmp.source || tmp)} is a mistranslation of ${Style.code(smp.source || smp || '<no entry>')}.`)
         }
      } else if (invertSource && !invertTarget) {
         if (!xRegExp.test(sourceSeg, xRegExp(smp), 'one') &&
            xRegExp.test(targetSeg, xRegExp(tmp), 'one')) {
            return _pushResult(testCorrection ||
               `${Style.code(smp.source || smp)} incorrectly translated as ${Style.code(tmp.source || tmp)}.`)
         }
      } else if (!invertSource && invertTarget) {
         if (xRegExp.test(sourceSeg, xRegExp(smp), 'one') &&
            !xRegExp.test(targetSeg, xRegExp(tmp), 'one')) {
            const standardMessage = (() => {
               if (smp === tmp) { // Return a simpler message when source and target are equal in the test
                  return `Untranslatable "${Style.code(smp)}" missing in translation.`
               }
               return `"${Style.code(smp.source || smp)}" found in source, but "${Style.code(tmp.source || tmp)}" not found in translation.`
            })()

            return _pushResult(testCorrection || standardMessage)
         }
         // NOTE: The following is an unlikely usage scenario, but who knows.
      } else if (invertSource && invertTarget) {
         if (!xRegExp.test(sourceSeg, xRegExp(smp), 'one') &&
            !xRegExp.test(targetSeg, xRegExp(tmp), 'one')) {
            return _pushResult(testCorrection ||
               `Source doesn't contain ${Style.code(smp.source || smp)}, and translation doesn't contain ${Style.code(tmp.source || tmp)}!`)
         }
      }
   })

   return result.filter((ele) => ele.result !== '')

   function capturify (re) {
      return re instanceof RegExp
         ? new RegExp(`(${re.source})`, re.flags)
         : new RegExp(`(${re})`)
   }

   function _initVars (obj, invert, patternType, matchPattern, ss) {
      // TODO: Remove "none" - makes no sense.
      const _isRegex = (a = 'none') => a.match(/^\/.*\/$/)
      const _isInverted = (a = 'none') => a.match(/^-".*"$/)

      if (_isInverted(obj[matchPattern])) {
         obj[invert] = true
         obj[matchPattern] = obj[matchPattern].replace(/^-"/, '').replace(/"$/, '')
      } else {
         obj[matchPattern] = obj[matchPattern]
      }

      if (_isRegex(obj[matchPattern])) {
         obj[matchPattern] = obj[matchPattern].replace(/^\/(.*)\/$/, '$1')
         obj[patternType] = 'regex'
      } else {
         obj[matchPattern] = xRegExp.escape(obj[matchPattern])
         obj[patternType] = 'literal'
         if (ss.match_type && ss.match_type === 'whole_word') {
            obj[matchPattern] = `\b${obj[matchPattern]}\b`
         }
         if (ss.case_sensitive && ss.case_sensitive === 'no') {
            obj[matchPattern] = new RegExp(obj[matchPattern], 'i')
         }
      }
   }
}
