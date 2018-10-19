// Copyright © 2016 Eirik Birkeland. All rights reserved.
// NEW! I can just do chrome.extension.getURL('icons/arrow-move.png') to retrieve an extension URL and then use that directly on the webpage if I like. Wow.
import _ from 'lodash';

export const icons = (() => {
   const icons = {
      "sourceArrowOffState": 'icons/upper/arrow-curve.png',
      "sourceArrowOnState": 'icons/upper/arrow-curve-180-left.png',
      "binocularsOffState": 'icons/upper/binocular--plus.png',
      "binocularsOnState": 'icons/upper/binocular--minus.png',
      "minus": 'icons/upper/minus.png',
      "plus": 'icons/upper/plus.png',
      "greenIcon": 'icons/title/green.ico',
      "yellowIcon": 'icons/title/yellow.ico',
      "redIcon": 'icons/title/red.ico',
      "purpleIcon": 'icons/title/purple.ico',
      "styleguide32": 'icons/upper/styleguide32.png',
      "styleguide16": 'icons/upper/styleguide16.png',
      "arrowIn": 'icons/upper/arrow-in.png',
      "arrowCircleSmall": 'icons/upper/arrow-circle-default.png',
      "arrowCircleLarge": 'icons/upper/arrow-circle-default.png',
      "arrowCircleRed": 'icons/upper/arrow-circle-red.png',
      "arrowCircleGreen": 'icons/upper/arrow-circle-green.png',
      "windowPlus": 'icons/upper/application--plus.png',
      "windowMinus": 'icons/upper/application--minus.png',
      "settings": 'icons/settings32.png',
      "descriptionsOffState": 'icons/upper/desc_expand.png',
      "descriptionsOnState": 'icons/upper/desc_compress.png',
      "tradosOffState": 'icons/upper/cheque--plus.png',
      "tradosOnState": 'icons/upper/cheque--minus.png',
      "qm": 'icons/upper/qm.png',
      "question": 'icons/upper/question-button.png',
      "autocompletionGrey": 'icons/upper/autocompletionGreyNew.png',
      "autocompletionGreen": 'icons/upper/autocompletionGreenNew.png',
      "shoppingBasket": 'icons/upper/shopping-basket.png',
      "shoppingBasketUrgent": 'icons/upper/shopping-basket--exclamation.png',
      "lockIceOnState": 'icons/upper/lock--minus.png',
      "lockIceOffState": 'icons/upper/lock--plus.png',
      "lockIceBodyIcon": 'icons/body/lock.png'
   };

   // Wrap addresses to get the proper URL:
   _.forOwn(icons, (val, key) => {
      if (/^icons/.test(icons[key])) {
         icons[key] = chrome.runtime.getURL(val);
      }
   });

   return icons;
})();