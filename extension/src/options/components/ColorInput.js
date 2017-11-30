import React, {Component} from 'react'
import rgbHex from 'rgb-hex'
import {defer} from 'lodash'
import PropTypes from 'prop-types'
import {store} from '../options-index'

const debug = require('cth-debug')(__filename)

export default class ColorInput extends Component {

   static propTypes = {
      "optionName": PropTypes.string.isRequired,
      "model": PropTypes.object
   }
   handleChange = (e) => {

      debug.info(e.type)
      const rgbValue = e.target.style['background-color']
      this.state.model.settings[this.props.optionName] = rgbHex(rgbValue).toUpperCase()
      this.forceUpdate()

   }

   constructor(props) {

      super(props)
      this.state = {"model": props.model || store}

   }

   componentDidMount() {


      /**
       * It's important to initialize JSColor AFTER the DOM is completely ready.
       * This sets a delay, and initializes only once. Every input should be ready.
       */
      defer(() => {

         window.jscolor = window.jscolor || require('../../../vendor/jscolor/jscolor')

      })

   }

   render() {

      const optionName = this.props.optionName
      const option = this.state.model.settings[optionName]
      const {tooltip} = this.state.model.all[optionName]

      const inputStyle = {"backgroundColor": option}

      return <input
         onChange={this.handleChange}
         onClick={this.handleChange}
         onBlur={this.handleChange}
         className="cth-code jscolor"
         data-toggle="tooltip"
         id={optionName}
         style={inputStyle}
         title={tooltip || ''}
         value={option}
      />

   }

}
