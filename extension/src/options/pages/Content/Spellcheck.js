// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 20.03.2017.
 */
import React, {Component} from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import showData from './Spellcheck/showData'
import Checkbox from '../../components/CheckboxAndLabel.js'
import Select from '../../components/Select.js'
import { store } from '../../options-index'

const debug = require('cth-debug')(__filename)

export default class Spellcheck extends Component {
   constructor (props) {
      super(props)
      this.state = {
         model: store
      }
      this.handleEvent = this.handleEvent.bind(this)
   }

   handleEvent (e) {
      debug.warn(e.type)

      this.state.model.settings.spellcheckStoreSelector[1] = e.target.value
      this.forceUpdate()
      showData(e.target.value)
   }

   componentDidMount () {
      showData(this.state.model.settings.spellcheckStoreSelector[1])
      this.forceUpdate()
   }

   render () {
      const SM = this.props.sm || 6
      const MD = this.props.md || 4

      return (
         <div className="cth-content-container col-md-8 col-sm-12">
            <Grid ref="local">
               <Row>
                  <Col sm={SM} md={MD}>
                     <Checkbox optionName="spellcheckEnabled"/>
                  </Col>
               </Row>
               <Row>
                  <Col sm={SM} md={MD}>
                     <Checkbox optionName="spellcheckOverride"/>
                  </Col>
                  <Col sm={SM} md={MD}>
                     <Select optionName="spellcheckOverride"/>
                  </Col>
               </Row>
               <hr/>
               <Row>
                  <Col sm={SM} md={MD}>
                     Select language to show exceptions for:
                  </Col>
                  <Col sm={SM} md={MD}>
                     <Select fn={showData} optionName="spellcheckStoreSelector"/>
                  </Col>
               </Row>
            </Grid>

            <br/>

            <span id="message" style={{"display": 'none'}}>
           No stored data available for the selected language code. Add some exceptions within GTT or add a file.
           </span>

            <table id="glossTable" className="table table-bordered table-condensed display"/>

            <button id="cth-delete-button" style={{"display": 'none'}} disabled>
               Delete selected exceptions
            </button>
            <button id="cth-delete-all-button">
               Delete ALL exceptions
            </button>

            <hr/>

            <Grid>
               <Row>
                  <Col sm={SM} md={MD}>Upload additional spellcheck lists:</Col>
                  <input
                     title="Files with tab, space and newline separated items supported. Also supports MS Word .dic."
                     className="col-sm-4"
                     type="file"
                     accept=".txt,.dic,text/plain"
                     id="files"
                     name="files[]"
                     onChange={this::uploadFile}
                     multiple
                  />
               </Row>
            </Grid>

            <ul>{window.fileNames}</ul>
         </div>
      )
   }
}
