// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 20.03.2017.
 */

import {Sheet} from '../../../../model/qa-sheet-google'
import indicateError from '../Spreadsheet/indicateError'
import {store} from '../../../options-index'

const debug = require('cth-debug')(__filename)

export default function qaSheetFetch (cb) {
   const qaSheet = new Sheet({
      "url": store.settings.spreadsheetURL,
      "sheetname": 'Main',
      onValidationError (msg) {
         debug.warn(msg)
         indicateError(msg)
      },
      onError (msg) {
         debug.warn(msg)
         indicateError(msg)
      }
   })

   qaSheet.fetch((err, res, sheetNames) => {
      if (err) {
         debug.warn(err)
         indicateError(err)
      }

      if (sheetNames && sheetNames.length) {
         if (cb) {
            return cb(sheetNames)
         }
      }
   })
}
