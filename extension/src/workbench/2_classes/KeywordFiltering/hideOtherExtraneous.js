import $ from 'jquery';

const debug = require('cth-debug')(__filename.replace(/^src\//, ''));

/**
 * @param {string} nodeId - e.g. goog-gtc-unit-4
 * @param {string} docName
 */
export default function hideOtherExtraneous (nodeId, docName) {
   /**
    * Do an input check
    */
   if (!(/goog-gtc-unit-[0-9]/).test(nodeId)) {
      return debug.log(`Invalid ID name: ${nodeId}`);
   }

   /**
    *
    */
   const $sourceNode = $(window.cth.dom.sourceDoc).find(`#${nodeId}`);
   const $targetNode = $(window.cth.dom.targetDoc).find(`#${nodeId}`);

   const hiddenClassName = `cth-hidden-${docName}`;

   /**
    * Return if the node itself is not hidden - this means we should not proceed.
    */
   if (!$targetNode.hasClass(hiddenClassName)) {
      return;
   }

   /**
    * Just hide msgblock if present and return early
    */
   const highlightingClass = `cth-searchHighlight-highlight-${docName}`;
   const highlightingContainerClass = `cth-searchHighlight-container-${docName}`;

   const $messageBlock = (() => {
      if (docName === 'target') {
         return $targetNode.closest('.goog-gtt-messageblock');
      }
      if (docName === 'source') {
         return $sourceNode.closest('.goog-gtt-messageblock');
      }
      debug.warn('Invalid messageblock reference.');
      return null;
   })();

   debug.log('$messageBlock: ', $messageBlock);

   const messageBlockHasHighlighting = $messageBlock.find(`.${highlightingClass}`).length;
   debug.log(`messageBlockHasHighlighting: ${messageBlockHasHighlighting}`);
   const messageBlockHasContainerHighlighting = $messageBlock.find(`.${highlightingContainerClass}`).length;
   debug.log(`messageBlockHasContainerHighlighting: ${messageBlockHasContainerHighlighting}`);

   const googGtcUnitChildren = Array.from($messageBlock.find('.goog-gtc-unit'));
   debug.log(`length of googGtcUnitChildren is: ${googGtcUnitChildren.length}`);

   const $googGtcUnitChildrenEachContainHighlighting = googGtcUnitChildren.every((ele) => Boolean($(ele).find(`.${highlightingClass}`).length));

   if ($messageBlock.length) {
      // Hide if every googGtcUnit contains highlighting.
      if (messageBlockHasHighlighting || messageBlockHasContainerHighlighting) {
         // Alert("1")
      } else {
         debug.log('Hiding source messageBlock');
         hideMessageBlock($sourceNode);
         debug.log('Hiding target messageBlock');
         hideMessageBlock($targetNode);
      }
   }

   /**
    *
    * Hide message block
    */
   function hideMessageBlock (node) {
      const $messageBlock = $(node).closest('.goog-gtt-messageblock');
      $messageBlock.addClass(`cth-hidden-${docName}`);
   }

   function hideMore () {
      /**
       * Iterate through sibling nodes for each segment, and ascend level by level. If even just one node is found that is not safe to hide, cancel the entire process for the current segment.
       */
      (function again ($sourceNode, $targetNode) {
         /**
          * NodesThatArentMine - elements which are potentially risky to hide .. if any are found, cancel the procedure by returning.
          */
         const nodesThatArentMine = $targetNode.siblings().filter((ele) => !$(ele).hasClass(nodeId));

         for (let i = 0; i < nodesThatArentMine.length; i++) {
            if (nodesThatArentMine[i].tagName !== 'BR' &&
               !$(nodesThatArentMine[i]).hasClass('notranslate') &&
               !$(nodesThatArentMine[i]).hasClass(nodeId) &&
               !$(nodesThatArentMine[i]).hasClass(`cth-hidden-${docName}`) &&
               !$(nodesThatArentMine[i]).hasClass('cth_insertedSourceText') &&
               !$(nodesThatArentMine[i]).hasClass('cth_insertedSourceTextBreak')
            ) {
               debug.log('RETURNING!');
               return;
            }
         }

         // OK, it should be safe to hide the parent .. and any messageblocks etc.

         debug.log('Adding class to source parent');

         $sourceNode.parent().addClass(`cth-hidden-${docName}`);

         debug.log('Adding class to target parent');

         $targetNode.parent().addClass(`cth-hidden-${docName}`);

         again($sourceNode.parent(), $targetNode.parent());
      }($sourceNode, $targetNode));
   }
}
