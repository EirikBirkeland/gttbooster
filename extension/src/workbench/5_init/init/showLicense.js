// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 23.08.2016.
 */

import $ from 'jquery'

const pify = require('pify')

const debug = require('cth-debug')(__filename)

require('../../../../vendor/jquery-ui-compact/jquery-ui.min')

const hiddenModalThing = `
<div class="bootstrap-wrapper">
<div class="modal fade in" data-backdrop="static" id="cth-license-modal" role="dialog" style="display: block;">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">×</button>
          <h4 class="modal-title">Placeholder End-user License Agreement</h4>
        </div>
        <div class="modal-body">
          <p>The entire license agreement goes here.</p>
        </div>
        <div class="modal-footer">
          <label><input type="checkbox" id="cth-terms-checkbox">Agree to terms</label>
          <button disabled type="button" class="btn btn-primary" id="cth-terms-accept" data-dismiss="modal" data-target="#cth-license-modal">Accept</button>
          <button type="button" class="btn btn-default" id="cth-terms-reject" data-dismiss="modal" data-target="#cth-license-modal">Reject</button>
        </div>
      </div>
    </div>
</div></div>`

function showLicense(cb) {

   // TODO: Add remote fetching as well?
   $.get(chrome.runtime.getURL('LICENSE.txt'), (data) => {

      $('body').append(hiddenModalThing)

      const $licenseModal = $('#cth-license-modal')

      data = data.split(/\r?\n/).map((ele) => ele.replace(/^(\s*[0-9].*)/g, '<b>$1</b>')).join('\n').replace(/\n/g, '<p/>')

      $licenseModal.find('.modal-body').html(data)

      $licenseModal.modal({"html": true}).on('hidden.bs.modal', () => {

         if (localStorage.acceptedLicense) {

            cb()

         }

      })

      $('#cth-terms-checkbox').click(() => {

         const $aa = $('#cth-terms-accept')
         if ($aa.prop('disabled') === true) {

            $aa.prop('disabled', false)

         } else {

            $aa.prop('disabled', true)

         }

      })

      $('#cth-terms-accept').click(() => {

         localStorage.acceptedLicense = 'true'

      })

      $('#cth-terms-reject').click(() => {

         debug.log('Rejected!')

      })

   })

}

export default pify(showLicense)
