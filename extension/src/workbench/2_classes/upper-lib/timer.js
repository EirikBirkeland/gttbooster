// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2016/03/02.
 */
import $ from 'jquery'

const _ = require('lodash')
const debug = require('cth-debug')(__filename)

export function timer() {

   debug.log('Adding timer ...')
   const $timerElem = $('#cth_timerButton')
   $timerElem.attr('readonly', '')
   const init = _.once(_startTimer)
   let timerToggle = true
   let count = 0
   let startedYeti = false

   $timerElem.click(() => {

      if (startedYeti === false) {

         startedYeti = !startedYeti
         init()

      } else {

         timerToggle = !timerToggle

      }

   }).dblclick(() => {

      timerToggle = false
      count = 0
      $timerElem.val('00:00:00')

   })

   function _startTimer() {

      setInterval(() => {

         if (timerToggle) {

            $timerElem.val(_toHHMMSS(++count))

         }

      }, 1000)

      function _toHHMMSS(int) {

         const secNum = parseInt(int, 10)
         let hours = Math.floor(secNum / 3600)
         let minutes = Math.floor((secNum - hours * 3600) / 60)
         let seconds = secNum - hours * 3600 - minutes * 60

         if (hours < 10) {

            hours = `0${hours}`

         }
         if (minutes < 10) {

            minutes = `0${minutes}`

         }
         if (seconds < 10) {

            seconds = `0${seconds}`

         }

         const time = `${hours}:${minutes}:${seconds}`
         return time

      }

   }

}
