import $ from 'jquery'

import React from 'react'
import { render } from 'react-dom'
import Body from './pages/Body'
import { load } from '../model/SettingsStorage'
import { store } from './store'

import configureStore from './store/configureStore'
const debug = require('cth-debug')(__filename)

require('bootstrap')
require('../../css/sweetalert.css')
require('../../css/main.css')

/* TODO: What is the difference between the two source css files? require('../../css/localize-bootstrap-for-options.less') */
require('../../node_modules/bootstrap/dist/css/bootstrap.css')

// My Options css
require('./styles.css')

$(document).ready(() => {
   load(store.settings, (updatedSettings) => {
      store.settings = Object.assign(store.settings, updatedSettings)

      render(<Provider store={store}>
         {/* <Body model={store}/> */}
         <Body/>
      </Provider>, document.getElementById('app'))

      // Enable bootstrap tooltips
      $('[data-toggle="tooltip"]').tooltip({ "container": 'body', "html": true })

      // Activate popovers
      $('.cth-popover').popover({ "html": true, "container": 'body', "trigger": 'hover' })
   })
})

export {
   store
}
