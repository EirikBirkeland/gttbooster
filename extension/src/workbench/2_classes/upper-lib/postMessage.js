// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 27.08.2016.
 */

import $ from 'jquery'
import _ from 'lodash'

export default function displayAlert(opts) {

   const {type, msg, removeToggle, fnToExecute} = opts

   const $message = (function () {

      const $cthMessage = $('#cth-message')
      if (!removeToggle) {

         const $message = $('<span/>')
         $message[0].id = 'cth-message'
         $('#gtc-quickbar-tip-parent').append($message)

      }
      return $cthMessage

   }())

   $message.show()

   $message.html(`
            <div class="bootstrap-wrapper"><span class="alert alert-${type}">
                <strong>${type.charAt(0).toUpperCase() + type.slice(1)}:</strong> ${msg}
            </span></div>`)

   if (fnToExecute) {

      fnToExecute()

   }

   if (removeToggle) {

      _.delay(() => $message.fadeOut(500), 5000)

   }

}