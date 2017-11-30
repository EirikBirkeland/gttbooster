// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 20.03.2017.
 */
import React, {Component} from 'react'

import TranslationConsole from './Content/TranslationConsole'
import QaChecksContent from './Content/QaChecksContent.js'
import QaChecksContent2 from './Content/QaChecksContent2.js'
import Features from './Content/Features.js'
import Autocomplete from './Content/Autocomplete.js'
import Spreadsheet from './Content/Spreadsheet.js'
import Spellcheck from './Content/Spellcheck.js'

export default class Content extends Component {
   constructor (props) {
      super(props)
      this.handleSave = this.props.handleSave
   }

   render () {
      return (
         <div
            className={this.props.className}
            onBlur={this.handleSave}
            onKeyUp={this.handleSave}
            onChange={this.handleSave}
         >

            <div
               className="tab-content"
               style={this.props.style}
            >

               <div id="menu1" className="tab-pane fade in active">
                  <h3>TC lookups</h3>
                  <TranslationConsole/>
               </div>

               <div id="menu2" className="tab-pane fade">
                  <h3>QA Checks to include</h3>
                  <QaChecksContent/>
               </div>

               <div id="menu3" className="tab-pane fade">
                  <h3>QA Checks to include</h3>
                  <QaChecksContent2/>
               </div>

               <div id="menu4" className="tab-pane fade">
                  <h3>Features</h3>
                  <p>Turn on and off features.</p>
                  <Features/>
               </div>

               <div id="menu5" className="tab-pane fade">
                  <h3>Spellcheck</h3>
                  <Spellcheck/>
               </div>

               <div id="menu6" className="tab-pane fade">
                  <h3>Autocomplete</h3>
                  <Autocomplete/>
               </div>

               <div id="menu7" className="tab-pane fade">
                  <h3>Spreadsheet</h3>
                  <Spreadsheet/>
               </div>
            </div>
         </div>
      )
   }
}
