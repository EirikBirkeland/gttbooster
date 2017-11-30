import $ from 'jquery'
import _ from 'lodash'
import rgbHex from 'rgb-hex'

const debug = require('cth-debug')(__filename)

export function indicateNumOfTmMatches () {
   const $mountPoint = $('.gtc-tools-autosearch').find('.gtc-tool-left-floating')

   _.delay(() => {
      const $fuzzies = $('.cth-fuzzy')
      if ($fuzzies.length) {
         const fuzzies = _.map($fuzzies, (ele) => ({
            "value": $(ele).html(),
            "color": rgbHex($(ele).css('color')),
            "bgColor": rgbHex($(ele).css('background-color'))
         })).reverse()

         debug.log(fuzzies)

         const summaryArr = (() => {
            const uniqColorStrings = _.uniq(fuzzies.map((ele) => ele.bgColor))

            debug.log(`uniqColorStrings: ${uniqColorStrings}`)

            return _.map(uniqColorStrings, (uniqColor) => {
               const numberOfUniqColor = _.filter(fuzzies, (x) => x.bgColor === uniqColor).length
               debug.log('number: ', numberOfUniqColor)
               const obj = {}
               obj.bgColor = uniqColor
               obj.count = numberOfUniqColor
               return obj
            }).reverse()
         })()

         debug.log('summaryArr: ', summaryArr)

         const theLabels = _.map(summaryArr, (ele) => {
            const label = $('<span/>')
            label.addClass('cth-fuzzy-copy label label-primary')
            label.css('margin', '2px')
            label.html(ele.count)
            label.css({
               "color": 'white',
               "backgroundColor": `#${ele.bgColor}`
            })
            return label
         })

         // Modify existing DOM container if available or create new one
         const container = (() => {
            const $existing = $('.cth-fuzzy-copy-container')
            if ($existing.length) {
               $existing.children().remove()
               return $existing
            }
            return $('<div/>').addClass('bootstrap-wrapper cth-fuzzy-copy-container')
         })()

         container.append($('<span/>').html('# of TM matches: '))
         container.append(theLabels)

         if (!$mountPoint.find('.cth-fuzzy-copy-container').length) {
            $mountPoint.prepend(container)
         }
      } else {
         $('.cth-fuzzy-copy-container').remove()
      }
   }, 50)
}
