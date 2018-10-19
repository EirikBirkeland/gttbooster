// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 20.03.2017.
 */
import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { store } from '../../options-index';

import CheckboxAndLabel from '../../components/CheckboxAndLabel.js';
import InputRow from '../../components/row-components/InputRow';

export default class Autocomplete extends Component {
   handleClick = (e) => {
      this.forceUpdate();
   }

   constructor (props) {
      super(props);
      this.state = {
         "autocompleteTmThreshold": store.settings.autocompleteTmThreshold,
         "autocompleteMinLength": store.settings.autocompleteMinLength
      };
   }

   render () {
      const SM = this.props.sm || 6;
      const MD = this.props.md || 4;

      return (
         <div className="cth-content-container col-md-8 col-sm-12">
            <Grid ref="local">
               <Row>
                  <Col sm={SM} md={MD}>
                     <CheckboxAndLabel optionName="autocompleteOnByDefault"/>
                  </Col>
                  <Col sm={SM} md={MD}>
                     <CheckboxAndLabel optionName="autocompleteIncludeTm"/>
                  </Col>
               </Row>

               <Row>
                  <Col sm={SM} md={MD}>
                     <CheckboxAndLabel optionName="autocompleteIncludeMt"/>
                  </Col>
                  <Col sm={SM} md={MD}>
                     <CheckboxAndLabel optionName="autocompletePreserveCase"/>
                  </Col>
               </Row>

               <Row>
                  <Col sm={SM} md={MD}>
                     <CheckboxAndLabel optionName="autocompleteCleanUpMt"/>
                  </Col>
               </Row>

               <InputRow
                  optionName="autocompleteTmThreshold"
                  type="tel"
                  maxlength="3"
                  pattern="\d*"
                  data-error="Value must be between 0 and 100"
                  data-equals="^[0-9][0-9]?$|^100$"
                  unit="123"
               />

               <InputRow
                  optionName="autocompleteMinLength"
                  type="tel"
                  maxlength="2"
                  pattern="\d*"
                  data-error="Value must be between 1 and 10"
                  data-equals="^[0-9]?$|^10$"
                  unit="123"
               />
            </Grid>
         </div>
      );
   }
}
