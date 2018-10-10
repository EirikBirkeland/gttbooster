/* global cth */
import $ from 'jquery'

export function convertAZippyToDiv () {
   $(cth.dom.targetDoc).find('a.zippy').each((o, elt) => {
      const newElt = $('<div class=\'a\'/>')
      Array.prototype.slice.call(elt.attributes).forEach((a) => {
         newElt.attr(a.name, a.value)
      })
      $(elt).wrapInner(newElt).children(0).unwrap()
   })
}
