import $ from 'jquery'
import {replaceSegmentTypeWithSource} from '../2_classes/upper-lib/replaceSegmentTypeWithSource'
import {notifier} from '../2_classes/notifier'

const replaceMtWithSource = function () {

   replaceSegmentTypeWithSource('goog-gtc-from-mt', cth.dom.sourceDoc, cth.dom.targetSegments)
   notifier.info(`Replacing ${$(cth.dom.targetDoc).find('.goog-gtc-from-mt').length} MT segments with source`)

}
const replaceFuzzyWithSource = function () {

   replaceSegmentTypeWithSource('goog-gtc-from-tm-score-90', cth.dom.sourceDoc, cth.dom.targetSegments)
   notifier.info(`Replacing ${$(cth.dom.targetDoc).find('.goog-gtc-from-tm-score-90').length} fuzzy segments with source`)

}

export {replaceMtWithSource, replaceFuzzyWithSource, replaceSegmentTypeWithSource}
