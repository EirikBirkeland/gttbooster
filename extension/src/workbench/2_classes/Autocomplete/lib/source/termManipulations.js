// @flow
/* global __filename */
import _ from 'lodash';
import { lowerCaseFilterAccordingToProp, upperCaseFilterAccordingToProp } from './util';
import type { Term } from './Term-type';
import { trimSymbols as newTrimSymbols } from '../../../../../tools/trimSymbols';

const debug = require('cth-debug')(__filename.replace(/^src\//, ''));

/**
 *
 * @param {Term[]} terms
 * @param {string} currentInputWord
 */
export function stripCurrentInputWord (terms: Term[], currentInputWord: string): Term[] {
   const newObj = _.cloneDeep(terms);
   if (newObj.map((ele) => ele.label).includes(currentInputWord)) {
      const index = newObj.map((ele) => ele.label.toLowerCase()).indexOf(currentInputWord.toLowerCase());
      newObj.splice(index, 1);
   }
   return newObj;
}

/**
 *
 * @param {Term[]} terms
 */
export function trimSymbols (terms: Term[]): Term[] {
   const newObj = _.cloneDeep(terms);
   return newObj.map((x) => {
      x.label = newTrimSymbols(x.label);
      return x;
   });
}

/**
 *
 * @param {Term[]} terms
 */
export function removePlaceholderGarbage (terms: Term[]): Term[] {
   const newObj = _.cloneDeep(terms);
   return _.map(newObj, (x) => {
      x.label = x.label.replace(/^[0-9]}|{\/[0-9]}*$/g, '').// Remove number entities between 1 and 3 digits
      replace(/^[0-9]{1,3}$/g, '');
      return x;
   });
}

/**
 *
 * @param {Term[]} terms
 */
export function sortLongestItemsFirst (terms: Term[]): Term[] {
   const newObj = _.cloneDeep(terms);
   return newObj.sort((a, b) => b.label.length - a.label.length);
}

/**
 * Return alphabetized terms with priority given to lower/upper depending on what the currentInputWord is using
 * @param {Term[]} terms
 * @param {string} currentInputWord
 * @returns {Array}
 */
export function alphabetize (terms: Term[], currentInputWord: string): Term[] {
   const upperFiltered = terms.filter(upperCaseFilterAccordingToProp('label'));
   const lowerFiltered = terms.filter(lowerCaseFilterAccordingToProp('label'));
   return currentInputWord[0].toUpperCase() === currentInputWord[0]
      ? upperFiltered.concat(lowerFiltered)
      : lowerFiltered.concat(upperFiltered);
}