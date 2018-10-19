// Copyright © 2016 Eirik Birkeland. All rights reserved.


const _ = require('lodash');

const uniqFilter = (ele, i, arr) => arr.indexOf(ele) === i;

function contrastColor (hexColor, option = 0) { // Takes a hex string such as "ab12ef" + integer 0, 1
   const rgb = hexColor.match(/.{2}/g);
   let r = parseInt(rgb[0], 16);
   let g = parseInt(rgb[1], 16);
   let b = parseInt(rgb[2], 16);

   let d = 0;

   let opposite;

   switch (option) {
      case 0: // Luminance (standard for certain colour spaces)
         r *= 0.2126;
         g *= 0.7152;
         b *= 0.0722;
         opposite = r + g + b;
         break;
      case 1: // Luminance (perceived option 1)
         r *= 0.299;
         g *= 0.587;
         b *= 0.114;
         opposite = r + g + b;
         break;
      case 2: // Luminance (perceived option 2, slower to calculate): (NB: This may not be working currently!)
         r = 0.299 * Math.pow(r, 2);
         g = 0.587 * Math.pow(g, 2);
         b = 0.114 * Math.pow(b, 2);
         opposite = Math.sqrt(r + g + b);
         break;
   }
   const a = 1 - opposite / 255;

   if (a < 0.5) {
      d = '000000';
   } else {
      d = 'ffffff';
   }

   return d;
}

Object.deepFreeze = function deepFreeze (obj) {
   // Retrieve the property names defined on obj
   const propNames = Object.getOwnPropertyNames(obj);
   // Freeze properties before freezing self
   propNames.forEach((name) => {
      const prop = obj[name];
      // Freeze prop if it is an object
      if (typeof prop === 'object' && prop !== null && !Object.isFrozen(prop)) {
         deepFreeze(prop);
      }
   });
   // Freeze self
   return Object.freeze(obj);
};

function stripPlaceholders (str) {
   return str.replace(/{[0-9]+\/?}|{\/?[0-9]+}/g, '');
}

function parseStringifiedValue (str) {
   if (typeof str === 'string') {
      if (str.match(/^(?:true|false)$/)) {
         str = JSON.parse(str);
      } else if (str.match(/^[0-9]+$/)) {
         str = JSON.parse(str);
      }
   }
   return str;
}

function promisify (fn) {
   return function (...args) {
      return new Promise(function (resolve, reject) {
         fn.call(this, ...args, (result) => {
            if (result !== undefined) {
               resolve(result);
            } else {
               reject(result);
            }
         });
      });
   };
}

export {
   contrastColor,
   stripPlaceholders,
   parseStringifiedValue,
   uniqFilter,
   promisify
};
