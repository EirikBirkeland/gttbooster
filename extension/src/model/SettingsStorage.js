// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 18.11.2016.
 */

import _ from 'lodash'
import {parseStringifiedValue} from '../workbench/2_classes/tool'
import {ChromeProxy} from './ChromeProxy'

const debug = require('cth-debug')(__filename.replace(/^src\//, ''))

/**
 *
 * @param settings {object} - settings object; this does not get mutated
 * @param cb {function} - do something with the retrieved data
 */
function load(settings, cb) {

   ChromeProxy.storage.local.get(settings, (retrievedSettings) => {

      _transformSettings(retrievedSettings)

      return cb(retrievedSettings)

   })

}

/**
 *
 * @param retrievedSettings {Object} - transform the retrieved settings
 * @private - used internally
 */
function _transformSettings(retrievedSettings) {

   for (const key of Object.keys(retrievedSettings)) {

      if (Array.isArray(retrievedSettings[key])) {

         _.forEach(retrievedSettings[key], (ele, i) => {

            retrievedSettings[key][i] = parseStringifiedValue(retrievedSettings[key][i])

         })

      } else {

         retrievedSettings[key] = parseStringifiedValue(retrievedSettings[key])

      }

   }

}

/**
 * NOTE: Whitespace is trimmed before storing!
 * @param settings {object} - the "global" settings object
 * @param [cb] {function} - any callback action
 */
function save(settings, cb) {

   const obj = {}

   _.forOwn(settings, (value, key) => {

      if (Array.isArray(settings[key])) {

         obj[key] = []

         _.forEach(settings[key], (ele, i) => {

            obj[key][i] = typeof settings[key][i] === 'string'
               ? settings[key][i].replace(/\s+/g, '')
               : settings[key][i]

         })

      } else {

         obj[key] = settings[key]

      }

   })
   // Save all for now directly from settings without whitespace trimming, and edit later:
   ChromeProxy.storage.local.set(obj, () => {

      debug.log('Saved!')
      if (cb) {

         cb()

      }

   })

}

/**
 *
 * @param settings {object} - the "global" settings object
 * @param defaults {object} - the defaults to use for overwriting
 */
function resetToDefaults(settings, defaults) {

   _.forOwn(settings, (value, key) => {

      debug.log(defaults[key])
      if (Array.isArray(settings[key])) {

         _.forEach(settings[key], (ele, i) => {

            settings[key][i] = defaults[key].default[i]

         })

      } else {

         settings[key] = defaults[key].default

      }

   })
   save(settings, location::location.reload)

}

export {load, save, resetToDefaults}
