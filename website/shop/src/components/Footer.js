import React from 'react'
import {Jumbotron, Image, Grid, Row, Col} from 'react-bootstrap'
import Tagline from './Tagline'

export default function Footer() {
    return (
        <div>
            <Jumbotron>
                <Grid>
                    <Row>
                        <Col xs={2} md={2}><Image responsive src="./SSL_png-100018-380x380.png"/></Col>
                        <Col xs={10} md={10}><Tagline/></Col>
                    </Row>
                </Grid>
            </Jumbotron>
        </div>
    )
}