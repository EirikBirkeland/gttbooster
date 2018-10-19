// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 23.06.2016.
 */
import * as eastAsianWidth from 'east-asian-width';

/**
 *
 * @param {string} str1
 * @param {string} str2
 * @param {object} opts
 * @param {integer} opts.lengthPercent - percentage difference in string length allowed
 * @param {string} opts.shortMsg - message returned if string too short
 * @param {string} opts.longMsg - message returned if string too long
 * @returns {*}
 */
export default function compareLengths (str1, str2, opts) {
   opts = Object.assign({
      "lengthPercent": 200,
      "shortMsg": 'Short translation',
      "longMsg": 'Long translation'
   }, opts);

   const sourceWidth = eastAsianWidth.str_width(str1);
   const targetWidth = eastAsianWidth.str_width(str2);

   if (targetWidth / sourceWidth > opts.lengthPercent / 100) {
      return opts.longMsg;
   }
   if (targetWidth / sourceWidth < 100 / opts.lengthPercent) {
      return opts.shortMsg;
   }
   return null;
}
