// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 20.03.2017.
 */
import React, {Component} from 'react'
import 'bootstrap-validator'
import PropTypes from 'prop-types'
import {store} from '../options-index'

export default class CleverInput extends Component {
   static propType = {
      "optionName": PropTypes.string.isRequired,
      "model": PropTypes.object
   }
   handleChange = (e) => {
      this.state.model.settings[this.props.optionName] = e.target.value
      if (this.props.fn) {
         this::this.props.fn()
      }
      this.forceUpdate()
   }

   constructor (props) {
      super(props)
      this.state = {"model": store}
   }

   render () {
      const optionName = this.props.optionName
      const option = this.state.model.settings[optionName]
      const {tooltip, description, defaultInputText, type, imageUrl, popoverHeader} = this.state.model.all[optionName]

      return (
         <form ref="form" className={this.props.className} data-toggle="validator" role="form">
            <div className="form-group has-feedback">
               <label htmlFor={optionName} className="control-label">{description}</label>
               <input
                  onChange={this.handleChange}
                  className="form-control col-xs-4 cth-code"
                  data-equals={this.props['data-equals']}
                  data-inlist={this.props['data-inlist']}
                  data-toggle="tooltip"
                  id={optionName}
                  onKeyUp={this.handleChange}
                  placeholder={defaultInputText}
                  required
                  style={{"backgroundColor": `#${option}`}}
                  title={tooltip || ''}
                  type={type}
                  value={option}
               />
               <span className="glyphicon form-control-feedback" aria-hidden="true"/>

               <a
                  href="#"
                  title={popoverHeader}
                  className="cth-popover btn large primary"
                  data-toggle="popover"
                  data-placement="right"
                  data-content={`<img src='${imageUrl}'></img>`}
                  style={{"display": imageUrl ? '' : 'none'}}
               >
                <span
                   className="glyphicon glyphicon-question-sign"
                   data-toggle="tooltip"
                   title={this.props.tooltip || ''}
                />
               </a>

            </div>
         </form>
      )
   }
}
