import XRegExp from 'xregexp'

function extraSpacesBefore(string, symbols) {

   symbols = symbols ? XRegExp.escape(symbols) : symbols
   const re = new RegExp(`\\s([${symbols}])`, 'g')

   let matchArr = string.match(re)
   if (matchArr) {

      matchArr = matchArr.map((ele) => `<code>${ele}</code>`)
      return {
         "msg": `Extra space(s) found in front of ${matchArr.join(' and ')}`,
         "error": matchArr.join('')
      }

   }
   return {
      "msg": null,
      "error": null
   }

}

function forbiddenCharacters(string, symbols) {

   symbols = XRegExp.escape(symbols)
   const re = new RegExp(`[${symbols}]`, 'g')
   let matchArr = string.match(re)
   if (matchArr) {

      matchArr = matchArr.map((ele) => `<code>${ele}</code>`)
      return {
         "msg": `Forbidden character(s) found: ${matchArr.join(' and ')}`,
         "error": matchArr.join('')
      }

   }
   return {
      "msg": null,
      "error": null
   }

}

function missingEndPunctuation(sourceStr, targetStr, symbols) {

   symbols = XRegExp.escape(symbols)
   const re = new RegExp(`[${symbols}]$`, 'g')
   let initialMatch = sourceStr.match(re)
   if (initialMatch && !targetStr.match(XRegExp.escape(initialMatch[0]))) {

      initialMatch = initialMatch.map((ele) => `<code>${ele}</code>`)
      return {
         "msg": `Missing end-punctuation in target: ${initialMatch}`,
         "error": initialMatch[0]
      }

   }
   return {
      "msg": null,
      "error": null
   }

}

function redundantEndPunctuation(sourceStr, targetStr, symbols) {

   symbols = XRegExp.escape(symbols)
   const re = new RegExp(`([${symbols}])$`, 'g')

   let initialMatch = targetStr.match(re)
   if (initialMatch && !sourceStr.match(XRegExp.escape(initialMatch[0]))) {

      initialMatch = initialMatch.map((ele) => `<code>${ele}</code>`)
      return {
         "msg": `Redundant end-punctuation in target: ${initialMatch}`,
         "error": initialMatch[0]
      }

   }
   return {
      "msg": null,
      "error": null
   }

}

function consecutivePunctuation(string, symbols) {

   symbols = XRegExp.escape(symbols)
   const re = new RegExp(`([${symbols}}])\\1`, 'g')
   let matchArr = string.match(re)
   if (matchArr) {

      matchArr = matchArr.map((ele) => `<code>${ele}</code>`)
      return {
         "msg": `Consecutive punctuation: ${matchArr.join(' and ')}`,
         "error": matchArr.join('')
      }

   }
   return {
      "msg": null,
      "error": null
   }

}

export {
   extraSpacesBefore,
   forbiddenCharacters,
   missingEndPunctuation,
   redundantEndPunctuation,
   consecutivePunctuation
}
