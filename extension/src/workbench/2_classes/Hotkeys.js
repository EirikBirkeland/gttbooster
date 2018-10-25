/* global __filename */
// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 23.06.2016.
 */
import $ from 'jquery';
import _ from 'lodash';
import getCthSelection from './CthSelection';
import { handleTcRequestContentVersion } from '../../background/handleTcRequest';
const debug = require('cth-debug')(__filename.replace(/^src\//, ''));
const dom = require('../5_init/init/doc-references').getDomRefs();

export function hideTopMenus () {
   $(document).keydown(hideMenu);
   $(dom.sourceDoc).keydown(hideMenu);
   $(dom.targetDoc).keydown(hideMenu);

   function hideMenu (e) {
      // Hide unnecessary parts of GUI
      if (e.keyCode === 66 && e.ctrlKey) {
         $(window.cth.dom.wbheader).toggle(250);
         $(window.cth.dom.gtcGaiabar).toggle(250);
         $(window.cth.dom.gtcTopBar).toggle(250);
         $(window.cth.dom.gtcDocumentHeader).toggle(250);
         // Insert TM entries ALT+1, ALT+2, ALT+3, etc.
      } else if (
         e.altKey &&
         !e.shiftKey &&
         !e.ctrlKey && e.keyCode >= 49 && e.keyCode <= 49 + 8) {
         const oneKeyCode = 49;
         const a = $('.gtc-tool-left-floating').find('.gtc-tm-suggestion-translation');

         if (e.keyCode >= oneKeyCode &&
            e.keyCode <= oneKeyCode + 8 &&
            e.keyCode <= oneKeyCode + a.length) {
            try {
               $(window.cth.dom.targetDoc).find('#transEditor').html($('.gtc-tool-left-floating').find('.gtc-tm-suggestion-translation')[e.keyCode - 49].innerHTML);
            } catch (e) {
               debug.warn('You tried to replaceInserted a TM segment which doesn\'t exist.');
            }
         }
      }
   }
}

export function insertEndash () {
   $(document).keypress(insertEndash);
   $(dom.sourceDoc).keypress(insertEndash);
   $(dom.targetDoc).keypress(insertEndash);

   // Print endash at current caret position
   function insertEndash (e) {
      // Defer; thereby giving the string a chance to update before running the code
      _.defer(() => {
         const KEY_ENDASH = 45;
         if (e.keyCode === KEY_ENDASH) {
            const sel = getCthSelection();
            const textContent = sel.anchorNode.textContent;
            const offset = sel.anchorOffset;

            const allTextBeforeCaret = textContent.substring(0, offset);
            const allTextAfterCaret = textContent.substring(offset);

            debug.log(allTextBeforeCaret);

            if (allTextBeforeCaret.match(/--$/)) {
               sel.anchorNode.textContent = allTextBeforeCaret.replace(/--$/, '–') + allTextAfterCaret;
               sel.moveCaretToOffset(offset - 1);
            }
         }
      });
   }
}


export function ctrlK () {
   $(document).keydown(openTc);
   $(dom.sourceDoc).keydown(openTc);
   $(dom.targetDoc).keydown(openTc);

   function openTc (e) {
      const KEY_K = 75;
      if (e.keyCode === KEY_K && e.ctrlKey) {
         // Defer; thereby giving the string a chance to update before running the code
         _.defer(handleTcRequestContentVersion);
      }
   }
}

export function norwegianQuotes () {
   $(document).keypress(norwegianQuotes);
   $(dom.sourceDoc).keypress(norwegianQuotes);
   $(dom.targetDoc).keypress(norwegianQuotes);

   // Print endash at current caret position
   function norwegianQuotes (e) {
      // Defer; thereby giving the string a chance to update before running the code

      const KEY_QUOTE = 34;
      if (e.keyCode === KEY_QUOTE) {
         _.defer(() => {
            const selection = getCthSelection();
            const textContent = selection.anchorNode.textContent;
            const offset = selection.anchorOffset;

            const allTextBeforeCaret = textContent.substring(0, offset);
            const allTextAfterCaret = textContent.substring(offset);

            debug.log(allTextBeforeCaret);

            const reMatchLeftQuoteInsertCondition = /[^\s(]"$/;
            const reMatchRightQuoteInsertCondition = /(?:\s|\()"$|^"$/;

            if (allTextBeforeCaret.match(reMatchLeftQuoteInsertCondition)) {
               selection.anchorNode.textContent = allTextBeforeCaret.replace(/([^\s(]|^)"$/, '$1»') + allTextAfterCaret;
               selection.moveCaretToOffset(offset);
            } else if (allTextBeforeCaret.match(reMatchRightQuoteInsertCondition)) {
               selection.anchorNode.textContent = allTextBeforeCaret.replace(/(\s|\(|^)"$/, '$1«') + allTextAfterCaret;
               selection.moveCaretToOffset(offset);
            }
         });
      }
   }
}

export function ctrl (e) {
   _.defer(() => {
      if (e.which === 124) {
         const sel = getCthSelection();
         const textContent = sel.anchorNode.textContent;
         const offset = sel.anchorOffset;

         const allTextBeforeCaret = textContent.substring(0, offset);
         const allTextAfterCaret = textContent.substring(offset);

         sel.anchorNode.textContent = allTextBeforeCaret.replace(/\|$/, ' ') + allTextAfterCaret;
         sel.moveCaretToOffset(offset);
      }
   });
}
