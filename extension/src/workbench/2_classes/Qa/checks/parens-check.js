// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 16.08.2016.
 */

const ParensCheck = (() => {
   function compare (srcStr, trgStr) {
      const results = {
         "allFound": null,
         "orderValid": null,
         "missingParens": null, // Unimplemented
         "extraParens": null, // Unimplemented
         "sourceArray": [],
         "harmonizedArray": [],
         "targetArray": []
      }
      const brackets = /[{\[()\]}]/g

      const srcArr = srcStr.match(brackets)
      const trgArr = trgStr.match(brackets)

      if (srcArr && trgArr && srcArr.length > 0 && trgArr.length > 0) {
         results.allFound = srcArr.slice().sort().join('') === trgArr.slice().sort().join('')
      }
      results.orderValid = srcArr.join('') === trgArr.join('')

      return results
   }

   return {compare}
})()

export default ParensCheck
