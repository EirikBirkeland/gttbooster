// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 23.06.2016.
 */


const obj = {};

// FIXME: 3.00 is currently not marked as a fail.

export default function calculate (totalWords, weightedErrors) {
   obj.o = {
      "isFail": null,
      "totalErrors": null,
      weightedErrors,
      "totalWordsActual": null,
      totalWords,
      "halfCount": null,
      "sixthCount": null,
      "newWeightedErrors": null,
      "newWeightedErrors2Digit": null,
      "textReport": null
   };
   _calculate();
   _reportWriter();
   return obj.o;

   function _calculate () {
      const o = obj.o;

      if (!o.totalWords || !o.weightedErrors || !(o.totalWords <= 1000000) || !(o.weightedErrors <= 10000)) {
         return null;
      }

      o.isFail = o.weightedErrors >= 3;

      // Initial tally
      if (o.totalWords <= 250) {
         o.totalWordsActual = o.totalWords;
         o.totalWords = 250;
         o.totalErrors = o.weightedErrors / 1000 * o.totalWords;
      } else {
         o.totalErrors = o.weightedErrors / 1000 * o.totalWords;
      }

      // Work out arbitration needed
      let needed = o.weightedErrors - 3;

      const weightOfHalf = 0.5 / o.totalWords * 1000;
      const weightOfSixth = 0.166666666666666667 / o.totalWords * 1000;

      o.halfCount = 0;
      o.sixthCount = 0;

      while (needed > 0) {
         if (needed - weightOfHalf > 0) {
            o.halfCount++;
            needed -= weightOfHalf;
         } else if (needed > 0) {
            o.sixthCount++;
            needed -= weightOfSixth;
         } else {
            break;
         }
      }

      const halfScore = o.halfCount * weightOfHalf;
      const sixthScore = o.sixthCount * weightOfSixth;

      const entireScore = halfScore + sixthScore;
      o.newWeightedErrors = o.weightedErrors - entireScore;
      o.newWeightedErrors2Digit = Math.round(o.newWeightedErrors * 100) / 100;

      return o;
   }

   function _reportWriter () {
      let output = '';
      const o = obj.o;

      if (o.totalWords <= 250) {
         output += `This translation has <span class="cth-bad">${o.totalErrors}</span> errors in ${o.totalWords} words (actual ${o.totalWordsActual} words)`;
      } else {
         o.totalErrors = o.weightedErrors / 1000 * o.totalWords;
         output += `This translation has <span class="cth-bad">${o.totalErrors}</span> errors in ${o.totalWords} words, which weighted becomes <span class="cth-bad">${o.weightedErrors}</span> errors. `;
      }

      let errorWordSixth = 'errors';
      if (o.sixthCount === 1) {
         errorWordSixth = 'error';
      }
      let errorWordHalf = 'errors';
      if (o.halfCount === 1) {
         errorWordHalf = 'error';
      }

      if (o.isFail === false) {
         output = 'This job isn\'t a fail!';
      } else if (o.sixthCount === 3 && o.halfCount === 0) {
         output += `Arbitrate <span class="cth-bad">1 x 1/2</span> ${errorWordHalf} *OR* <span class="cth-bad">3 x 1/6</span> ${errorWordSixth} to reduce the error rate to <u><span title="${o.newWeightedErrors}"><span class="cth-good">${o.newWeightedErrors2Digit}</span></span></u>.`;
      } else {
         output += `Arbitrate <span class="cth-bad">${o.halfCount} x 1/2</span> ${errorWordHalf} and <span class="cth-bad">${o.sixthCount} x 1/6</span> or equivalent ${errorWordSixth}, to reduce the error rate to <u><span title="${o.newWeightedErrors}"><span class="cth-good">${o.newWeightedErrors2Digit}</span></span></u>.`;
      }
      o.textReport = output;
   }
}
