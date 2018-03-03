import React, { Component } from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import CheckboxAndLabel from '../../components/CheckboxAndLabel.js'
import InputRow from '../../components/row-components/InputRow'
import ColorInputRow from '../../components/row-components/ColorInputRow'
import { store } from '../../options-index'

export default class QaChecksContent extends Component {
   constructor (props) {
      super(props)
      this.state = { "all": store.all }
   }

   render () {
      const SM = this.props.sm || 6
      const MD = this.props.md || 4

      return (
         <div className="cth-content-container col-md-8 col-sm-12">
            <Grid ref="local">
               <Row>
                  <Col sm={SM} md={MD}><CheckboxAndLabel optionName="multipleSpaces"/></Col>
                  <Col sm={SM} md={MD}><CheckboxAndLabel optionName="leadingSpace"/></Col>
               </Row>
               <Row>
                  <Col sm={SM} md={MD}><CheckboxAndLabel optionName="trailingSpace"/></Col>
                  <Col sm={SM} md={MD}><CheckboxAndLabel optionName="capitalization"/></Col>
               </Row>

               <InputRow
                  optionName="lengthValidation"
                  type="tel"
                  maxlength="4"
                  name="quantity"
                  pattern="^[1-9][0-9]{0,2}$"
                  data-error="Recommended value: between 150 and 400 to minimize false positives. For a Latin language, try between 150 and 200, for Japanese or Chinese, maybe around 400."
               />
               <Row>
                  <Col sm={SM} md={MD}><CheckboxAndLabel optionName="sourceTargetIdentical"/></Col>
                  <Col sm={SM} md={MD}><CheckboxAndLabel optionName="repeatedWords"/></Col>
               </Row>
               <Row>
                  <Col sm={SM} md={MD}><CheckboxAndLabel optionName="validatePlaceholders"/></Col>
                  <Col sm={SM} md={MD}><CheckboxAndLabel optionName="wrongCapitalization"/></Col>
               </Row>
               <Row>
                  <Col sm={SM} md={MD}><CheckboxAndLabel optionName="localizeUrls"/></Col>
               </Row>
               <ColorInputRow optionName="lowSeverity"/>
               <ColorInputRow optionName="medSeverity"/>
               <ColorInputRow optionName="highSeverity"/>
               <ColorInputRow optionName="noSeverity"/>
               <ColorInputRow optionName="descHighlight"/>
               <Row>
                  <Col sm={SM} md={MD}><CheckboxAndLabel optionName="disableIceQa"/></Col>
               </Row>
            </Grid>
         </div>
      )
   }
}
