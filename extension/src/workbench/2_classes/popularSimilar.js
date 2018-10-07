let sessionTM = [];

// Let currentSegmentRef = new Node() || window.cth.dom.currentTargetSegment

function init (a) {
   sessionTM = a;
}

/**
 *
 * @param {string} currentSourceString - like "I have 3 cats"
 */
function checkAndReplace (currentSourceString) {
// FIXME: May not work great if innerHTML contains tags and stuff ... so I'd have to only operate on non-HTML entities?

   const tmWithoutNumbers = sessionTM.map((ele) => ele.source.replace(/[0-9]+/g, ''));
   const withoutNumbers = currentSourceString.replace(/[0-9]+/g, '');

   if (tmWithoutNumbers.length) {
      const index = tmWithoutNumbers.indexOf(withoutNumbers);
      if (index !== -1) {
         // TODO: I should traverse the string and replace the numbers one by one
         return sessionTM[index].target.replace(/[0-9]+/g, currentSourceString.match(/([0-9]+)/)[1]);
      }
   }
}

function addToTm () {

}

function c () {
}

function d () {
}

export { init, checkAndReplace };
