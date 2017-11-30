// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by Eirik on 13.07.2017.
 */
import $ from 'jquery'
import getSegmentTypeColorNames from './getSegmentTypeColorsNames'

/**
 *
 * @param targetDoc {NodeList|Array} - e.g. cth.dom.targetDoc
 * @returns {*|jQuery}
 */
export function retrieveSegmentStatuses (targetDoc) {
   return $(targetDoc).find('.goog-gtc-unit').children().map((i, ele) => ele.className)
}

export function applyTestColors (targetDoc) {
   const segmentTypeColors = getSegmentTypeColorNames(targetDoc)

   $(targetDoc).find('.goog-gtc-unit').children().map((i, ele) => {
      ele.style.color = segmentTypeColors[ele.classList[ele.classList.length - 1]]
   })
}

// TODO: I might as well create a simple, reusable localStorage wrapper for simple purposes, with a 'storage policy timer' setting
export function save () {
   localStorage['']
}

export function load () {

}

// New attribute found: gtc:info-oldcolor - it seems Google stores the old color info in each segment. How useful ;) Or, is the RGB always (0, 0, 0) ... ? If so, useless.
