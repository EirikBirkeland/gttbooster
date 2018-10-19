import $ from 'jquery';
import _ from 'lodash';
import { Storage } from '../../../model/GeneralStorage';
import getLanguageToUse from './getLanguageToUse';

const debug = require('cth-debug')(__filename);

export default function addContextMenu () {
   const $contextMenu = $(window.cth.dom.targetDoc).find('#cth-contextMenu');

   if (!$contextMenu.length) {
      $(window.cth.dom.targetDoc.body).append(`
<div class="bootstrap-wrapper">
    <ul id="cth-contextMenu" class="dropdown-menu" role="menu" style="display:none">
        <li style="cursor:pointer" id="cth-add-exception">Add as exception</li>
    </ul>
</div>`);
   }

   $(window.cth.dom.targetDoc).on('contextmenu', '.cth_redWiggle', (e) => {
      const $contextMenu = $(window.cth.dom.targetDoc).find('#cth-contextMenu');

      $contextMenu.css({
         "display": 'block',
         "left": e.pageX,
         "top": e.pageY
      });

      $contextMenu.on('click', function () {
         $(this).hide();
      });

      $contextMenu.on('click', () => {
         debug.log(e);
         window.cth.latestEvent = e;
         const rightclickedWord = e.currentTarget.innerText;

         // TODO: The StorageOld api should be changed to {storeName: abc, key: abc, value: abc, cb: abc)
         Storage.set({ "storeName": getLanguageToUse() }, rightclickedWord, 1, debug.log);

         const redWiggles = $(window.cth.dom.targetDoc).find('.cth_redWiggle');
         _.forEach(redWiggles, (ele) => {
            if (ele.innerHTML === rightclickedWord) {
               $(ele).contents().unwrap();
            }
         });
      });

      $('body').on('click', () => $(window.cth.dom.targetDoc).find('#cth-contextMenu').hide());
      $(window.cth.dom.sourceDoc).on('click', () => $(window.cth.dom.targetDoc).find('#cth-contextMenu').hide());
      $(window.cth.dom.targetDoc).on('click', () => $(window.cth.dom.targetDoc).find('#cth-contextMenu').hide());

      return false;
   });
}
