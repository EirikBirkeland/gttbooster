import $ from 'jquery'
import _ from 'lodash'
import millisecond from 'millisecond'

const debug = require('cth-debug')(__filename)

const hiddenModalThing = `
<div class="bootstrap-wrapper">
<div class="modal fade in" data-backdrop="static" id="cth-purchase-modal" role="dialog" style="display: block;">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">×</button>
          <h4 class="modal-title">Your account expired</h4>
        </div>
        <div class="modal-body">
          
        </div>
        <div class="modal-footer">
        <button style="display: none" id="cth-button-dont-show-near-future">Don't show me this again in the near future</button>
        <span id="countdown"></span>
        </div>
      </div>
    </div>
</div></div>`

function showPurchaseScreen(cb) {

   const dontShowNearFutureButton = '#cth-button-dont-show-near-future'
   const dontShowNearFutureClickDate = 'cth-button-dont-show-near-future-click-date'

   const clickDate = localStorage[dontShowNearFutureClickDate]

   if (clickDate &&
      !(new Date() - clickDate > millisecond('3 days'))) {

      return debug.log('Not displaying the purchase screen for now, as the user chose to hide the message less than 3 days ago.')

   }
   hideGttNotesButton()

   const text = `
You do not at present have valid access to GTT Booster. Please proceed <a id="sumid" href="https://shop.gtt-booster.com" target="_blank">to the store</a> for purchasing access (at the new low price of <strong><code>€9.99</code></strong> per month).
<br/><br/>
If you believe this message was received in error, please <a href="mailto:gttbooster@gmail.com">contact us directly at <code>gttbooster@gmail.com</code></a> for assistance. Thank you.
`

   $('body').append(hiddenModalThing)

   const $purchaseModal = $('#cth-purchase-modal')

   $purchaseModal.find('.modal-body').html(text)

   $('.close').click(() => {

      $purchaseModal.remove()

   })

   $(dontShowNearFutureButton).click((event) => {

      localStorage[dontShowNearFutureClickDate] = new Date()
      $purchaseModal.remove()

   })
   countDown()

   function hideGttNotesButton() {

      //    Hide the bubble triggered by GTT "Notes" button
      const bubble = $('.jfk-bubble')
      bubble.hide()

   }

   function countDown() {

      let countdown = 10

      // Wait 3000 seconds before displaying timer
      _.delay(() => {

         count()

      }, 2000)

      function count() {

         if (countdown !== 0) {

            _.delay(() => {

               countdown -= 1
               $('#countdown').html(`<b>Redirecting automatically in ${countdown}</b>`)
               return count()

            }, 1000)

         } else if (countdown === 0) {

            $('#sumid')[0].click()
            $(dontShowNearFutureButton).show()

         }

      }

   }

}

export default showPurchaseScreen
