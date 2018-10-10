// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 18.03.2017.
 */
import React, {Component} from 'react'
// TODO: Change back from my fork to react-confirm-bootstrap in December if the author has decided to merge.
import Confirm from 'react-confirm-bootstrap'
import Button from 'react-bootstrap/lib/Button'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import $ from 'jquery'
import _ from 'lodash'
import {store} from '../options-index'


export default class Header extends Component {
   constructor (props) {
      super(props)
      this.state = {
         "model": store,
         "settings": store.settings,
         "defaults": store.all
      }
   }

   componentDidMount () {
      function reload () {
         location.reload()
      }

      function rebind () {
         $(window).bind('hashchange', reload)
      }

      const debouncedBind = _.debounce(rebind, 500, {
         "leading": false,
         "trailing": true
      })

      function alterHashWithoutReload (cb) {
         $(window).unbind('hashchange', reload)
         cb()
         debouncedBind()
      }

      const $navTabs = $('.nav-pills a')

      // EnableBootstrapNavTabs
      $navTabs.click(() => {
         alterHashWithoutReload(function () {
            $(this).tab('show')
         })
      })

      // Change hash for page-reload
      $navTabs.on('shown.bs.tab', (e) => {
         window.location.hash = e.target.hash
      })

      // JavaScript to enable link to tab
      const loc = location.href.match(/(#.*)$/)
      if (loc && loc.length && loc[1].match(/#menu[0-9]/)) {
         $('.nav-pills').find(`a[href='${loc[1]}']`).tab('show')
      }

      $(window).bind('hashchange', reload)
   }

   render () {
      return (
         <div className={this.props.className} style={this.props.headerStyle}>
            <h2>Settings & Preferences</h2>

            <Confirm
               onConfirm={() => this.props.resetToDefaults(this.state.settings, this.state.defaults)}
               body="Are you sure you wish to reset ALL settings to default?"
               confirmText="Confirm Delete"
               title="Delete all user settings"
            >
               <Button bsSize="small">
                  Reset defaults
               </Button>
            </Confirm>

            <span id="message"/>

            <br/><br/>

            <Nav bsStyle="pills" activeKey={1}>
               <NavItem data-toggle="tab" eventKey={1} href="#menu1">New stuff</NavItem>
               <NavItem data-toggle="tab" eventKey={2} href="#menu2">QA Checks 1</NavItem>
               <NavItem data-toggle="tab" eventKey={3} href="#menu3">QA Checks 2</NavItem>
               <NavItem data-toggle="tab" eventKey={4} href="#menu4">Features</NavItem>
               <NavItem data-toggle="tab" eventKey={5} href="#menu5">Spellcheck</NavItem>
               <NavItem data-toggle="tab" eventKey={6} href="#menu6">Autocomplete</NavItem>
               <NavItem data-toggle="tab" eventKey={7} href="#menu7">Spreadsheet</NavItem>
            </Nav>
         </div>
      )
   }
}
