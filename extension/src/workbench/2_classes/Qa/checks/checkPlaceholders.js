// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 26.07.2016.
 */

const debug = require('cth-debug')(__filename)

const getPlaceholders = (x) => x.match(/\{\/?[0-9]+\}|\{[0-9]+\/\}/g) // Simply saved as string because it will be concatenated below.

/**
 *
 * @param {string} srcStr
 * @param {string} trgStr
 * @return {object} results
 */
export default function checkPlaceholders(srcStr, trgStr) { // Input should be in placeholder format

   const results = {
      "allFound": null,
      "orderValid": null
   }

   const srcArr = getPlaceholders(srcStr)

   if (!srcArr || srcArr.length <= 0) {

      return null

   } // Tmp return

   debug.log(`srcArr: ${srcArr}`)

   const trgArr = getPlaceholders(trgStr) || []
   debug.log(`trgArr: ${trgArr}`)

   if (srcArr) {

      if (srcArr.length > 0) {

         results.allFound = srcArr.slice().sort().join('') === trgArr.slice().sort().join('')

      }
      if (srcArr.length > 0 && trgArr.length > 0) {

         results.orderValid = srcArr.join('') === trgArr.join('')

      }

   }

   results.sourceArray = srcArr
   results.targetArray = trgArr

   if (results.orderValid === false && results.allFound === false) {

      return 'Placeholder error [missing PHs, too many PHs or possibly invalid PH order.]'

   }
   if (results.orderValid === false && results.allFound === true) {

      return 'Placeholder order invalid'

   }
   return null

}
