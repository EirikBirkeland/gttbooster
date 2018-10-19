import XRegExp from 'xregexp';
import _ from 'lodash';

// Use as function operating on DOM to ensure the text is always up to date
/**
 *
 * @param nodes {NodeList} - nodes
 */
export default function getListOfUniqueWords (nodes) {
   const getTextChildNotesAsCombinedString = (node) => Array.from(node.childNodes).filter((ele) => ele.nodeType === 3).map((ele) => ele.textContent).map((ele) => ele.split(' ')).reduce((ele, acc) => acc.concat(ele), []).join(' ');
   const stripPunctuation = (str) => XRegExp.replace(str, XRegExp('\\p{P}'), '', 'all');
   const sortUniq = (txt) => _.uniq([].concat.apply([], txt).sort());

   const words = _.map(nodes, (ele) => {
      const str = getTextChildNotesAsCombinedString(ele);
      return stripPunctuation(str).split(' ');
   });

   return sortUniq(words).join(' ');
}
