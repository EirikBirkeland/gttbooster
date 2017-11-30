// Copyright © 2016 Eirik Birkeland. All rights reserved.

import $ from 'jquery'

const _ = require('lodash')
const debug = require('cth-debug')(__filename.replace(/^src\//, ''))

/**
 * How the feature should work:
 * 1. DEFAULT: When hiding a segment type, target segments should be entirely hidden, but source segments should be colored grey. This provides for more reading context.
 * 2. When hiding a segment type, target AND source segments should be filtered from view visibly, resulting in a compressed view.
 */
// TOOL: Very, very useful tool for checking whether a element is effectively hidden due to any parents that are hidden (like display none). I should use this for at least checking for any unintentionally hidden elements during development.

// FIXME: After combining segments, cannot hide messageBlocks.

// FIXME: 2017 July - https://translate.google.com/toolkit/workbench?did=00dm33g01opafv505rsw&hl=en

// TODO: A fast and cheap alternative would be to disable the feature for documents that contain bullets ;-) The user would most likely respect this, and feel that we care about their 'well-being'.

// TODO: Convert this all to a React component to allow for reactive updates without having to do a lot of stuff to achieve updates.

/**
 *
 * @param el
 * @returns {boolean}
 */
function isHidden (el) {
   return el.offsetParent === null
}

const state = {}

/**
 *
 */
function checkAllForAccidentallyConcealed () {
   _.forOwn(state, (state, className) => {
      if (state === true) {
         _findConcealed(className)
      }
   })

   function _findConcealed (className) {
      const classMembers = $(window.cth.dom.targetDoc).find(className.replace(/ /g, '.'))
      _.forEach(classMembers, (ele) => {
         if (isHidden(ele)) {
            debug.log(`The element ${ele} should not be concealed from view, but nonetheless it is!`)
         }
      })
   }
}

const CTH_INSERTED_SOURCE_TEXT = 'cth_insertedSourceText'
const CTH_SOURCE_BUTTON = 'cth_sourceButton'

const classObj = {
   "cth_ice100Button": 'goog-gtc-from-tm-score-100-ice',
   "cth_tm100Button": 'goog-gtc-from-tm-score-100',
   "cth_fuzzyButton": 'goog-gtc-from-tm-score-90',
   "cth_fuzzyButton2": 'goog-gtc-from-tm-score-99',
   "cth_fuzzyButton3": 'goog-gtc-from-tm-score-100-fuzzy',
   "cth_mtButton": 'goog-gtc-from-mt',
   "cth_transButton": 'goog-gtc-from-human',

   /**
    * NOTE: 2016 - I've decided to ignore goog-gtc-ph-missing because of an overlap with other segment types, which might confuse users.
    */
   // "cth_missingPHButton": "goog-gtc-ph-missing",
   [CTH_SOURCE_BUTTON]: 'goog-gtc-from-source',
   "cth_notranslateButton": 'gkms notranslate',
   "cth_SnippetContent": 'SnippetContent notranslate'
}

export default function addFilteringButtonRow () {
   const color = {}

   _.forOwn(classObj, (value, key) => {
      const className = window.cth.dom.targetDoc.getElementsByClassName(classObj[key])[0]
      color[key] = className ? className.style.color : null
   })

   /*
    * Note: Segments with classname "goog-gtc-from-source" do not have a color attribute,
    * and the color cannot be changed, so setting a color manually:
    */
   if ($(window.cth.dom.targetDoc).find('.goog-gtc-from-source').length > 0) {
      color[CTH_SOURCE_BUTTON] = window.cth.dom.targetDoc.getElementsByClassName(classObj.sourceButton) ? '#000000' : null
   }

   const addButtons = (function () {
      const buttons = {}
      const $button = $('<div/>').attr({"role": 'button'}).addClass('btn btn-lg')

      return function (classObj, color) {
         const $container = $('<span/>').addClass('btn-group')
         _.forOwn(classObj, (value, key) => {
            if (color[key] !== null) {
               buttons[key] = $button.clone()
               $(buttons[key]).attr('title', classObj[key]).attr('id', key).css({
                  'background-color': color[key],
                  'border-color': 'black'
               })
               $container.append(buttons[key])
               _.delay(() => {
                  $(`#${key}`).click(toggle(key, classObj[key]))
               }, 1000)
            }
         })
         return $container[0]
      }
   }())

   const retEle = addButtons(classObj, color)

   hideButtonIfNoElementsFound()

   return retEle

   // Hide
   function hideButtonIfNoElementsFound () {
      setInterval(() => {
         _.forOwn(classObj, (value, key) => {
            const someClass = $(window.cth.dom.targetDoc).find(`.${value.replace(/ /g, '\.')}`)
            if (someClass.length === 0) {
               $(`#${key}`).hide() // Or delete?
            }
         })
      }, 10000)
   }

   /**
    *
    * @param key - a key from the classObj, which is an ID for one of the classname types. E.g. cth_ice100Button
    * @param className -
    * @returns {Function}
    */
   function toggle (key, className) {
      const button = $(`#${key}`)[0]
      state[className] = false

      return function () {
         if (!state[className]) {
            _toggleClass(className, 'none')
            button.style.borderColor = 'red'
            state[className] = true
            checkAllForAccidentallyConcealed()
         } else {
            _toggleClass(className, '')
            button.style.borderColor = 'black'
            state[className] = false
         }
      }

      /**
       *
       * @param {string} className - a string of classname(s)
       * @param {string} displayValue - empty string or 'none'
       * @private
       */
      function _toggleClass (className, displayValue) {
         const $$classMembers = $(window.cth.dom.targetDoc).find(`.${className.replace(/ /g, '.')}`)

         // For goog-gtc-****
         _.forEach($$classMembers, (ele, i, arr) => {
            const messageBlocks = $(window.cth.dom.targetDoc).find('.goog-gtt-messageblock')[0]

            // MessageBlocks seem to be simpler than with the LI stuff, so I need just check siblings.
            if (messageBlocks) {
               let flag = false
               const $$siblings = $(arr[i]).parent().siblings()

               _.forEach($$siblings, (ele) => {
                  if (ele.style.display !== 'none' &&
                     !$(ele).hasClass(arr[i].parentNode.id) &&
                     ele.tagName !== 'BR' &&
                     !$(ele).hasClass('notranslate')) {
                     flag = true
                  }
               })

               if (!flag) {
                  _toggleMessageBlocks(arr[i], displayValue)
               }
            }

            const tmpId = arr[i].parentNode.id

            if (tmpId) {
               /**
                *  Get corresponding source segment and change its color to 'grey' + tag it for exclusion (mainly for QA)
                */
               const a = $(window.cth.dom.sourceDoc).find(`#${tmpId}`)[0]

               /*
                * Leaving for now for later debugging. Simply ignoring an error by adjusting the code can be a bad thing. It is better to first get at the root case.
                * In other words, doing throw { myFunc() } catch (err) { } without implementing err or equivalent can be a bad thing.
                */

               $(a.firstChild).css({"color": !a.firstChild.style.color ? 'LightGrey' : ''})
               $(a).addClass('cth-filtering-exclude')
            }

            _changeDisplayValue(arr[i], displayValue, className)

            _toggleTrailingBRs(arr[i], displayValue, className)
         })

         /**
          *
          * @param {Node} targertNode
          * @param {string} displayValue - empty string or 'none'
          * @param {string} className - a string of classname(s)
          */
         function _changeDisplayValue (targetNode, displayValue, className) {
            // Return if the found node is part of insertedText ... as further processing could lead to errors. E.g. if a SnippetContent is inserted, it does not make sense to expect to look for a 'goog'gtc'-unit' parent as just below.

            // Return early if SnippetContent is found *within* translateable segments, as we never want to hide such data
            if (/gkms|SnippetContent/.test(targetNode.classList)) {
               if ($(targetNode).closest('.goog-gtc-unit').length > 0) {
                  return
               }
               if ($(targetNode).closest(`.${CTH_INSERTED_SOURCE_TEXT}`).length > 0) {
                  return
               }
            }

            let bad = false

            const segId = targetNode.parentNode.id

            const $$siblings = $(targetNode).parent().siblings()
            _.forEach($$siblings, (sibling) => {
               if ($(sibling).hasClass(`${CTH_INSERTED_SOURCE_TEXT}_${segId}`)) {
                  sibling.style.display = displayValue
               }
            })

            const $$higherUpLi = $(targetNode).closest('li')
            // Principle: If have differently colored child, which are not already hidden, then don't hide.
            if ($$higherUpLi && $$higherUpLi.length) {
               /**
                * PLAYING IT SAFE: Will not hide the LI when a different segment-type child is present.
                */

               const differentChildrenUnits = $$higherUpLi.find('.goog-gtc-unit').children().filter((i, ele) => !ele.classList.value.match(className))
               if (differentChildrenUnits.length) {
                  bad = true
               }

               // If the parent node has "goog-gtc-unit" siblings, check the actual classes for their children (e.g. goog-gtc-from-human)
               _.forEach($$siblings, (sibling) => {
                  if ($(!sibling).hasClass(`${CTH_INSERTED_SOURCE_TEXT}_${segId}`)) {
                     const child = sibling.firstChild
                     if (child) {
                        if (child.classList &&
                           !_.every(child.classList, (clas) => className.indexOf(clas)) &&
                           child.style.display !== 'none') {
                           bad = true
                        } else if (
                           /UL|OL/.test(sibling.tagName) &&
                           sibling.style.display !== 'none') {
                           bad = true
                        }
                     }
                  }
               })

               // This is to ensure that no unhidden different-class goog-gtc-units are not present.
               if (!bad) {
                  debug.log($$higherUpLi[0])
                  $$higherUpLi[0].style.display = displayValue
               }
            }

            targetNode.style.display = displayValue

            // NOTE: This forEach was wrapped in the if condition on 07.10.2016. It avoids a sizzle selector error when something does not have an associated segId variable.
            if (segId) {
               _.forEach($(window.cth.dom.targetDoc).find(`.${segId}`), (ele) => {
                  ele.style.display = displayValue
               })
            }
            if (targetNode.parentNode.className.match(/goog-gtc-unit|goog-gtc-unit-attr-2/)) {
               targetNode.parentNode.style.display = displayValue
            }
         }
      }

      /**
       *
       * @param {Node} node
       * @param {string} displayValue - empty string or 'none'
       * @private
       */
      function _toggleMessageBlocks (node, displayValue) {
         const messageblockParentsTarget = _.filter($(node).parents(), (x) => x.className && x.className === 'goog-gtt-messageblock')
         const messageblockParentsSource = _.filter($(window.cth.dom.sourceDoc).find(`#${node.parentNode.id}`).parents(), (x) => x.className && x.className === 'goog-gtt-messageblock')

         if (messageblockParentsTarget.length === 1) {
            if (displayValue === 'none') {
               $(messageblockParentsTarget[0]).hide()
               $(messageblockParentsSource[0]).hide()
            } else if (displayValue === '') {
               $(messageblockParentsTarget[0]).show()
               $(messageblockParentsSource[0]).show()
            }
         } else if (messageblockParentsTarget.length > 1) {
            debug.log('An element has more than one messageblock ancestor? Interesting.')
         }
      }
   }

   /**
    *
    * @param {Node} node
    * @param {string} displayValue - empty string or 'none'
    * @private
    */
   function _toggleTrailingBRs (node, displayValue) {
      const p = node.parentNode

      /*
       * Was getting a TypeError for some documents due to non-existing nodes/attribute,
       * but by checking truthiness first the problem is avoided.
       */
      if (p && p.nextSibling && p.nextSibling.tagName === 'BR') {
         p.nextSibling.style.display = displayValue
      } else {
         return
      }
      let pos = p.nextSibling
      try {
         while (pos.nextSibling.tagName === 'BR') {
            pos.nextSibling.style.display = displayValue
            pos = pos.nextSibling
         }
      } catch (err) {
         debug.log(err.message)
      }
   }
}
