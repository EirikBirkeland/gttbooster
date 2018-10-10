import loremIpsum from 'lorem-ipsum'

import escape from 'escape-string-regexp'
import _ from 'lodash'

export default function createTooltip (option, optionName) {
   let string = '' // HMM: Add "source" "target" prefix before each string
   const getLorem = () => loremIpsum({
      "sentenceLowerBound": 3,
      "sentenceUpperBound": 7
   })

   _.forEach(option[1], (ele) => {
      const str = getLorem()

      if (optionName === 'endPunctuationMissing') {
         const strMod = str.replace(/\.$/, '') + ele
         string += `${strMod}<br/>${strMod.replace(/.$/, '').replace(/$/, '<span class=\'cth-highlight-error\'>&nbsp;</span><br/>')}`
      } else if (optionName === 'endPunctuationRedundant') {
         const strMod = str.replace(/\.$/, '')
         string += `${strMod}<br/>${strMod.replace(/$/, `<span class='cth-highlight-error'>${ele}</span><br/>`)}`
      } else if (optionName === 'extraSpacesBefore') {
         const strMod = str
         string += strMod.replace(/$/, `<span class='cth-highlight-error'>&nbsp;</span>${ele}<br/>`)
      } else if (optionName === 'forbiddenCharacters') {
         const rnd = _.random(str.length)
         const strMod = str.slice(0, rnd) + ele + str.slice(rnd)
         string += `${strMod.replace(new RegExp(`(${escape(ele)})`, 'g'), '<span class=\'cth-highlight-error\'>$1</span>')}<br/>`
      } else if (optionName === 'consecutivePunctuation') {
         const strMod = str.replace(/\./, '')
         string += strMod.replace(/$/, `<span class='cth-highlight-error'>${ele}${ele}</span><br/>`)
      }
   })
   return string
}
