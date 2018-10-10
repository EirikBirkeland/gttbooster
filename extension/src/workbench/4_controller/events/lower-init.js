import lowerEmitter from '../lowerEmitter';
import _ from 'lodash';

import { Glossaries } from '../../2_classes/Glossaries/Glossaries.js';
import { checkWhetherNew } from '../../2_classes/Glossaries/lib/checkWhetherNew';
import { updateTmView } from '../../2_classes/tm/updateTmView';
import { cleanupMt } from '../../2_classes/mt/clean-up-mt';

const debug = require('cth-debug')(__filename);

lowerEmitter.on('init', () => {
   checkWhetherNew();

   updateTmView();

   // Delay is to give the lower glossary portion some time to load
   _.delay(() => {
      // Glossaries.removeDuplicates()

      Glossaries.alphabetizeAndHighlight(window.cth.docInfo.produktNavn);

      if (window.cth.option.GLOSSARY_WINDOW_TOGGLE === true) {
         debug.log('Sending glossaries to background...');
         Glossaries.sendToBackground();
      }

      cleanupMt();
   }, 3000);
});
