import _ from 'lodash'
import $ from 'jquery'

// import { Storage } from '../../model/GeneralStorage'
import GoogleDiff from 'diff-match-patch'
import {customPrettyHtml} from '../custom-pretty-html'

const DOM_NODE_QUERY = ".gtc-trans-title"

/*
 * For reference:
 * cth.docInfo.docStatusOnLoad
 */
// TODO: Add ChangeReport modal with button to leave mode
 const ChangeReport = {
    init (documentStrings, cache) {
        this.documentStrings = documentStrings
        this.cache = cache || {}
        this.togg = false
    },

    addDocumentSnapshot (storeDocState, content) {
        this.cache[storeDocState] = {
            content,
            "addedDate": Date.now()
        }
    },

    /**
     *
     * @param {string} storeDocState - In translation | Completed | Translation complete | In review | In copy edit | Pending
     */
    getDiffedStrings (storeDocState) {
        if (!this.cache[storeDocState]) {
            throw new ReferenceError('Invalid cache key.')
        }

        const docStrings = this.cache[storeDocState].content

        // Return a map for debug output for now
        return _.map(this.documentStrings, (targetSeg, index) => createDiffString(docStrings[index], targetSeg))

        function createDiffString (str1, str2) {
            const dmp = new GoogleDiff()

            const diffWords = dmp.diff_main(str1, str2)
            dmp.diff_cleanupSemantic(diffWords)

            return customPrettyHtml(diffWords)
        }
    },

    toggle () {
        if (this.togg) {
            this.copyNodesAndHideOriginal()
        } else {
            this.deleteNodesAndShowOriginal()
        }
        this.togg = !this.togg
    },

    copyNodesAndHideOriginal () {
        const diffedStrings = this.getDiffedStrings('Translation')
        Array.from(cth.dom.targetSegments).forEach((unit, i) => {
            const $original = $(unit.firstChild)
            const copy = $original.clone()[0]
            copy.className = "diffCopy"
            copy.innerHTML = diffedStrings[i]
            $(unit).prepend(copy)
            $original.hide()
        })
        // Add highly visible button to leave mode easily
        $(DOM_NODE_QUERY).append(
            $('<button />').html("Exit ChangeReport mode").on('click', function () {
                this.remove()
                ChangeReport.deleteNodesAndShowOriginal()
            })
        )
    },

    deleteNodesAndShowOriginal () {
        Array.from(cth.dom.targetSegments).forEach((unit, i) => {
            $(unit).find('.diffCopy').remove()
            $(unit.firstChild).show()
        })
    }
}

export default ChangeReport