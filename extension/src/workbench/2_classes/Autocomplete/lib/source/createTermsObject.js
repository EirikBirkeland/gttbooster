// @flow
/* global __filename */
import $ from 'jquery';
import escapeGoat from 'escape-goat';
import { Glossaries } from '../../../Glossaries/Glossaries';
import { Tm } from '../../../tm/Tm';
import { uniqFilterAccordingToProp } from './util';
import { sortLongestItemsFirst } from './termManipulations';
import type { Term } from './Term-type';

const debug = require('cth-debug')(__filename.replace(/^src\//, ''));

/**
 * This function pulls together the sources and returns Term[] for consumption by Autocomplete.
 * @param {RegExp} currentInputWordRe
 * @param {string} currentInputWord
 * @return {Term[]} - returns an array of Hero objects with special properties
 */
export function createTermsObject (currentInputWordRe: RegExp, currentInputWord: string): Term[] {
   const gloss = sortLongestItemsFirst(createGlossaries());

   const tm = createTm();

   const mt = createMt();

   const combined = gloss.concat(tm).concat(mt);

   // TODO: A bit "cheaty" to add these here.
   combined.currentInputWord = currentInputWord;
   combined.currentInputWordRe = currentInputWordRe;

   debug.log('Combined:', combined);

   const combinedRes = combined.filter(uniqFilterAccordingToProp('label')).filter((ele) => currentInputWordRe.test(ele.label));
   return combinedRes;
}

function createGlossaries (): Term[] {
   const a = Glossaries.getUniqueTranslationsArray();
   return a.reduce((acc, ele) => {
      acc.push({
         "label": ele,
         "type": 'gl',
         "color": 'green'
      });
      return acc;
   }, []);
}

function createTm (): Term[] {
   if (window.cth.option.autocompleteIncludeTm) {
      const $_ = Tm.getTargetWords(window.tmOpts);
      debug.log($_);
      return $_.reduce((acc, ele) => {
         acc.push({
            "label": ele,
            "type": 'tm',
            "color": 'blue'
         });
         return acc;
      }, []);
   }
   return [];
}

function createMt (): Term [] {
   if (window.cth.option.autocompleteIncludeMt) {
      const $_ = (() => {
         if (window.cth.option.autocompleteCleanUpMt) {
            return escapeGoat.unescape($('.gtc-mt-suggestion').html()).// Attempt to strip away tag soup
            replace(/<.*?>/g, '').split(/[\s\r\n]+/);
         }
         return $('.gtc-mt-suggestion').html().split(/[\s\r\n]+/);
      })();

      return $_.reduce((acc, ele) => {
         acc.push({
            "label": ele,
            "type": 'mt',
            "color": 'orange'
         });
         return acc;
      }, []);
   }
   return [];
}