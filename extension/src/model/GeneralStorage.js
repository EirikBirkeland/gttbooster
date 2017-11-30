/* global __filename */
// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 27.08.2016.
 */

import {promisify} from '../workbench/2_classes/tool'
import localforage from 'localforage'
import {ChromeProxy} from './ChromeProxy'

const debug = require('cth-debug')(__filename.replace(/^src\//, ''))

/**
 * Intended as a storage API to be used both on background and content page. Stuff is handled internally to make sure everything works.
 */

// TODO: This doesn't roll well with flow
const Storage = (() => {

   const errorLog = debug

   const backgroundVersion = (() => {

      function set(opts, key, value, cb) {

         const store = localforage.createInstance({"name": opts.storeName})

         if (Array.isArray(key)) {

            key.forEachAsync((ele) => {

               store.setItem(ele, value)

            }, 1)
            cb()

         } else {

            store.setItem(key, value).then(cb).catch(errorLog)

         }

      }

      function get(opts, key, cb) {

         const store = localforage.createInstance({"name": opts.storeName})
         store.getItem(key).then(cb).catch(errorLog)

      }

      function remove(opts, key, cb) {

         const store = localforage.createInstance({"name": opts.storeName})
         store.removeItem(key).then(cb).catch(errorLog)

      }

      function keys(opts, cb) {

         const store = localforage.createInstance({"name": opts.storeName})
         store.keys().then(cb).catch(errorLog)

      }

      return {
         set,
         get,
         remove,
         keys
      }

   })()

   const contentVersion = (() => {

      const sendMessage = ChromeProxy.runtime.sendMessage
      const common = {"header": 'storage'}

      /**
       *
       * @param {object} opts - options
       * @param {string} key - key name
       * @param {function} cb - callback
       */
      function _get(opts, key, cb) { // I could just add an obligatory collection name for get/set ...

         sendMessage(Object.assign(
            common,
            {
               "name": opts.storeName,
               "type": 'get',
               key
            }
         ), cb)

      }

      const get = promisify(_get)

      /**
       *
       * @param {object} opts - options
       * @param {string} key - key name
       * @param {any} value - any value
       * @param {function} cb - callback
       */
      function _set(opts, key, value, cb) {

         sendMessage(Object.assign(common, {
            "name": opts.storeName,
            "type": 'set',
            key,
            value
         }), cb)

      }

      const set = promisify(_set)

      /**
       *
       * @param {object} opts - options
       * @param {function} cb - callback
       */
      function _keys(opts, cb) {

         if (!opts.storeName) {

            return debug.warn('Provide a storeName option.')

         }
         sendMessage(Object.assign(common, {
            "name": opts.storeName,
            "type": 'keys'
         }), cb)

      }

      const keys = promisify(_keys)

      /**
       *
       * @param {object} opts - options
       * @param {string} key - key name
       * @param {function} cb - callback
       */
      function _remove(opts, key, cb) {

         sendMessage(Object.assign(common, {
            "name": opts.storeName,
            "type": 'remove',
            key
         }), cb)

      }

      const remove = promisify(_remove)

      return {
         set,
         get,
         keys,
         remove
      }

   })()

   if (/background.html$/.test(location.href)) {

      return backgroundVersion

   }

   return contentVersion

})()

export {Storage}
