import _ from 'lodash'

/**
 *
 * @param {Node} sourceSegment - should be 100% match for target.
 * @param {Node} targetSegment - should be 100% match for source.
 */
function transplantPlaceholders(sourceSegment, targetSegment) {

}

// Temporary test version.
function convertPlaceholders(element, $ = $ || window.$) {

   let count = -1
   const prevSeen = 0
   let current = 0
   element = $(element).children()[0] // EXAMPLE: span.goog-gtc-translatable.goog-gtc-from-human

   return recurse(element)

   function recurse(elem) {

      if (!elem) {

         return

      }
      const childNodes = elem.childNodes
      let newString = ''
      _.forEach(childNodes, (ele) => {

         if (ele.tagName == 'SPAN' && $(ele).attr('class') && $(ele).attr('class').match('goog-gtc-glossary-highlight')) {

            newString += ele.textContent

         } else if (ele.nodeType === 1) {

            if (ele.tagName.match(/^(?:B|STRONG|EM)$/i)) {

               count++
               // This caching (countSaved) is necessary since the template string below is evaluated bit by bit, so that by the time countSaved is read a second time, it has already changed.
               const countSaved = count
               newString += `{${countSaved}}${recurse(ele)}{/${countSaved}}`

            } else if (ele.tagName.match(/^(?:BDI|SPAN)$/i) && $(ele).attr('class') && $(ele).attr('class').match('notranslate')) {

               count++
               newString += `{${count}/}`

            } else if (ele.tagName.match(/^SPAN$/i) && $(ele).attr('contenteditable') && $(ele).attr('contenteditable').match(/^false$/i)) {

               count++
               newString += `{${count}/}`

            } else if (ele.tagName.match(/^SPAN$/i) && $(ele).attr('class') && $(ele).attr('class').match('goog-gtc-inchars-space')) {

               newString += ' '

            } else if (ele.tagName.match(/^SPAN$/i) && $(ele).attr('class') && $(ele).attr('class').match('goog-gtc-inchars-nbsp')) {

               newString += ' '

            } else if ($(ele).attr('gtc:attrs')) {

               count++
               current = parseInt($(ele).attr('gtc:attrs').replace(/[^0-9]+/g, ''), 10)
               if (prevSeen === 0 || current === prevSeen + 1) {

                  const countSaved = count
                  // This should be converted to the next tag
                  newString += `{${countSaved}}${recurse(ele)}{/${countSaved}}`

               }

            } else {

               newString += $(ele)[0].innerHTML

            }

         } else if (ele.nodeType === 3) {

            newString += $(ele).text()

         } else {
            //  Alert(ele.nodeType)
         }

      })
      return newString

   }

}
