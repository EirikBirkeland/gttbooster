import $ from 'jquery'
import _ from 'lodash'

import getPartOfWord from './getPartOfWord'

const debug = require('cth-debug')(__filename.replace(/^src\//, ''))

const dom = require('../../../5_init/init/doc-references').getDomRefs()

/**
 * Tricky: When a placeholder is inserted, the active selection changes to the new placeholder node. This makes it tricky to ensure the caret is reinsertd at the intended place.
 * To solve this, I will need to carefully observe how the selection object changes. And perhaps I can override this change by forcing the segment to act as one string unit for this purpose?
 */

export default function initCustomPlaceholderInsertion () {
   $(dom.targetDoc).find('#transEditor').keydown((event) => {
      if (!event.shiftKey &&
         !event.altKey &&
         event.ctrlKey &&
         event.which >= 48 &&
         event.which <= 57
      ) {
         debug.log('Placeholder insertion keyboard event detected.')

         _.delay(() => {
            const selection = dom.targetDoc.getSelection()

            if (selection.baseNode.nodeType !== 3 &&
               !(/{[0-9]\/}|{[0-9]}/).test(selection.baseNode.parentNode.nextSibling.innerHTML)) {
               debug.log('Returning because selection.basenode.nodeType !== 3 && !/{[0-9]\/}/.test(selection.baseNode.parentNode.nextSibling.innerHTML')
               return
            }

            let count = 0

            const getPartBeforeCaret = () => getPartOfWord.beforeCaret(selection)
            const getPartAfterCaret = () => getPartOfWord.afterCaret(selection)

            while (count <= 250 &&
            !(/[0-9]+\/?}/).test(getPartBeforeCaret()) &&
            positionIsNotEndOfSegment()) {
               debug.log(getPartBeforeCaret())
               count++
               debug.log('we got in here')
               selection.modify('move', 'right', 'character')
            }

            function positionIsNotEndOfSegment () {
               // Placeholder. This function should simply check whether the caret is at end of segment.
               return Boolean(selection.anchorNode.nextSibling) !== null
            }
         }, 50)
      }
   })
}
