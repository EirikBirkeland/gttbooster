import _ from 'lodash'
import {hashCode} from './getHashCode'

let $ = typeof window !== 'undefined' ? require('jquery') : require('cheerio')

/**
 *
 * @param {Object} documentForTesting - a Cheerio object for unit testing purposesp
 */
export function buildObject(documentForTesting) {

   if (documentForTesting) {

      $ = documentForTesting

   }

   const $nodeList = $('.gtc-tools-autosearch').find('.gtc-tool-right-floating').find('.gtc-glossary-content-holder').find('.gtc-glossary-match-holder')

   return _.map($nodeList, (item) => {

      const $sourceTerm = $(item).find('.gtc-glossary-sourceterm')
      const $targetData = $(item).find('.gtc-glossary-terms')

      return {
         $sourceTerm,
         "targetTerms": _.map($targetData, (x) => {

            const $container = $(x)
            const $targetTerm = $(x).find('.gtc-glossary-translation')
            const $partOfSpeech = $(x).find('.gtc-glossary-pos')
            const $product = $(x).find('.gtc-glossary-source')
            const $description = $(x).find('.gtc-glossary-description')

            const combined = $sourceTerm.text() +
               $targetTerm.text() +
               $partOfSpeech.text() +
               $product.text() +
               $description.text()

            return {
               $container,
               $targetTerm,
               $partOfSpeech,
               $product,
               $description,
               "hashedItem": hashCode(combined)
            }

         })
      }

   })

}