/**
 * Created by Eirik on 08.09.2017.
 */

import _ from 'lodash'

let $ = require('jquery')

export function highlightRelevant(productName, document) {

   if (document) {

      $ = document

   }

   const relevant = [
      {
         "toFind": `Source: ${productName}`,
         "replace": productName,
         "color": 'blue'
      },
      {
         "toFind": 'Product Names',
         "toReplace": 'Product Names',
         "color": 'blue'
      },
      {
         "toFind": 'General',
         "toReplace": 'General',
         "color": 'blue'
      },
      { // Legal is not product-specific and should perhaps be included e.g. for the OnHub EULA
         "toFind": 'Legal',
         "toReplace": 'Legal',
         "color": 'blue'
      }
   ]

   const $target = $('.gtc-tools-autosearch').find('.gtc-glossary-source-name')
   _.forEach($target, (ele) => {

      _.forEach(relevant, ($_) => {

         if ($(ele).html().match(new RegExp($_.toFind))) {

            $(ele).html($(ele).html().replace(new RegExp(`(${$_.toReplace})`), `<span style="color:${$_.color}"><b>$1</b></span>`))

         }

      })

   })

}
