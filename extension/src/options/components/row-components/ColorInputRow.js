import React, { Component } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import ColorInput from '../ColorInput'
import { store } from '../../options-index'

export default class OptionWithInputRow extends Component {
   constructor (props) {
      super(props)
      this.state = { "model": props.model || store }
   }

   render () {
      const SM = this.props.sm || 6
      const MD = this.props.md || 4
      const props = this.props
      const optionName = props.optionName

      return (
         <Row>
            <Col sm={SM} md={MD}>{this.state.model.all[optionName].description}</Col>
            <Col sm={SM} md={MD}><ColorInput optionName={optionName}/></Col>
         </Row>
      )
   }
}
