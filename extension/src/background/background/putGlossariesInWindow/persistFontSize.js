// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by Eirik on 12.07.2017.
 */
import $ from 'jquery'

let count = 0

export default function persistFontSize (doc) {
   const $incr = $(doc).find('#cth-incr')
   const $decr = $(doc).find('#cth-decr')
   const $body = $(doc).find('body')

   const get = () => localStorage['cth-stored-font-size']
   // Noinspection AssignmentResultUsedJS
   const put = (numPx) => {
      localStorage['cth-stored-font-size'] = numPx
   }

   const storedSize = get()
   if (storedSize) {
      $body.css({'font-size': `${storedSize}px`})
   }

   $incr.click(() => _change('incr'))
   $decr.click(() => _change('decr'))

   function _change (symbol) {
      if (symbol !== 'incr' && symbol !== 'decr') {
         return
      }

      let fontSize = parseInt($body.css('font-size'))
      const modifier = symbol === 'incr' ? +2 : -2

      fontSize += modifier

      // There's no reason to ever go below font size 1:
      if (fontSize < 0) {
         fontSize = 1
         count++
      }

      $body.css({'font-size': `${fontSize}px`})
      put(fontSize)
   }
}
