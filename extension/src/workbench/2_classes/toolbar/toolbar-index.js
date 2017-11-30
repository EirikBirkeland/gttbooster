/* global cth */
// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2015/11/28.
 */
import $ from 'jquery'
import ReactDOM from 'react-dom'
import React from 'react'

import addFilteringButtonRow from '../../2_classes/SegmenttypeFiltering/segmenttype-filtering'

import Toolbar from './Toolbar/Toolbar.js'

const debug = require('cth-debug')(__filename.replace(/^src\//, ''))

export default function initToolbar () {
   const existingToolbar = cth.dom.existingToolbar

   const $newToolbar = $('<span/>').addClass('cth-main-toolbar').addClass('bootstrap-wrapper')

   $newToolbar.insertBefore(existingToolbar.lastChild)

   ReactDOM.render(React.createElement(Toolbar), $newToolbar[0])

   const filteringButtonRow = addFilteringButtonRow()
   debug.log(filteringButtonRow)
   $($newToolbar).append(filteringButtonRow)
}
