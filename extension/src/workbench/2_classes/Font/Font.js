// Copyright © 2016 Eirik Birkeland. All rights reserved.

import $ from 'jquery'

class Font {

   constructor() {

      throw new Error('You\'re trying to instantiate a monad/wrapper')

   }

   static initSavedSize() {

      if (localStorage['cth-persist-font-size']) {

         const storedSize = parseInt(localStorage['cth-persist-font-size'])
         this.setSize(storedSize)

      }

   }

   static resize(dir) {

      let incrDecr = dir === 'incr' ? +1 : dir === 'decr' ? -1 : null
      if (window.event.shiftKey) {

         incrDecr *= 3

      }

      const $frameAll = $('.gtc-document-frame').contents()
      const existingFontSize = $frameAll.find('span.goog-gtc-translatable').css('font-size')
      const newFontSize = parseInt(existingFontSize) + incrDecr
      this.setSize(newFontSize)

      localStorage['cth-persist-font-size'] = newFontSize

   }

   static setSize(newSize) {

      const $frameAll = $('.gtc-document-frame').contents()
      const $segmentsToResize = $frameAll.find('span.goog-gtc-translatable')
      const newSizeString = `${newSize}px`
      $segmentsToResize.css('font-size', newSizeString)
      if ($(window.cth.dom.targetDoc).find('#transEditor').length) {

         $(window.cth.dom.targetDoc).find('#transEditor')[0].style.setProperty('font-size', newSizeString, 'important')

      }

   }

}

export {Font}
