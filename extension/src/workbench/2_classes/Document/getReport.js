/*
 * Get container for 80% complete 1224 words
 * TODO: Show doc map using canvas
 */
import $ from 'jquery';

function getSourceDocLength () {
   return cth.model.sourceSegments.map((ele) => ele.innerWithConvertedPlaceholders).join(' ').split(/\s+/).length;
}

const TranslationProgress = {
   getContainer () {
      return $('#statusbar')[0];
   }
};
