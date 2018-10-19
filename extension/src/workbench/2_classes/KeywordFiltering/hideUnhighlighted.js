/**
 * Created by Eirik on 11.08.2017.
 */

import $ from 'jquery';
import _ from 'lodash';
import hideOtherExtraneous from './hideOtherExtraneous';

const debug = require('cth-debug')(__filename.replace(/^src\//, ''));

export default function hideUnhighlighted (nodeListMain, docName) {
   const notHighlighted = _.filter(nodeListMain, (ele) => $(ele).find(`.cth-searchHighlight-container-${docName}`).length === 0);
   const notHighlightedIds = notHighlighted.map((ele) => ele.id);

   debug.log('notHighlightedIds', notHighlightedIds);

   notHighlightedIds.forEachAsync((ele) => {
      if (!window.cth.shouldBeRunning) {
         return;
      }
      const theId = ele;
      debug.log('theId', theId);

      debug.log('$(window.cth.dom.sourceDoc).find("#" + theId) ', $(window.cth.dom.sourceDoc).find(`#${theId}`));
      debug.log('$(window.cth.dom.sourceDoc).find("." + theId) ', $(window.cth.dom.sourceDoc).find(`.${theId}`));

      debug.log('$(window.cth.dom.targetDoc).find("#" + theId) ', $(window.cth.dom.targetDoc).find(`#${theId}`));
      debug.log('$(window.cth.dom.targetDoc).find("." + theId) ', $(window.cth.dom.targetDoc).find(`.${theId}`));

      $(window.cth.dom.sourceDoc).find(`#${theId}`).addClass(`cth-hidden-${docName}`);
      $(window.cth.dom.sourceDoc).find(`.${theId}`).addClass(`cth-hidden-${docName}`);
      $(window.cth.dom.targetDoc).find(`#${theId}`).addClass(`cth-hidden-${docName}`);
      $(window.cth.dom.targetDoc).find(`.${theId}`).addClass(`cth-hidden-${docName}`);

      // Some of the below seem to bungle up certain things. So, I should implement these very carefully with lots of testing.

      /*
       * Hide any DOM element that does not have a .goog-gtc-unit descendant
       * $(cth.dom.targetDoc.body).children().filter((i, ele) => !$(ele).find('.goog-gtc-unit').length).addClass(`cth-hidden-${docName}`)
       */

      /*
       * $(cth.dom.targetDoc.body).find('li').filter((i, ele) => {
       *    return !$(ele).find(`.goog-gtc-unit:not(.cth-hidden-${docName})`).length
       * }).addClass(`cth-hidden-${docName}`)
       */

      // Disabled due to being extremely slow:
      hideOtherExtraneous(theId, docName);
   }, 1);
}
