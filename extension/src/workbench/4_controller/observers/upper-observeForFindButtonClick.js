import $ from 'jquery'
import _ from 'lodash'

export default function observeForFindButtonClick(cb) {

   $('button[name="find"]').click((e) => {

      _.defer(cb)

   })
   $('.gtc-fnrd-find').on('keyup', (e) => {

      if (e.keyCode === 13) {

         _.defer(cb)

      }

   })

}
