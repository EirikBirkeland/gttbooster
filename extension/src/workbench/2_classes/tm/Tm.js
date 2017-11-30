import {uniqFilter} from '../tool'
import $ from 'jquery'

function buildObject() {

   const $NodeList = Array.from($('.gtc-tools-autosearch').find('.gtc-tm-suggestion-holder'))
   return $NodeList.map((ele) => ({
      "source": $(ele).find('.gtc-tm-suggestion-source').text(),
      "target": $(ele).find('.gtc-tm-suggestion-translation').text(),
      "fuzzy": parseInt($(ele).find('.cth-fuzzy').text()),
      "tm": $(ele).find('.gtc-tm-suggestion-message').text().replace(/\r?\n/g, ' ').replace(/.*?(\w+)\s+TM/, '$1')
   }))

}

const getTargetWords = function (opts) {

   const fuzzyHigherThan = opts ? opts.fuzzyHigherThan || 0 : 0
   return buildObject($).filter((ele) => ele.fuzzy > fuzzyHigherThan).map((ele) => ele.target).// Change first char to upper
   map((ele) => ele.slice(0, 1).toUpperCase() + ele.slice(1)).map((ele) => ele.split(/\s+/)).reduce((ele, acc) => acc.concat(ele), []).sort().filter(uniqFilter).map((ele) => ele.replace(/[.,]/g, ''))

}

const Tm = {
   buildObject,
   getTargetWords
}

export {Tm}
