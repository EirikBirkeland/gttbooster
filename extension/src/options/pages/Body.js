import _ from 'lodash';
import React, { Component } from 'react';

import Content from './Content.js';
import Header from './Header.js';

import { resetToDefaults, save } from '../../model/SettingsStorage';
import { store } from '../options-index';

const debug = require('cth-debug')(__filename);

class Body extends Component {
   handleSave = (e) => {
      /* Deferring so that the component's own onChange/onKeyup gets to first update */
      _.defer(this.state.settings.autoSave === true || e.target.id === 'autosaveCheckbox'
         ? save.bind(this, this.state.settings)
         : () => {
         });
   }

   constructor (props) {
      super(props);
      this.state = {
         "settings": store.settings,
         "all": store.all
      };
   }

   handleChange (e) { // Apparently, I do need both of these ...
      // TODO: https://stackoverflow.com/questions/34956479/how-do-i-setstate-for-nested-array
      this.state.settings.autoSave = e.target.checked;
   }

   render () {
      const headerStyle = {
         "position": 'absolute',
         "height": '170px',
         "overflow": 'hidden'
      };
      const tabContentStyle = {
         "position": 'absolute',
         "top": '170px',
         "bottom": '0px',
         "overflowY": 'auto',
         "overflowX": 'visible'
      };

      // Note: Make sure the entire doc is affected by bootstrap-wrapper (some bootstrap modules exist outside <Body/>
      // $('body').addClass('bootstrap-wrapper')

      return (
         <div>
            <Header
               className="header"
               style={headerStyle}
               resetToDefaults={resetToDefaults}
            />
            <Content
               className="container"
               style={tabContentStyle}
               handleSave={this.handleSave}
            />
         </div>
      );
   }
}

export default Body;
