import React, {Component} from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import createTooltip from './InputRow/createTooltip'
import CheckboxAndLabel from '../CheckboxAndLabel.js'
import Input from '../Input.js'
import {store} from '../../options-index'

export default class InputRow extends Component {

   handleClick = (e) => {

      this.forceUpdate()

   }

   constructor(props) {

      super(props)
      this.state = {
         "model": props.model || store,
         [props.optionName]: store.settings[props.optionName]
      }

   }

   render() {

      const SM = this.props.sm || 6
      const MD = this.props.md || 4
      const props = this.props
      const optionName = props.optionName
      const {maxlength, name, pattern, unit} = props

      return (
         <Row>
            <Col sm={SM} md={MD}>
               <CheckboxAndLabel
                  onClick={this.handleClick}
                  optionName={optionName}
               />
            </Col>
            <Col sm={SM} md={MD}>
               <Input
                  disabled={!this.state[optionName][0]}
                  optionName={optionName}
                  tooltip={createTooltip.bind(null, this.state.model.settings[optionName], optionName)}
                  type={props.type}
                  maxlength={maxlength}
                  name={name}
                  pattern={pattern}
                  data-equals={props['data-equals']}
                  data-error={props['data-error']}
                  unit={unit}
               />
            </Col>
         </Row>
      )

   }

}
