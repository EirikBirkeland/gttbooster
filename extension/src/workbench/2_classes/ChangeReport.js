import _ from 'lodash'
// Import {Storage} from '../model/GeneralStorage'
import GoogleDiff from 'diff-match-patch'
import {customPrettyHtml} from './custom-pretty-html'

/*
 * For reference:
 * cth.docInfo.docStatusOnLoad
 */

// TODO maybe: Add support for diffing two saved documents, e.g. "In copy edit" and "Pending"

const ChangeReport = {

   /**
    *
    * @param {NodeList|Array} documentStrings - strings to use for first comparison
    * @param {Object} storageObject - an object containing stored data (i need a scheme or something - internal validation will be important to ensure valid data is inserted).
    */
   init (documentStrings, storageObject) {
      this.documentStrings = documentStrings
      this.cache = storageObject
   },

   addDocumentSnapshot (storeDocState, content) {
      this.cache[storeDocState] = {
         content,
         "addedDate": Date.now()
      }
   },

   /**
    *
    * @param {string} storeDocState - In translation|Completed|Translation complete|In review|In copy edit|Pending
    */
   getDiffedStrings (storeDocState) {
      if (!this.cache[storeDocState]) {
         throw new ReferenceError('Invalid cache key.')
      }

      const docStrings = this.cache[storeDocState].content

      // Return a map for debug output for now
      return _.map(this.documentStrings, (targetSeg, index) => createDiffString(docStrings[index], targetSeg))

      function createDiffString (str1, str2) {
         const dmp = new GoogleDiff()

         const diffWords = dmp.diff_main(str1, str2)
         dmp.diff_cleanupSemantic(diffWords)

         return customPrettyHtml(diffWords)
      }
   }
}

export {ChangeReport}
