// @flow
import $ from 'jquery';
import _ from 'lodash';
import {Storage} from '../../../../model/GeneralStorage';

const debug = require('cth-debug')(__filename);

const showData = (() => {
   let flag = false;
   let dataSet;
   let table;

   return function (storeName: string) {
      if (!storeName) {
         $('#message').show();
         return debug.warn(`1st param provided to showData was: ${storeName}`);
      }

      $('#message').hide();

      Storage.keys({storeName}, (res) => {
         window.currentStoreName = storeName;
         dataSet = res.map((ele) => [ele]);

         const glossTable = $('#glossTable');

         if (!flag) {
            table = glossTable.DataTable({
               "data": dataSet,
               "columns": [
                  {
                     "title": 'Item',
                     "title2": 'abc'
                  }
               ]
            });

            flag = true;

            // TODO: What does this mean?
            glossTable.on('click', 'tbody tr', function () {
               if ($(this).hasClass('active')) {
                  $(this).removeClass('active');
               } else {
                  table.$('tr.selected').removeClass('active');
                  $(this).addClass('active');
               }

               const $button = $('#cth-delete-button');

               if ($('table .active').length > 0) {
                  $button.prop('disabled', false);
               } else {
                  $button.prop('disabled', true);
               }
            });

            $('#cth-delete-button').click(() => {
               const activeTableRows = table.rows('.active');
               _.forEach(activeTableRows.data(), (ele) => {
                  Storage.remove({"storeName": window.currentStoreName}, ele, debug.log);
               });
               activeTableRows.remove().draw(false);
            }).css({"display": ''});
            $('#cth-delete-all-button').click(() => {
               if (confirm('Are you sure you wish to close all exceptions?')) {
                  const activeTableRows = table.rows();
                  _.forEach(activeTableRows.data(), (ele) => {
                     Storage.remove({"storeName": window.currentStoreName}, ele, debug.log);
                  });
                  activeTableRows.remove().draw(false);
               }
            }).css({"display": ''});
            // Remove class input-sm to fix font for "Show entries" selector
            $('select.form-control.input-sm').removeClass('input-sm');
         } else {
            table.clear().rows.add(dataSet).draw();
         }
      });
   };
})();

export default showData;
