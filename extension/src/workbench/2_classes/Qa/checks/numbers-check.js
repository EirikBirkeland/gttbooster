// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 23.07.2016.
 */

import {stripPlaceholders} from '../../tool'
import XRegExp from 'xregexp'

const debug = require('cth-debug')(__filename)

const NumberCheck = (() => {

   // FIXME: Add support for e.g. 00:00 or 08:29
   function convertTo24Hour(time) {

      const hours = parseInt(time.substr(0, 2))
      if (/am/i.test(time) && hours === 12) {

         time = time.replace('12', '0')

      } else if (/pm/i.test(time) && hours < 12) {

         time = time.replace(hours, hours + 12)

      }
      return time.replace(/\s*(?:am|pm)/i, '')

   }

   let options = {
      "decimalMark": {
         "source": '\\.',
         "target": ','
      },
      "thousandsSeparator": {
         "source": ',',
         "target": ' '
      },
      "timeSeparator": {
         "source": ':',
         "target": '.'
      },
      "permissive": true, // Unimplemented
      "checkOrder": true,
      "ignoreNumbers": [
         1,
         2,
         3,
         4,
         5,
         6,
         7,
         8,
         9,
         10,
         11,
         12,
         13
      ] // Unimplemented
   }

   // Returning an object instead of creating an object first allows for dynamic definition of variables according to state of `options` when invoked.
   function patterns() {

      const unit = '[ ]?(?:kb|mb|gb|tb|mm|cm|m)'

      const source = {
         "time": `(?:10|11|12|[0-9])${options.timeSeparator.source}[0-5][0-9][ ]?(?:(?:am|AM)|(?:pm|PM))`,
         "floatThousands": `(?:[0-9]+[${options.decimalMark.source}${options.thousandsSeparator.source}]?)+`
      }

      const target = {
         "timeSep": `(?:[0-9]+[${options.timeSeparator.target}])+[0-9]+`,
         "float": `(?:[0-9]+[${options.decimalMark.target}]?)+`,
         "decimalThousands": `(?:[0-9]+[${options.thousandsSeparator.target}]?)+`,
         "spacesInLongNumber": /* Should I add another \\b? at the front */ '[0-9]{1,3}[ ](?:[0-9]{3}(?:[ ][0-9]{3}|\\b)+)+'
      }

      const shared = {"integer": /^[0-9]+$/}

      return {
         "source": {
            "time": new XRegExp(`^${source.time}$`),
            "integer": shared.integer,
            "float": new XRegExp(`^[0-9]+[${options.decimalMark.source}][0-9]*?`),
            "thousands": new XRegExp(`^(?:[0-9]+${options.thousandsSeparator.source}?)+$`),
            "extractNumbers": new XRegExp(`
                            \\b${source.time}\\b
                                  |
                            \\b${source.floatThousands}${unit}\\b
                                  |
                            \\b${source.floatThousands}\\b`, 'igx')
         },
         "target": {
            "time": new XRegExp(`${target.time}`),
            "integer": shared.integer,
            "float": new XRegExp(`^${target.float}$`),
            "thousands": new XRegExp(`^${target.decimalThousands}$`),
            "extractNumbers": new XRegExp(`
                            \\b${target.spacesInLongNumber}\\b
                                  |
                            \\b${target.timeSep}\\b
                                  |
                            \\b${target.float}(?:${unit}\\b|\\b)
                                  |
                            \\b${target.decimalThousands}\\b
                                  |
                            \\b${target.spacesInLongNumber}\\b`, 'igx')
         },
         "shared": {"isIpAddress": /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/}
      }

   }

   const isThousandsSrc = (x) => patterns().source.thousands.test(x)
   const isFloatSrc = (x) => patterns().source.float.test(x)
   const isTimeExpressionSrc = (x) => patterns().source.time.test(x)
   const isFollowedByUnit = (x) => (/[a-zA-Z]{2,3}/).test(x)

   return {

      /**
       * '
       * @param {string} srcStr
       * @param {string} trgStr
       * @param {object} [opts]
       * @return {object} results
       */
      compare(srcStr, trgStr, opts) {

         options = Object.assign(options, opts)

         const results = {
            "allFound": null,
            "orderValid": null,
            "missingNumbers": null, // Unimplemented
            "extraNumbers": null, // Unimplemented
            "sourceArray": [],
            "harmonizedArray": [],
            "targetArray": []
         }
         // Pretest, to see if there's any work to do.
         if (!(/0-9]/).test(srcStr) && !(/[0-9]/).test(trgStr)) {

            return results

         }

         // DONE: Placeholders should be stripped upon entering this function using a stripPlaceholders utility
         srcStr = stripPlaceholders(srcStr)
         trgStr = stripPlaceholders(trgStr)

         const srcArr = srcStr.match(patterns().source.extractNumbers)

         // Tmp return:
         if (!srcArr || srcArr.length <= 0) {

            return results

         }

         debug.debug(`srcArr: ${srcArr}`)
         const harmonizedArray = srcArr.map((x) => {

            debug.debug(x)
            debug.debug(`isTimeExpressionSrc: ${isTimeExpressionSrc(x)}`)
            debug.debug(`isThousandsSrc: ${isThousandsSrc(x)}`)
            debug.debug(`isFloatSrc: ${isFloatSrc(x)}`)
            return isTimeExpressionSrc(x) // Precedence is important ... and to determine this stuff, tests are crucial
               ? convertTo24Hour(x).replace(new XRegExp(options.timeSeparator.source, 'g'), options.timeSeparator.target)
               : isFloatSrc(x) && isFollowedByUnit(x)
                  ? x.replace(new XRegExp(options.decimalMark.source, 'g'), options.decimalMark.target).replace(/([0-9])([a-zA-Z])/, '$1 $2')
                  : isThousandsSrc(x)
                     ? x.replace(new XRegExp(options.thousandsSeparator.source, 'g'), options.thousandsSeparator.target).replace(/^([0-9])[ ]([0-9]{3})$/, '$1$2')
                     : x

         })

         debug.debug(`harmonizedArray: ${harmonizedArray}`)

         const trgArr = trgStr.match(patterns().target.extractNumbers) || [] // Just get an array for simplicity below .. otherwise the interpreter complains when no numbers were matched ...

         debug.debug(`trgArr: ${trgArr}`)

         if (harmonizedArray && trgArr && harmonizedArray.length > 0 && trgArr.length > 0) {

            results.allFound = harmonizedArray.slice().sort().join('') === trgArr.slice().sort().join('')

         }
         results.orderValid = harmonizedArray.join('') === trgArr.join('')
         results.sourceArray = srcArr
         results.harmonizedArray = harmonizedArray
         results.targetArray = trgArr

         return results

      },
      getPatterns() {

         return patterns()

      }
   }

})()

export default NumberCheck
