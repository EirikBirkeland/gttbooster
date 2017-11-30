import $ from 'jquery'
import _ from 'lodash'

const debug = require('cth-debug')(__filename.replace(/^src\//, ''))

/**
 *Output
 * @param {Array} output
 * @param {Node} targetNode
 */
export default function assembleAndRenderOutput(output, targetNode) {

   debug.log(output)

   _addBrs()

   output = output.join('')

   const $outputNode = $('<span/>')

   $outputNode.addClass(`cth-message${targetNode.id} cth-message ${targetNode.id}`)

   $outputNode.html(output)

   $outputNode.html($outputNode.html().replace(/^(?!<br>)/, '<br>').replace(/<br>$/, ''))

   $(targetNode).append($outputNode.clone())

   function _addBrs() {

      _.forEach(output, (ele, i, arr) => {

         if (i !== output.length - 1) {

            arr[i] = arr[i].replace(/$/, '<br>')

         }

      })

   }

}
