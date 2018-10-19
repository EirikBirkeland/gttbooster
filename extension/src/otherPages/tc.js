import {ChromeProxy} from '../model/ChromeProxy';
import $ from 'jquery';
import {notifier} from '../workbench/2_classes/notifier';

window.$ = $;

export default function addButton () {
   if (!location.href.match(/btviewer\/search\?/)) {
      return;
   }

   const $buttonRows = $('[action=searchresult]').find('[name=download]').parent();

   const $buttonToInsert = $('<button/>').html('Use current URL as default settings in GTT Booster').attr('title', 'If you click this button, the current URL will be used next time you refresh a GTT document and click the TC icon in the upper right.').attr('type', 'button');

   const $topButton = $buttonToInsert.clone().click(fn);
   const $bottomButton = $buttonToInsert.clone().click(fn);

   function fn (e) {
      ChromeProxy.storage.local.set({'tc-override': location.href}, () => {
         ChromeProxy.storage.local.get('tc-override', (res) => {
            if (res['tc-override']) {
               notifier.info('Saved successfully.');
            }
         });
      });
   }
   $($buttonRows[0]).append($topButton);
   $($buttonRows[1]).append($bottomButton);
}
