// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 20.03.2017.
 */
import React, {Component} from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import InputRow from '../../components/row-components/InputRow'
import {store} from '../../options-index'

export default class QaChecksContent2 extends Component {
   constructor (props) {
      super(props)
      this.state = {"model": props.model || store}
   }

   render () {
      const SM = this.props.sm || 6
      const MD = this.props.md || 4

      return (
         <div className="cth-content-container col-md-8 col-sm-12">
            <Grid ref="local">
               <InputRow optionName="extraSpacesBefore"/>
               <InputRow optionName="forbiddenCharacters"/>
               <InputRow optionName="endPunctuationRedundant"/>
               <InputRow optionName="endPunctuationMissing"/>
               <InputRow optionName="consecutivePunctuation"/>
            </Grid>
         </div>
      )
   }
}
