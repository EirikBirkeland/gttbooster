import levenshteinWeighted from 'fast-levenshtein'

/**
 *
 * @param tmString {string} - a suggestion?
 * @param sourceString {string} - a source string
 * @returns {number}
 */
export default function getRating(tmString, sourceString) {

   let percent = Math.abs(_fuzzy(tmString, sourceString))
   percent = Math.round(percent)
   percent += '%'
   return percent

   function _fuzzy(str1, str2) {

      let a
      if (str1.length < str2.length) {

         a = levenshteinWeighted.get(str1, str2) / str2.length

      } else {

         a = levenshteinWeighted.get(str1, str2) / str1.length

      }
      return 100 - a * 100

   }

}
