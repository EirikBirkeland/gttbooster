const dom = require('../../5_init/init/doc-references').getDomRefs()

// TWEAK: Allow customization by user ... settings screen tab
export function highlightTextItems() {

   const description = dom.targetDoc.getElementsByClassName('messageHeader')
   const myArray = [
      '[0-9]+ characters',
      '[0-9]+ chars',
      'scope of the api',
      'do not translate',
      'should not be translated',
      'leave in English',
      'third party',
      'CHAR[-_ ]LIMIT=[0-9]+'
   ]
   for (let i = 0; i < description.length; i++) {

      for (let j = 0; j < myArray.length; j++) {

         let regexified = `(${myArray[j]})`
         regexified = new RegExp(regexified, 'i')
         description[i].innerHTML = description[i].innerHTML.replace(regexified, `<span style='color:#${window.cth.option.descHighlight}'><b><u>$1</u></b></span>`)

      }

   }

}