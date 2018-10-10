const debug = require('cth-debug')(__filename.replace(/^src\//, ''))

/* global _gaq ga */

function load () {
   debug.log('Running loadAnalytics()')

   window._gaq = window._gaq || []
   _gaq.push([
      '_setAccount',
      'UA-68260399-4'
   ])
   _gaq.push(['_trackPageview']);
(function () {
      const ga = document.createElement('script')
      ga.type = 'text/javascript'
      ga.async = true
      ga.src = 'https://ssl.google-analytics.com/ga.js'
      const s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(ga, s)
   }())
}

function loadNew () {
   debug.log('Running loadAnalyticsNew()')
   /* eslint-disable */
   ;(function (i, s, o, g, r, a, m) {
      i.GoogleAnalyticsObject = r
      i[r] = i[r] || function () {
         (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = Number(new Date())
      a = s.createElement(o),
         m = s.getElementsByTagName(o)[0]
      a.async = 1
      a.src = g
      m.parentNode.insertBefore(a, m)
   })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')

   ga('create', 'UA-68260399-3', 'auto')
   ga('send', 'pageview')
   /* eslint-enable */
}

function addButtonListeners () {
   const buttons = document.querySelectorAll('button')
   const input = document.querySelectorAll('input')
   for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', _trackButtonClick)
   }
   for (let i = 0; i < input.length; i++) {
      input[i].addEventListener('click', _trackButtonClick)
   }

   function _trackButtonClick (e) {
      debug.log(e)
      debug.log(e.target.id)

      /**
       *  Sometimes the damn parentNode has the id I need -- i.e. when clicking images on buttons.
       */
      const theId = (() => {
         if (!e.target.id && e.target.parentNode.id) {
            return e.target.parentNode.id
         }
         return e.target.id
      })()

      debug.log('theId: ', theId)
      chrome.runtime.sendMessage({
         "header": 'click',
         "obj": {
            "hitType": 'event',
            "eventCategory": 'document',
            "eventAction": theId,
            "eventLabel": 'theEventLabel'
         }
      }, (res) => {
         debug.log('sent click')
      })
   }
}

export {load, loadNew, addButtonListeners}
