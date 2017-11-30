// @flow

// Is there a smoother way to do this?

/**
 *
 * @param {string} propertyName
 * @return {function(*): boolean}
 */
export const upperCaseFilterAccordingToProp = function (propertyName: string) {

   return (ele: Object) => ele[propertyName].charAt(0) === ele[propertyName].charAt(0).toUpperCase()

}

/**
 *
 * @param {string} propertyName
 * @return {function(*): boolean}
 */
export const lowerCaseFilterAccordingToProp = function (propertyName: string) {

   return (ele: Object) => ele[propertyName].charAt(0) === ele[propertyName].charAt(0).toLowerCase()

}

/**
 *
 * @param {string} propertyName
 * @returns {function(Object, Number, Object): boolean}
 */
export const uniqFilterAccordingToProp = function (propertyName: string) {

   return (x: Object, i: Number, arr: Object) => {

      if (!x[propertyName]) {

         return false

      }
      return arr.map((y) => y[propertyName]).indexOf(x[propertyName]) === i

   }

}