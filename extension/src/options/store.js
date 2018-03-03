import { Storage } from '../model/GeneralStorage'
import Aspell from '../model/Aspell'

const debug = require('cth-debug')(__filename)

// TODO: Upgrade store to Redux for practice.

/**
 * The 'store' object. This is accessed globally by all components.
 *
 * @type {{all: Object, settings: Object}}
 */
export const store = {
   "all": Object.freeze(require('./settings').settings),
   "settings": require('./settings').defaults
}

// Additional operation for Options screen
Aspell.aspellLangCodes.forEach((ele) => {
   Storage.keys({ "storeName": ele }).then((res) => {
      if (res && res.length) {
         // Logger.warn('res', res)
         store.all.spellcheckStoreSelector.values.push(ele)
      }
   }).catch((err) => debug.log(err))
})

store.all.spellcheckOverride.values = Aspell.reorderedAccordingToAvailableAccounts()
