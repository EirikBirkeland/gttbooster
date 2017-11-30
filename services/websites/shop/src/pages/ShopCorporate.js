import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

import MailUs from '../components/MailUs'

export default function () {

    return (
        <div>
            <Grid>
                <Row>
                    <Col md={12} xs={12}>
                        <div>
                            <h3>Please
                                <MailUs> email our sales staff at gttbooster@gmail.com</MailUs> to quickly and discretely negotiate a flexible
                                arrangement suited to your requirements and preferences.
                            </h3>

                            <h4>Discounts</h4>
                            <ul>
                                <li>5% and 10% discounts are available if purchasing 6 and 12 months of access
                                    up
                                    front, respectively.
                                </li>
                                <li>Minor volume discounts for higher quantities available</li>
                            </ul>

                            <h4>Promises</h4>
                            <ul>
                                <li>
                                    Promise I: All provided data are kept strictly confidential, including
                                    affiliation of individual translators
                                    to GTT e-mail accounts. We only keep the buyer's name associated with the specified accounts for internal purposes.
                                </li>
                                <li>
                                    Promise II: You are guaranteed access for 100% of your purchased time. Any downtime
                                    which may occur, will quickly be compensated by adding time to your account or a partial 
                                </li>
                                <li>
                                    Promise III: <em>Cash-back guarantee</em> for 14 calendar days!
                                </li>
                            </ul>
                            <h3>
                                Please do not hesitate to get in touch for any reason.
                            </h3>
                        </div>
                    </Col>
                </Row>
            </Grid>
        </div>
    )
}
