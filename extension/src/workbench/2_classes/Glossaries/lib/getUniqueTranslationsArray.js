import $ from 'jquery';
import {buildObject} from './buildObject';
import {uniqFilter} from '../../tool';

// Retrieve database entry if available
export const getUniqueTranslationsArray = function () {
   return buildObject($).map((ele) => ele.targetTerms).map((ele) => ele.map((ele) => $(ele.$targetTerm).text())).reduce((ele, acc) => acc.concat(ele), []).sort().filter(uniqFilter);
};