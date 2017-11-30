import _ from 'lodash'
import {TransEditor} from './TransEditor'
import {Segment} from '../Segment/Segment'
import _checkCurrentSegment from '../Qa/checkCurrentSegment'

/**
 * Function to execute when the user types, as detected by listening for keyboard input
 * @type {Function}
 */
const checkCurrentSegment = _.debounce(_checkCurrentSegment, 500, {
   "leading": false,
   "trailing": true
})

export function updateTheTransEditor() {

   TransEditor.removeButtons()

   const currentSeg = Segment.create(cth.dom.currentTargetSegment)

   if (currentSeg.hasInconsistencies) {

      TransEditor.addButtonsToBar([
         {
            "value": currentSeg.inconsistentSegmentIds.length,
            "title": `This segment is inconsistent with ${currentSeg.inconsistentSegmentIds.length} other segments.`,
            "color": 'white',
            "bgColor": 'red',
            "id": 'cth-inconsistent-segments-exist',
            onClick() {

               currentSeg.copyContentsToDuplicates()
               updateTheTransEditor()
               checkCurrentSegment()

            }
         }
      ])

   } else if (currentSeg.hasDuplicates) {

      TransEditor.addButtonsToBar([
         {
            "value": currentSeg.numDuplicates,
            "title": `This segment has ${currentSeg.numDuplicates} duplicates (source).`,
            "color": 'black',
            "bgColor": 'yellow',
            "id": 'cth-duplicate-segments-exist'
         }
      ])

   }

   TransEditor.addButtonsToBar([
      {
         "value": '',
         "title": 'Click to add this handy label. Use it to leave yourself hints.',
         "color": 'black',
         "bgColor": '#5bc0de',
         "bsStyle": 'info',
         "glyphicon": 'glyphicon glyphicon-ok',
         "id": 'cth-add-label-1',
         onClick() {

            currentSeg.toggleLabels({
               "bsStyle": 'info',
               "id": 'cth-label-1'
            })

         }
      },
      {
         "value": '',
         "title": 'Click to add this handy label. Use it to leave yourself hints.',
         "color": 'white',
         "bgColor": '#f0ad4e',
         "bsStyle": 'warning',
         "glyphicon": 'glyphicon-exclamation-sign',
         "id": 'cth-add-label-2',
         onClick() {

            currentSeg.toggleLabels({
               "bsStyle": 'warning',
               "id": 'cth-label-2'
            })

         }
      },
      {
         "value": '',
         "title": 'Click to add this handy label. Use it to leave yourself hints.',
         "color": 'white',
         "bgColor": '#d9534f',
         "bsStyle": 'danger',
         "glyphicon": 'glyphicon-remove',
         "id": 'cth-add-label-3',
         onClick() {

            currentSeg.toggleLabels({
               "bsStyle": 'danger',
               "id": 'cth-label-3'
            })

         }
      }
   ])

}
