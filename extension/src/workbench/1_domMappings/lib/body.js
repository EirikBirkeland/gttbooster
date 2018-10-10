import $ from 'jquery'

const $iframe = $('#transarea').find('iframe.gtc-document-frame.jfk-scrollbar')
const sourceDocClone = $iframe[0].contentDocument.cloneNode(true)
const sourceDoc = $iframe[0].contentDocument
const targetDoc = $iframe[1].contentDocument
const bothDocs = $iframe.contents()
const documentHeaders = $('.gtc-document-header')

export const body = {
   "sourceDocHeader": documentHeaders.get(0),
   get "targetDocHeader" () {
      const itself = documentHeaders.get(1)
      return {
         itself,
         "percent": $(itself).find('.gtc-workbench-percent').get(0),
         "words": $(itself).find('.gtc-workbench-words').get(0),
         "translationTitle": $(itself).find('gtc-trans-title').get(0),
         "sourceTargetCombination": $(itself).find('.gtc-sl-tl').get(0)
      }
   },
   sourceDoc,
   targetDoc,
   bothDocs,
   sourceDocClone,
   // With these getters I am sure to get the complete list if available (it may take a while for the DOM to fully init with a giant document, probably because of async XHR being run by Google even after the page is 'ready').
   get "sourceSegments" () {
      return $(this.sourceDoc).find('.goog-gtc-unit')
   },
   get "copiedSourceSegments" () {
      return $(this.sourceDoc).find('.cth-goog-gtc-unit-copy')
   },
   get "targetSegments" () {
      return $(this.targetDoc).find('.goog-gtc-unit')
   },
   "transEditor": $(targetDoc).find('#transEditor')[0]
}
