/**
 * Created by Eirik on 14.07.2017.
 */
import $ from 'jquery'

const debug = require('cth-debug')(__filename.replace(/^src\//, ''))

$.fn.visible = function () {

   return this.css('visibility', 'visible')

}

$.fn.invisible = function () {

   return this.css('visibility', 'hidden')

}

/*
 * TODO: The button should not move the entire line when the area is hovered
 * No additional IDs added, thus avoiding global state (after all, # and . are global state).
 */

/**
 *
 * @param option {boolean}
 */
export function addNewDocname(option) {

   debug.log('a')
   // Avoid duplicates by checking for existing ID
   if ($('#cth_clonedDocName').length === 0) {

      const $docnameOld = $(window.cth.docInfo.dokNavn)

      const $docnameContainer = $('<span/>').addClass('bootstrap-wrapper')

      const $settingIcon = $('<button/>').html('⇄').invisible().css({"opacity": 0.5}).addClass('label label-info').attr('title', 'Click to switch between new and old title display style').on('click', () => {

         debug.log('settingIcon clicked')
         toggleTitleStyle()

         function toggleTitleStyle() {

            const $docnameNew = $('#cth_clonedDocName')

            if ($docnameNew.html().match(/&nbsp;&nbsp;/)) {

               $docnameNew.html($docnameNew.html().replace(/&nbsp;&nbsp;/g, '_'))
               //  SaveSecretly({addNewDocName: false})

            } else {

               $docnameNew.html($docnameNew.html().replace(/_/g, '&nbsp;&nbsp;'))
               //  SaveSecretly({addNewDocName: true})

            }

         }

      })

      const $docnameNew = $docnameOld.clone()

      $docnameNew.removeClass('goog-inline-block').attr({"id": 'cth_clonedDocName'})

      // TODO: Finish implementing this option
      if (option && option === true) {

         $docnameNew.html($docnameNew.html().replace(/_/g, '  '))

      }

      $docnameContainer.append(
         $settingIcon,
         $docnameNew
      )

      $docnameContainer.insertAfter($docnameOld)

      $docnameOld.hide()

      $docnameContainer.on({
         mouseenter() {

            // Show setting icon in front of title
            const $settingIcon = $('#cth_clonedDocName').prev()
            $settingIcon.visible()

         },
         mouseleave() {

            // Hide setting icon
            const $settingIcon = $('#cth_clonedDocName').prev()
            $settingIcon.invisible()

         }
      })

   }

}