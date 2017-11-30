import $ from 'jquery'
import _ from 'lodash'

// TODO: Replace with the fancy message displayer?
export default function postMessage (type, msg, delay) {
   const $message = $('#message')
   $message.show()
   $message.html(`
            <span class="alert alert-${type}">
                <strong>${type}:</strong> ${msg}
            </span>`)
   if (delay) {
      _.delay(() => $message.fadeOut(500), delay)
   }
}
