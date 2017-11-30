import React, {Component} from "react"
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'

import {Nav, NavItem} from 'react-bootstrap'

import "./App.css"
import "bootstrap"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Header from './components/Header'
import Footer from './components/Footer'

import {
    License,
    Features,
    Download,
    Development,
    Support,
    TheTeam
} from './pages/pages'

const thing = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent) ?
    <Download/> : ""

class App extends Component {
    componentDidMount() {
        const link = document.createElement('link')
        link.rel = "chrome-webstore-item"
        link.href = "https://chrome.google.com/webstore/detail/itemID"
        document.head.appendChild(link)
    }

    render() {
        return (
            <Router>
                <div>
                    <Header>
                        {thing}
                    </Header>

                    <Nav bsStyle="pills">
                        <LinkContainer to="/features">
                            <NavItem eventKey={4}>Features</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/development">
                            <NavItem eventKey={5}>News & Dev</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/license">
                            <NavItem eventKey={7}>License</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/support">
                            <NavItem eventKey={2}>Support</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/theteam">
                            <NavItem eventKey={2}>The Team</NavItem>
                        </LinkContainer>
                    </Nav>

                    <hr/>

                    <div style={{marginLeft: '5%', marginRight: '5%', marginBottom: '3%'}}>
                        <Route exact path="/" component={License}/>
                        <Route path="/license" component={License}/>
                        <Route path="/features" component={Features}/>
                        <Route path="/development" component={Development}/>
                        <Route path="/support" component={Support}/>
                        <Route path="/theteam" component={TheTeam}/>
                    </div>

                    <Footer/>

                    <center>
                        <strong>Copyright © 2014–2017 Birkeland Translation. All rights reserved.</strong>
                    </center>
                </div>
            </Router>
        )
    }
}

export default App
