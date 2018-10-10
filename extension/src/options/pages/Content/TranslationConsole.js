// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 29.11.2017.
 */
import React, {Component} from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Checkbox from '../../components/CheckboxAndLabel.js'
import Select from '../../components/Select.js'
import {store} from '../../options-index'

const debug = require('cth-debug')(__filename)

export default class TranslationConsole extends Component {
   constructor (props) {
      super(props)
      this.state = {
         model: store,
      }
   }

   render () {
      const SM = this.props.sm || 6
      const MD = this.props.md || 4

      return (
         <div className="cth-content-container col-md-8 col-sm-12">
            <Grid>
               <Row>
                  <Col sm={SM} md={MD}>
                     <Checkbox optionName="tcSearchType"/>
                  </Col>
                  <Col sm={SM} md={MD}>
                     <Select optionName="tcSearchType"/>
                  </Col>
               </Row>
            </Grid>
         </div>
      )
   }
}