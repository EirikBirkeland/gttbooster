import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import codes from '../resources/PAYPAL_CODES'
import PaypalWidget from '../components/PaypalWidget'

import Item from '../components/Item'

export default function () {
    const priceSubscriptionMonthly = "€9.99"
    const priceTwelveMonthsMonthly = "€8.25"

    return (
        <div>
            <Grid>
                <Row>
                    <Col xs={12} md={12}>
                        <Item header="Monthly subscription"
                              footer={<PaypalWidget type="subscribe" code={codes.monthlySubscription}/>}>
                            <b>{priceSubscriptionMonthly}</b> per month<br/>
                        </Item>
                        <Item header="Twelve months package"
                              footer={<PaypalWidget type="subscribe" code={codes.twelveMonths}/>}>
                            <b>€99</b> for 12 months – effectively <b>{priceTwelveMonthsMonthly}</b> per month!<br/>
                        </Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12}>
                        <p>Please enter the
                            e-mail/Sesame address you use with GTT Booster above in your preferred plan and click <code>Subscribe</code>.
                            Within minutes after purchase, you will receive a confirmation e-mail, and you
                            will then be
                            able to
                            use GTT Booster.</p>
                    </Col>
                </Row>
            </Grid>
        </div>
    )
}
