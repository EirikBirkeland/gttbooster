// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 20.03.2017.
 */
import React, { Component } from 'react'

import qaSheetFetch from './Spreadsheet/fetchQaSheet'
import CleverInput from '../../components/CleverInput.js'
import Checkbox from '../../components/CheckboxAndLabel.js'
import addCustomValidation from './Spreadsheet/validator'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Alert from 'react-bootstrap/lib/Alert'
import 'cth-prototype'

import _ from 'lodash'

export default class Spreadsheet extends Component {
   constructor (props) {
      super(props)

      this.state = {
         "bsStyle": 'success',
         "visible": 'none',
         "content": { "__html": '' }
      }
   }

   componentDidMount () {
      qaSheetFetch((sheetNames) => {
         const html = sheetNames.sort().map((ele) => `<li><code>${ele}</code></li>`).join('')

         this.setState({
            "bsStyle": 'success',
            "visible": true,
            "content": {
               "__html": `For your reference, these sheet names were found in the provided URL:
                        <ul>${html}</ul>
                        <br/>
                        Please enter one above.`.clean()
            }
         })

         addCustomValidation('.cth-spreadsheet-form', sheetNames)
         this.forceUpdate()
      })
   }

   render () {
      return (
         <div className="cth-content-container col-md-8 col-lg-12 col-sm-12">
            <Grid>
               <Row>
                  <Col md={8} lg={12}>
                     <CleverInput
                        className="cth-spreadsheet-form"
                        optionName="spreadsheetURL"
                        data-equals="(?:\/|^)[\w\d_-]{44,}(?:\/|$)"
                        fn={_.debounce(qaSheetFetch, 500)}
                     />
                  </Col>
               </Row>
               <Row>
                  <Col md={8} lg={12}>
                     <CleverInput
                        className="cth-spreadsheet-form"
                        optionName="sheetName"
                        data-inlist="true"
                     />
                  </Col>
               </Row>
               <Row>
                  <Col md={8} lg={12}>
                     <Alert
                        bsStyle={this.state.bsStyle}
                        style={{ "display": this.state.visible }}
                     >
                        <div dangerouslySetInnerHTML={this.state.content}/>
                     </Alert>
                  </Col>
               </Row>
               <Row>
                  <Col md={8} lg={12}>
                     <Checkbox optionName="displaySpreadsheetNotifications"/>
                  </Col>
               </Row>
            </Grid>
         </div>
      )
   }
}
