import React, {Component} from 'react'
import handleError from '../model/handleError'
import PropTypes from 'prop-types'
import {store} from '../options-index'
import Toggle from 'react-toggle'

const debug = require('cth-debug')(__filename)

// Exclude for unit-testing.
if (window) {

   require('../../../node_modules/react-toggle/style.css')

}

export default class CheckboxAndLabel extends Component {

   static propType = {
      "optionName": PropTypes.string.isRequired,
      "model": PropTypes.object
   }
   handleChange = (e) => {

      const optionName = this.props.optionName
      const settings = this.state.model.settings

      if (settings[optionName].length) {

         settings[optionName][0] = e.target.checked

      } else {

         settings[optionName] = e.target.checked

      }

      this.forceUpdate()

   }

   constructor(props) {

      super(props)
      this.state = {"model": store}

   }

   render() {

      const optionName = this.props.optionName

      if (typeof this.state.model.all[optionName] === 'undefined') {

         debug.warn('optionName', optionName)
         handleError('optionName')

      }

      const {tooltip, description} = this.state.model.all[optionName]
      const model = this.state.model
      const optionToggle = model.settings[optionName].length
         ? model.settings[optionName][0]
         : model.settings[optionName]

      return (
         <label data-toggle="tooltip" title={tooltip || ''}>
            <Toggle
               className="custom-classname"
               onClick={this.props.onClick}
               id={optionName}
               onChange={this.handleChange}
               defaultChecked={optionToggle}
               style={{"display": 'none'}}
            />
            {` ${description}`}
         </label>
      )

   }

}
