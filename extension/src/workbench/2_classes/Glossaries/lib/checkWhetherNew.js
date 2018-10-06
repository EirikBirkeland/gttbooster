import {buildObject, Glossaries} from '../Glossaries';
import {Storage} from '../../../../model/GeneralStorage';
import isNotOld from './checkWhetherNew/isNotOld';

import $ from 'jquery';
import _ from 'lodash';

const debug = require('cth-debug')('checkWhetherNew');

const indicateWithLabel = function (databaseObject, str, label) {
   const $nodeList = buildObject();

   _.forEach($nodeList, (item) => {
      const {$sourceTerm, targetTerms} = item;

      if ($sourceTerm.text() === databaseObject.sourceTerm) {
         _.forEach(targetTerms, (ele) => {
            const {$targetTerm, $product} = ele;

            if ($targetTerm.text() === databaseObject.targetTerm &&
               $product.text().replace(/^Source: (.*)/, '$1') === databaseObject.product) {
               if (!ele.$container.find(`.cth-${str}`).length) {
                  ele.$container.find('.gtc-glossary-source').after($('<span/>').addClass('bootstrap-wrapper').html(`<span data-database-name="${databaseObject.keyName}"
                                       title="Click to remove label for this item."
                                       style="cursor: pointer"
                                       class="cth-${str} label label-${label} cth-spacious">${str}</span>`.clean()));

                  debug.log(databaseObject);

                  // Button to close "NEW" label and update database
                  ele.$container.find('.label').click(function () {
                     this.remove();
                     updateDatastore();
                  });
               }
            }
         });
      }
   });
};

function updateDatastore () {
   Storage.get({"storeName": 'glossaries'}, $(this).attr('data-database-name')).then((existingEntry) => {
      if (window.cth.option.newGlossaryExpirationTime[1]) {
         existingEntry.lastUpdated = window.cth.option.newGlossaryExpirationTime[1] * 24 * 60 * 60 * 1000; // 8 days ago
      } else {
         existingEntry.lastUpdated = 60000000;
      }
      Storage.set({"storeName": 'glossaries'}, existingEntry.keyName, existingEntry).then((res) => {
         debug.log(res);
      });
   }).catch((err) => {
      debug.warn(err);
   });
}

export function checkWhetherNew () {
   debug.log('checkGlossaries()');

   const dbFormatEntries = Glossaries.extractDbFormatEntries();

   _.forEach(dbFormatEntries, (item) => {
      const key = Object.keys(item)[0];
      debug.log(`The key is: ${key}`);

      // If entry exists; check if the hash has changed
      Storage.get({"storeName": 'glossaries'}, key).then((res) => {
         debug.log('res:');
         debug.log(res);

         if (res === null || res === undefined) {
            debug.log('Res was null/undefined', res);
            Storage.set({"storeName": 'glossaries'}, key, item[key]).then((res) => {
               debug.log(res);
            });
            indicateWithLabel(item[key], 'NEW', 'success');
         } else {
            debug.log('res.hashedItem: ', res.hashedItem);
            debug.log('item[key].hashedItem: ', item[key].hashedItem);

            if (res.hashedItem !== item[key].hashedItem) {
               debug.log('Oh it has changed: ', res.hashedItem, item[key].hashedItem);
               // The item has changed, so 'changed' should be indicated
               indicateWithLabel(item[key], 'CHANGED', 'warning');
               // And naturally update the database
               Storage.set({"storeName": 'glossaries'}, key, item[key]).then((res) => {
                  debug.log(res);
               });
               // But if this is not the case, and if the item is not yet old
            } else if (isNotOld(res.lastUpdated, window.cth.option.newGlossaryExpirationTime[1])) {
               debug.log('Adding NEW label');
               // Indicate as new
               indicateWithLabel(item[key], 'NEW', 'success');
            } else { // Otherwise, do nothing at all
               debug.log('Doing nothing');
            }
         }
      }).catch((err) => debug.warn(err));
   });
}
