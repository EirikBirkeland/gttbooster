import $ from 'jquery'
import _ from 'lodash'
import {buildObject} from './buildObject'

const debug = require('cth-debug')(__filename)

// These should be checked against the database for each key. If the "hashedItem" is a different value, the entire entry should be updated.
export function extractDbFormatEntries() {

   const $gloss = buildObject(window.$ || window.jQuery)
   debug.log('buildObject result: ', $gloss)

   if (!$gloss || !$gloss.length) {

      return

   }

   return _.map($gloss, (ele) => _.map(ele.targetTerms, (el) => {

      const productName = $(el.$product).text().replace(/^Source: (.*)/, '$1')
      const keyName = `${$(ele.$sourceTerm).text()}-${$(el.$targetTerm).text()}-${productName}`
      return {
         [keyName]: {
            "hashedItem": el.hashedItem,
            "lastUpdated": Date.now(),
            "sourceTerm": $(ele.$sourceTerm).text(),
            "targetTerm": $(el.$targetTerm).text(),
            "product": productName,
            keyName
         }
      }

   })).concatAll()

}