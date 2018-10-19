import $ from 'jquery';

let state = false;

export default function hideDefinitionsStuff (doc) {
   const stored = localStorage['cth-stored-descriptions-state'];
   const $desc = $(doc).find('.gtc-glossary-description');
   const $cthCompress = $(doc).find('#cth-compress');

   if (stored === 'true') {
      state = true;
      $desc.hide();
   }

   $cthCompress.click(() => {
      state = !state;
      $desc.toggle();
      localStorage['cth-stored-descriptions-state'] = state;
   });
}
