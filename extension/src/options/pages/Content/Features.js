import CheckboxAndLabel from '../../components/CheckboxAndLabel.js';
import React, {Component} from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import InputRow from '../../components/row-components/InputRow';

export default class Features extends Component {
   constructor (props) {
      super(props);
      this.state = {};
   }

   render () {
      const SM = this.props.sm || 6;
      const MD = this.props.md || 4;

      return (
         <div ref="local" className="cth-content-container col-md-8 col-sm-12">
            <Grid>
               <Row>
                  <Col sm={SM} md={MD}>

                  </Col>
                  <Col sm={SM} md={MD}>

                  </Col>
               </Row>

               <Row>
                  <Col sm={SM} md={MD}>
                     <CheckboxAndLabel optionName="highlightTextItems"/>
                  </Col>
                  <Col sm={SM} md={MD}>
                     <CheckboxAndLabel optionName="addShortcutCtrlB"/>
                  </Col>
               </Row>
               <Row>
                  <Col sm={SM} md={MD}>
                     <CheckboxAndLabel optionName="addNewDocname"/>
                  </Col>
                  <Col sm={SM} md={MD}>
                     <CheckboxAndLabel optionName="newHighlightingStyle"/>
                  </Col>
               </Row>
               <Row>
                  <Col sm={SM} md={MD}>
                     <CheckboxAndLabel optionName="replaceTitle"/>
                  </Col>
                  <Col sm={SM} md={MD}>
                     <CheckboxAndLabel optionName="removeDuplicates"/>
                  </Col>
               </Row>
               <Row>
                  <Col sm={SM} md={MD}>
                     <CheckboxAndLabel optionName="timerEnable"/>
                  </Col>
                  <Col sm={SM} md={MD}>
                     <CheckboxAndLabel optionName="removeMt"/>
                  </Col>
               </Row>
               <Row>
                  <Col sm={SM} md={MD}>
                     <CheckboxAndLabel optionName="normalizeDiacritics"/>
                  </Col>
                  <Col sm={SM} md={MD}/>
               </Row>
               <InputRow
                  optionName="newGlossaryExpirationTime"
                  type="tel"
                  maxlength="4"
                  name="quantity"
                  unit="# days"
                  pattern="^[1-9][0-9]{0,2}$"
                  data-error="Please specify # number of days"
               />
            </Grid>
         </div>
      );
   }
}
