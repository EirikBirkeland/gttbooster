import $ from 'jquery'

/**
 *
 * @param targetDoc
 * @returns {{goog-gtc-from-tm-score-100: null, goog-gtc-from-tm-score-100-ice: null, goog-gtc-from-tm-score-90: null, goog-gtc-from-mt: null, goog-gtc-from-human: null, goog-gtc-from-source: null}}
 */
export default function getSegmentTypeColorNames (targetDoc) {
   const tm = $(targetDoc).find('.goog-gtc-from-tm-score-100')
   const ice = $(targetDoc).find('.goog-gtc-from-tm-score-100-ice')
   const fuzzy = $(targetDoc).find('.goog-gtc-from-tm-score-90')
   const mt = $(targetDoc).find('.goog-gtc-from-mt')
   const human = $(targetDoc).find('.goog-gtc-from-human')
   const source = $(targetDoc).find('.goog-gtc-from-source')

   return {
      'goog-gtc-from-tm-score-100': tm.length ? tm[0].style.color : null,
      'goog-gtc-from-tm-score-100-ice': ice.length ? ice[0].style.color : null,
      'goog-gtc-from-tm-score-90': fuzzy.length ? fuzzy[0].style.color : null,
      // FIXME: Double-check: goog-gtc-from-mt may be incorrect.
      'goog-gtc-from-mt': mt.length ? mt[0].style.color : null,
      'goog-gtc-from-human': human.length ? human[0].style.color : null,
      'goog-gtc-from-source': source.length ? source[0].style.color : null
   }
}
