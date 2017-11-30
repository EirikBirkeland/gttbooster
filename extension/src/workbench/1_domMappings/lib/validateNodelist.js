import _ from 'lodash'

const debug = require('cth-debug')(__filename)

// Validate - ensure that all DOM nodes were found
export function validateNodes(obj) {

   _.forOwn(obj, (value, key) => {

      if (obj[key] === null || obj[key] === undefined) {

         // Use console.warn here instead of debug, because any error here could require developmental intervention.
         const str = `Info: keyname ${key} has the value ${value}`
         debug.warn(str)
         // Dev(() => alert(str))

      }

   })

}
