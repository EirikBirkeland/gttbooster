// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2016/01/03.
 */
const XRegExp = require('xregexp')

module.exports = function () {

   XRegExp.addToken(
      /\[:([a-z\d]+):]/i,
      (function () {

         const posix = {
            "alnum": 'A-Za-z0-9',
            "alpha": 'A-Za-z',
            "ascii": '\\0-\\x7F',
            "blank": ' \\t',
            "cntrl": '\\0-\\x1F\\x7F',
            "digit": '0-9',
            "graph": '\\x21-\\x7E',
            "lower": 'a-z',
            "print": '\\x20-\\x7E',
            "punct": '!"#$%& \'()*+,\\-./:;<=>?@[\\\\\\]^_`{|}~',
            "space": ' \\t\\r\\n\\v\\f',
            "upper": 'A-Z',
            "word": 'A-Za-z0-9_',
            "xdigit": 'A-Fa-f0-9'
         }
         return function (match) {

            if (!posix[match[1]]) {

               throw new SyntaxError(`${match[1]} is not a valid POSIX character class`)

            }
            return posix[match[1]]

         }

      }()),
      {"scope": 'class'}
   )

   XRegExp.addToken(
      /\\p{Japanese}/,
      () => '[\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FD-\u30FF\u31F0-\u31FF\u32D0-\u32FE\u3300-\u3357\uFF66-\uFF6F\uFF71-\uFF9D\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DB5\u4E00-\u9FD5\uF900-\uFA6D\uFA70-\uFAD9]'
      ,
      {"scope": 'all'}
   )

   XRegExp.addToken(
      /\\p{JapanesePunct}/,
      () => '[\u3000-〾]',
      {"scope": 'all'}
   )

   XRegExp.addToken(
      /\\Q([\s\S]*?)(?:\\E|$)/,
      (match) => XRegExp.escape(match[1]),
      {"scope": 'all'}
   )

   XRegExp.addToken(
      /\\R/,
      () => '(?:\\r\\n|[\\n-\\r\\x85\\u2028\\u2029])'
   )

   XRegExp.addToken(
      /\\dot_space/,
      () => '<span class="goog-gtc-inchars-highlight goog-gtc-inchars-space goog-gtc-highlight"> </span>',
      {"scope": 'all'}
   )

}
