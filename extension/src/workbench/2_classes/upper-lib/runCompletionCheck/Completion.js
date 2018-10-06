/* globals chrome MutationObserver */
import $ from 'jquery';
import _ from 'lodash';

import deepmerge from 'deepmerge';

import {Storage} from '../../../../model/GeneralStorage';
import changeTitleIcon from './Completion/changeTitleIcon';

const debug = require('cth-debug')(__filename.replace(/^src\//, ''));

export default class CompletionCheck {
   constructor () {
      this.storeName = 'completionCheck';
      this.projectStatus = {};
      this.found = {};
      this.docName = window.cth.docInfo.dokNavn.innerHTML;
      this.$fileButton = $('.goog-inline-block.goog-imageless-menu-button.gtc-share-menu-button');
      // This.removeOld()
   }

   retrieveStatusFromDocument () {
      const projectStatus = this.projectStatus;

      const str = _retrieveStatusFromDoc.call(this);

      if (str) {
         projectStatus.status = (() => {
            if (str.match(/In translation|google.com:In translation/)) {
               return 'In translation';
            }
            if (str.match(/Translation complete|google.com:Translation complete/)) {
               return 'Translation complete';
            }
            if (str.match(/Completed|google.com:Completed/)) {
               return 'Completed';
            }
            if (str.match(/In review|google.com:In review/)) {
               return 'In review';
            }
            if (str.match(/In copy edit|google.com:In copy edit/)) {
               return 'In copy edit';
            }
            if (str.match(/Pending|google.com:Pending/)) {
               return 'Pending';
            }
            debug.log('Couldn\'t detect status config for document.');
         })();
      }

      this.projectNumber = this.docName.match(/_([0-9]{6})_/) ? this.docName.match(/_([0-9]{6})_/)[1] : null;
      projectStatus.lastUpdated = Date.now().toString();

      return this;
   }

   updateStorage () {
      chrome.storage.local.get(this.projectNumber, (res) => {
         debug.log('Retrieved project status');
         debug.log('res: ', res);
         const mergedObjToSave = deepmerge(res, {[this.projectNumber]: {[this.docName]: this.projectStatus}});
         debug.log('mergedObjToSave: ', mergedObjToSave);

         debug.log('Saving as: ', mergedObjToSave);
         chrome.storage.local.set(mergedObjToSave, () => {
            debug.log('Saved project status');
         });
      });
      return this;
   }

   changeIconAccordingToCompletionState () {
      const status = this.projectStatus.status;

      if (!status) {
         return this;
      }

      const color = (/In copy edit/).test(status)
         ? 'orange'
         : (/Completed|Pending|Translation complete/).test(status)
            ? 'green' : '';

      const toAppend = $('<span/>')[0];
      toAppend.id = 'cth_docStatus';

      toAppend.innerHTML = `  ${status}`;
      toAppend.style.color = color;

      const statusLabel = $('#cth_docStatus')[0];
      if (statusLabel) {
         statusLabel.innerHTML = `  ${status}`;
         statusLabel.style.color = color;
      } else {
         window.cth.dom.docTitleBar.appendChild(toAppend);
      }

      if (status.match(/Completed|In review|Pending|Translation complete/i)) {
         changeTitleIcon('greenIcon');
      } else if (status.match(/copy edit/i)) {
         changeTitleIcon('yellowIcon');
      } else { // Red is to indicate that no work has been done, hence "need your attention!"
         changeTitleIcon('redIcon'); // Disabled this because some people may be confused by it.
      }

      return this;
   }

   runAll () {
      this.retrieveStatusFromDocument().changeIconAccordingToCompletionState().// TODO: Replace updateStorage with an event like "document state has changed" (oh hey, I made that already?), because the storing here is secondary to the Completion check - the data is simply stored in order to come available to VP. However, I'll need to make sure the event is provided with the relevant info from this document.
      updateStorage();
   }

   // TODO: I should somehow merge the below with the separate bodyEmitter ... elegantly
   /**
    *
    * @param {Function} [cb]
    */
   observeForStatusChange (cb) {
      const debouncedFn = _.debounce(this.runAll.bind(this), 100);
      const fileMenuButton = this.$fileButton[0];
      const config = {
         "characterData": true,
         "attributes": true
      };
      const observer = new MutationObserver((muts) => {
         _.forEach(muts, (ele) => {
            debouncedFn();
            // The new button may spawn
            const spawnedButton = $('.goog-buttonset-default.goog-buttonset-action');
            spawnedButton.on('click', () => {
               debug.log('clicked');
               _.delay(debouncedFn, 1000);
            });
         });

         _.delay(debouncedFn, 2000);
         _.delay(debouncedFn, 3000);
         _.delay(debouncedFn, 4000);
         _.delay(debouncedFn, 5000);
         _.delay(debouncedFn, 10000);
      });

      if (fileMenuButton) {
         observer.observe(fileMenuButton, config);
      } else {
         debug.log('the fileMenuButton doesn\'t exist');
      }
   }

   removeOld () {
      // Untested after reverting to chrome.storage from Storage:
      chrome.storage.local.keys({"storeName": this.storeName}, (all) => {
         _.forOwn(all, (val, key) => {
            if (Date.now() - all[key].timestamp >= 604800000) {
               Storage.remove(this.storeName, key, () => {
                  debug.log('Key removed.');
               });
            }
         });
      });
   }
}

/**
 *
 * @returns {string|null}
 * @private
 */
export function _retrieveStatusFromDoc () { // This first part with the button and event listeners needs debugging.
   const hiddenStatus = $('.goog-menuitem.goog-option.goog-option-selected.goog-menuitem-disabled'); // This.$fileButton
   let matchArr = [];
   const re = /(In translation|Completed|Translation complete|In review|In copy edit|Pending)/;

   if (hiddenStatus.length > 0) {
      const statusRow = hiddenStatus.text().match(re);
      if (statusRow && statusRow[0]) {
         matchArr = statusRow;
      }
   }

   if (matchArr && matchArr.length === 0) {
      const scriptArray = $('script');
      const configScript = _.find(scriptArray, (ele) => ele.innerHTML.match(/var config = {}/));
      if (configScript) {
         matchArr = configScript.innerHTML.match(/google.com:(In translation|Completed|Translation complete|In review|In copy edit|Pending)/);
      }
   }
   return matchArr ? matchArr[1] : null;
}