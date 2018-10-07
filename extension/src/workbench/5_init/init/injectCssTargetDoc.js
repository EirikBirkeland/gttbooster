import $ from 'jquery';

/**
 *
 * @param {String|Array} cssFiles
 */
function injectCssSourceTargetDoc (cssFiles) {
   if (typeof cssFiles === 'string') {
      cssFiles = [cssFiles];
   }

   const urls = cssFiles.map((ele) => chrome.runtime.getURL(ele));

   urls.forEach((url) => {
      const link = `<link rel="stylesheet" type="text/css" href=${url}>`;
      $(window.cth.dom.targetDoc.head).append(link);
      $(window.cth.dom.sourceDoc.head).append(link);
   });
}

export { injectCssSourceTargetDoc };
