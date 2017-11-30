import React, {Component} from 'react'
import 'bootstrap-validator'
import PropTypes from 'prop-types'
import $ from 'jquery'
import {store} from '../options-index'

export default class Input extends Component {

   static propType = {
      "optionName": PropTypes.string.isRequired,
      "model": PropTypes.object
   }
   handleChange = (e) => {

      this.state.model.settings[this.props.optionName][1] = e.target.value
      this.forceUpdate()

   }

   constructor(props) {

      super(props)
      this.state = {"model": props.model || store}

   }

   componentDidMount() {

      $(this.refs.form).validator()

   }

   render() {

      const props = this.props
      const optionName = props.optionName
      const option = this.state.model.settings[optionName]
      const unit = this.state.model.all[optionName].suffix || props.unit
      const tooltip = typeof props.tooltip === 'function' ? props.tooltip() : props.tooltip

      return <form ref="form" data-toggle="validator" role="form">
         <div className="form-group has-feedback">
            <div className="input-group">
             <span className="input-group-addon">{unit || <span
                className="glyphicon glyphicon-question-sign"
                data-toggle="tooltip"
                title={tooltip}
                style={{"display": props.tooltip ? '' : 'none'}}
             />}
              </span>
               <input
                  onChange={this.handleChange}
                  className="form-control cth-code"
                  data-equals={props['data-equals']}
                  data-error={props['data-error']}
                  disabled={props.disabled || false}
                  id={optionName}
                  maxLength={props.maxlength}
                  name={props.name}
                  pattern={props.pattern}
                  required
                  type={props.type}
                  value={option[1]}
               />
            </div>
            <span className="glyphicon form-control-feedback" aria-hidden="true"/>
            <div className="help-block with-errors"/>
         </div>
      </form>

   }

}
