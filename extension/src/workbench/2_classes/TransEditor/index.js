/* global cth */
import $ from 'jquery';
import _ from 'lodash';
import scrollIntoView from './lib/scrollIntoView';
import isScrolledIntoView from './lib/isScrolledIntoView';
import update from  './lib/update';

const debug = require('cth-debug')(__filename);

const TransEditor = {
   /**
    *
    * @param [width]
    * @param [maxWidth]
    */
   expand (width, maxWidth) {
      const gtcTransInlineText = Array.from($(cth.dom.targetDoc).find('.gtc-trans-inline-text'));
      const gtcRichInputArea = Array.from($(cth.dom.targetDoc).find('.gtc-trans-inline-cont'));
      // const spaceToTheLeftOfTransEditor = gtcRichInputArea[0].getBoundingClientRect()

      // Defer in order to get the latest clientWidth; thus creating a box that matches the new window size after resizing
      _.defer(() => {
         let minWidth = width ? width : cth.dom.targetDoc.body.clientWidth - 50;

         if (maxWidth && minWidth > maxWidth) {
            minWidth = maxWidth;
         }

         $(gtcTransInlineText).css({ 'min-width': `${minWidth - 10}px` });
         $(gtcRichInputArea).css({ 'min-width': `${minWidth}px` });
      });
   },

   focus () {
      this.scrollIntoView();
   },

   reset () {
      // 350px is default width it seems like.
      this.expand(350);
   },

   moveToLastActiveSegmentAndFocus () {
      this.scrollIntoView({ "node": cth.dom.currentTargetSegment });
      $(cth.dom.currentTargetSegment).children().first().click();
   },

   moveToX (node) {
      this.scrollIntoView({ node });
      $(node).children().first().click();
   },

   isOpen () {
      return !!$(cth.dom.targetDoc).find('#transEditor').length;
   },

   close () {
      $(cth.dom.targetDoc).find('.gtc-img-close').click();
   },

   resetState () {
      // Removes all added cth elements
      $(cth.dom.transEditor.parentNode).find('.cth').remove();
   },

   addButtonsToBar (buttons) {
      if (!cth.dom.transEditor) {
         return;
      }

      if (!Array.isArray(buttons)) {
         buttons = [buttons];
      }

      _.forEach(buttons, (ele) => {
         const $transEditor = $(cth.dom.transEditor.parentNode);
         const button = $('<button/>');
         button.addClass('cth btn btn-xs btn-circle').attr('title', ele.title).html(ele.value).css({
            "color": ele.color,
            "backgroundColor": ele.bgColor
         }).attr('id', ele.id).click(ele.onClick);

         if (ele.glyphicon) {
            button.append($('<i/>').addClass(`glyphicon ${ele.glyphicon}`));
         }

         const buttonWrapper = $('<span/>').addClass('bootstrap-wrapper');
         buttonWrapper.append(button);

         const rightToolbar = $transEditor.find('.gtc-doc-toolbar-right');
         rightToolbar.prepend(buttonWrapper);
         this.buttonsList.push(button[0]);
      });
   },

   removeButtons () {
      debug.log(this.buttonsList);
      $(this.buttonsList).remove();
   },

   update: update,

   scrollIntoView: scrollIntoView,

   isScrolledIntoView: isScrolledIntoView

};

TransEditor.buttonsList = [];

export default TransEditor;