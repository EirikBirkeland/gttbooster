// Copyright © Eirik Birkeland. All rights reserved.
/*
 * Created by eb on 2015/08/03.
 */


import calculate from './calculateLqe.js'
import $ from 'jquery'
import _ from 'lodash'

const debug = require('cth-debug')(__filename)

require('./LQE.css')

/**
 * Enters a message into the LQA
 * @class
 */
const Lqe = (() => {
   const lqe = {}

   /**
    * @constructor
    */
   lqe.init = function () {
      /**
       *
       * @type {string}
       */
      this.tdHeader = 'td-header'

      /**
       *
       * @type {string}
       */
      this.tdHeaderTitle = 'td-header-title'

      /**
       *
       * @type {string}
       */
      this.tdHeaderValue = 'td-header-value'

      /**
       *
       * @type {object}
       */
      this.stats = {}

      /**
       *
       * @type {NodeList}
       */
      this.tdHeaderList = document.getElementsByClassName(this.tdHeader)

      /**
       *
       * @type {RegExp}
       */
      this.targetCellIdentifier = /Errors 1K words/i
   }

   lqe.run = function () {
      this.assignToObject(this.getNumbersArray())
      this.insertResultsIntoPage()
   }

   lqe.insertResultsIntoPage = function () {
      const $headerToInsert = $('<span/>').addClass(this.tdHeaderTitle).html('<span title=\'GTT Booster\'>Change to pass:</span>')
      const $contentToInsert = $('<span/>').addClass(this.tdHeaderValue)

      if (calculate(this.stats.WC, this.stats.errors1k)) {
         $contentToInsert.html(`<b><span style='color: white'>${calculate(this.stats.WC, this.stats.errors1k).textReport}</span></b>`)
      }

      const insertLocation = _getInsertLocationNode.call(this)

      const $fragment = $(document.createDocumentFragment())

      $fragment.append($('<br/>'), $headerToInsert, $('<br/>'), $contentToInsert)
      insertLocation.append($fragment[0])

      function _getInsertLocationNode () {
         if (this === window) {
            debug.warn('You need to call me!')
         }

         const list = this.tdHeaderList
         for (let i = 0; i < list.length; i++) {
            if (list[i].innerHTML.match(this.targetCellIdentifier)) {
               return list[i]
            }
         }
         return null
      }
   }

   lqe.assignToObject = function (arr) {
      this.stats.all = function () {
         return `The wordcount (WC) is ${this.WC}\nThe weighted word count (WWC) is ${this.WWC}\nThe errors per 1k words are ${this.errors1k}`
      }
      this.stats.WC = arr[1]
      this.stats.WWC = arr[2]
      this.stats.errors1k = arr[3]
   }

   lqe.getNumbersArray = function () {
      const numbersArr = []
      try {
         let wordCount = ''
         let errors1k = ''

         _.forEach(this.tdHeaderList, (node) => {
            if (node.innerHTML.match(/WC\s+\(WWC\):/i)) {
               wordCount = node
            } else if (node.innerHTML.match(this.targetCellIdentifier)) {
               errors1k = node
            }
         })
         numbersArr.push(...wordCount.childNodes[3].innerHTML.match(/^\s*([0-9]+)\*? \((.*?)\)/))
         numbersArr.push(errors1k.childNodes[3].innerHTML.match(/[0-9]+\.[0-9]+/)[0])
      } catch (e) {
         debug.warn(e)
         debug.warn('Google may have moved the LQE data again. Please report this error! Thank you.')
      }
      return numbersArr
   }
   return lqe
})()

export default Lqe
