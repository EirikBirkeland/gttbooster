// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 20.03.2017.
 */
import $ from 'jquery'

export default function indicateError (error) {
   const errors = {
      "400": '<b>400 Bad Request</b> – The network request was malformed. Are you sure the provided URL leads to a valid public spreadsheet?',
      "403": '<b>403 Forbidden</b> – Your request to view the public version of the spreadsheet was rejected by Google\'s servers. Please ensure that you have made your spreadsheet public. For guidance, please see <a href=\'https://base.gtt-booster.com/custom%20qa/custom_qa_checks\' target=\'_blank\'>the custom qa article</a>.',
      "404": '<b>404 Not Found</b> – The provided spreadsheet URL is not a valid Internet resource. Please ensure that there are no typos in your URL!'
   }

   const $sheetNames = $('#sheetNames')

   $sheetNames.removeClass('alert-success').addClass('alert-warning').show().html(`${errors[error] || error}<br/>`)
}
