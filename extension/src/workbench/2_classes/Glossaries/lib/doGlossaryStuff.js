import {Glossaries} from '../Glossaries';

const debug = require('cth-debug')(__filename);

export function doGlossaryStuff () {
   // Glossaries.removeDuplicates()

   Glossaries.alphabetizeAndHighlight(window.cth.docInfo.produktNavn);

   if (window.cth.option.GLOSSARY_WINDOW_TOGGLE === true) {
      debug.log('Sending glossaries to background...');
      Glossaries.sendToBackground();
   }
}