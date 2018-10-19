import _ from 'lodash';
import {Storage} from '../../../../model/GeneralStorage';
import {store} from '../../../options-index';
import postMessage from '../../../helpers/postMessage';
import showData from './showData';

const debug = require('cth-debug')(__filename);

/*
 * TODOz: Filter out symbols? Tricky. If the input is already reasonable, it should not be needed.
 * TODO: Improve handling of .dic files ... looks like a part needs to be stripped away.
 */

function convertDicFile (arr) {
   return arr.map((ele) => ele.replace(/\/.*?$/, ''));
}

export default function uploadFile (e) {
   e.stopPropagation();
   e.preventDefault();

   const files = Array.from(e.target.files); // FileList object

   const output = files.map((ele) => {
      debug.log(ele);
      return `<li>${ele.name}</li>`;
   });

   files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = function (e) {
         debug.log('this', this);
         debug.log('this.result', this.result);

         let words = this.result.split(/[\r\n\s]+/);

         debug.log(words);

         // Init notifier here, because DOM may not be ready if doing a standard import
         const {notifier} = require('../../../../workbench/2_classes/notifier');

         if (words.length < 100000) {
            if (/\.dic$/.test(file.name)) {
               words = convertDicFile(words);
            }
            const msg = 'Now saving ... Note that populating the database may take up to 10 second per 1000 entries.';
            notifier.info(msg);
            postMessage('info', msg);
            if (confirm('Words will be added to your currently selected spellcheck override (see "Always run spellcheck using this language")')) {
               Storage.set({"storeName": store.settings.spellcheckOverride[1]}, words, 1, debug.log);
            } else {
               const msg = 'Cancelled. No items were saved.';
               postMessage('info', msg);
            }
         } else {
            const msg = 'The provided file has more than 100 000 entries. Please break up your data into smaller files and try again.';
            notifier.warning(msg);
            postMessage('warning', msg);
            // Unimplemented: Print error message that too many items were provided, or display an alert screen that this might take a while.
         }
      };
      reader.readAsText(file);
   });
   _.delay(() => {
      showData(store.settings.spellcheckOverride[1]);
      _.delay(() => {
         showData(store.settings.spellcheckOverride[1]);
      }, 7000);
   }, 3000);
}
