import $ from 'jquery'
import _ from 'lodash'

export default function removeDuplicateGlossaries() {

   const glossArea = $('.gtc-tools-autosearch').find('.gtc-tool-right-floating')[0]
   const glossaryList = $(glossArea).find('.gtc-glossary-match-holder')

   const unique = []

   for (let i = 0; i < glossaryList.length; i++) {

      let currentGlossItem = glossaryList[i].innerHTML

      /**
       * Remove unique numbers
       */
      currentGlossItem = currentGlossItem.replace(/(gtc-gl-name-)[0-9]+/g, '$1number')

      if (unique.length > 0) {

         for (let j = 0, uniqueLength = unique.length; j < uniqueLength; j++) {

            if (unique[j] === currentGlossItem) {

               $(glossaryList[i]).addClass('cth-redundant-gloss-item')
               $(glossaryList[i]).hide()
               break

            } else if (j === uniqueLength - 1) {

               unique.push(currentGlossItem)
               break

            }

         }

      } else {

         unique.push(currentGlossItem)

      }

   }
   const filtered = _.filter(glossaryList, (ele) => $(ele).find('.gtc-glossary-source-name').html() === '')
   $(filtered).addClass('cth-redundant-gloss-item')

   $(filtered).hide()

   const visibleItems = _.filter(glossaryList, (ele) => ele.style.display === '')
   const invisibleItems = _.filter(glossaryList, (ele) => ele.style.display === 'none')

   $('.gtc-tool-title.gtc-tool-glossary').html(`<span class="bootstrap-wrapper">
                   <a href="#">Glossary (${visibleItems.length})</a>
                   <br/>
                   <small style="color: grey" class="cth-hidden-glossary-msg">${invisibleItems.length} redundant items are currently hidden.</small>
                   </span>`).find('a').attr('data-toggle', 'tooltip').attr('title', `${invisibleItems.length} duplicates are currently being hidden by GTT Booster. Click here to switch between old and new list.`).click(() => {

      $('.cth-redundant-gloss-item').toggle()
      $('.cth-hidden-glossary-msg').html('')
      $('.gtc-tool-title.gtc-tool-glossary').find('a').html(`Glossary (${_.filter(glossaryList, (ele) => ele.style.display === '').length})`)

   })

}
