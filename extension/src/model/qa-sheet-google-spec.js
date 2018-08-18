import test from 'ava'
import sinon from 'sinon'
import {Sheet} from './qa-sheet-google'

const debug = require('debug')(__filename)

// Mocked only what's needed for the test
const validMockData = {
   "Main": {
      "elements": [
         {
            "priority": 'high',
            "products": '',
            "source_pattern": 'proposal line itemz',
            "target_pattern": 'foreslåtte ordrelinjer',
            "correction": 'forslagsordrelinjer',
            "comment": '',
            "error_type": '',
            "toggle": 'on',
            "special": 'standard',
            "case_sensitive": 'no',
            "match_type": 'standard'
         }
      ]
   },
   "sheet2": {"elements": []}
}
const invalidMockData = {
   "Main": {
      "elements": [
         {
            "priority": 'high',
            "products": '',
            "source_pattern": 'proposal line itemz',
            "target_pattern": 'foreslåtte ordrelinjer',
            "correction": 'forslagsordrelinjer',
            "error_type": '',
            "toggle": 'on',
            "special": 'standard',
            // Case_sensitive: 'no',
            "match_type": 'standard'
         }
      ]
   },
   "sheet2": {"elements": []}
}

const TabletopStub = function (mockData) {
   return {
      init ({key, sheetId, callback, simpleSheet, debug}) {
         setTimeout(() => callback(null, mockData), 0)
      }
   }
}

test.cb('should fetch a valid Google spreadsheet', (t) => {
   const options = {
      "url": 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSyz9Z_-ObuE4A-oszCPuxPInGQkkJzZDqqXldikgnNdabjrTs6Dp5m8iTJLCl6dkzVCDe_JB7VpuNe/pubhtml',
      "sheetname": 'Main',
      onValidationError (msg) {
         debug(msg)
      },
      onError (msg) {
         debug(msg)
      },
      "tabletopMock": TabletopStub(validMockData)
   }

   const qaSheet = new Sheet(options)

   qaSheet.fetch((err, res) => {
      if (err) {
         debug(err)
         t.end(false)
      }

      if (res) {
         t.end()
      }
   })
})

test.cb('should fetch a Google spreadsheet with invalid headers', (t) => {
   const options = {
      "url": 'https://docs.google.com/spreadsheets/d/1Z73M7OnJ8a9Lta01-9q_nO84PyfHEIWkwHWcQtNri5s/edit?ts=595f7956#gid=0',
      "sheetname": 'Main',
      onValidationError (msg) {
         debug(msg)
      },
      onError (msg) {
         debug(msg)
      },
      "tabletopMock": TabletopStub(invalidMockData)
   }

   const qaSheet = new Sheet(options)

   qaSheet.fetch((err, res) => {
      if (err) {
         debug(err)
         t.end(false)
      }

      if (res) {
         t.end()
      }
   })
})

test.cb('should not fetch a Google spreadsheet because it was provided with a faulty URL', (t) => {
   const options = {
      "url": undefined,
      "sheetname": 'Main',
      onValidationError (msg) {
         debug(msg)
      },
      onError (msg) {
         debug(msg)
      },
      "tabletopMock": TabletopStub(validMockData)
   }

   const qaSheet = new Sheet(options)

   qaSheet.fetch((err, res) => {
      if (err) {
         debug(err)
         t.end(false)
      }

      if (res) {
         t.end()
      }
   })
})

test.cb('should not fetch a Google spreadsheet because tabletopMock was provided with no data', (t) => {
   const errorWasTriggered = sinon.spy()
   const options = {
      "url": undefined,
      "sheetname": 'Main',
      onValidationError (msg) {
         debug(msg)
      },
      onError (msg) {
         debug(msg)
         errorWasTriggered()
      },
      "tabletopMock": TabletopStub()
   }

   const qaSheet = new Sheet(options)

   qaSheet.fetch((err, res) => {
      if (!errorWasTriggered.called) {
         t.end(true)
      }

      debug("err: ", err)
      t.end(false)
   })
})
