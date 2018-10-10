import $ from 'jquery'
import {Spellcheck} from '../Spellcheck/Spellcheck'

export default function toggleSpellcheckLanguageIndication () {
   const a = '#cth-spellcheck-language-indication'
   if (!$(a).length) {
      const $div = $('<div/>').html(`<br>Current spellcheck language: <b>${Spellcheck.getLanguageToUse()}</b>. <a href="#">Change</a>`).attr('id', 'cth-spellcheck-language-indication').click(() => {
         chrome.runtime.sendMessage({
            "header": 'openOptionsPage',
            "suffix": '#menu4'
         })
      })
      $(cth.dom.wbmenu).append($div)
   } else {
      $(a).remove()
   }
}
