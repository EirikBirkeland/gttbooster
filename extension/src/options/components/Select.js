// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 21.03.2017.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { store } from '../options-index'

const FORCE_UPDATE_DELAY = 1000

export default class Select extends Component {
   constructor (props) {
      super(props)
      this.state = {
         "model": store,
         "getOptionItems": () => store.all[props.optionName].values.map((ele, i) => {
            return (
               <option key={ele + i} value={ele}>{ele}</option>
            )
         })
      }
      this.option = this.state.model.settings[props.optionName]
   }

   handleChange = (e) => {
      this.option[1] = e.target.value
      if (this.props.fn) {
         this.props.fn(e.target.value)
      }
      this.forceUpdate()
   }

   render () {
      const optionName = this.props.optionName

      return (
         <select
            onChange={this.handleChange}
            onClick={this.handleChange}
            value={this.option[1] || ''}
            id={optionName}
         >
            {this.state.getOptionItems()}
         </select>
      )
   }

   componentDidMount () {
      setTimeout(() => {
         this.forceUpdate()
      }, FORCE_UPDATE_DELAY)
   }
}

Select.propType = {
   "optionName": PropTypes.string.isRequired,
   "model": PropTypes.object
}
