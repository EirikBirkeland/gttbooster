import React from 'react'
import {Link} from 'react-router-dom'

export default class Message extends React.Component {
    render() {
        return (
            <div>
                <h2>Dear trial users,</h2>

                <p>GTT Booster is now moving from open testing to sales. We thank you for testing the product, and we
                    hope that you did not experience many issues and that the product has been useful to you.</p>

                <p>We will continue developing and tweaking this product to further improve the GTT experience, and your
                    support will help us allocate resources towards its continued development.</p>

                <p>Next time you start GTT Booster, you will get a 7 day official trial. When this trial expires, you
                    will be redirected to the store page upon launching GTT Booster, where you can make a purchase.</p>

                <p>For simplicity, you can head on over to the store now and make an early purchase. Purchased time will
                    be added to your trial time!</p>

                <h3>How to buy</h3>
                <Link to="/home">Click here to purchase.</Link>

                <h3>Why isn't it free?</h3>
                We would like to continue development organically, in communication with our users. Your money will go towards the further development of GTT Booster.
                <h3>Why isn't there an option to purchase the product?</h3>
                We want to continue development, and a monthly scheme will ensure we stay vigilant and dedicated.

                <h3>How to install</h3>
                <p>The GTT Booster URL will remain the same, and your existing extension will be updated automatically.
                    For your information, here is the download URL:</p>
                <a href="https://chrome.google.com/webstore/detail/gtt-booster/pjankaakojbendjaejlcnpgeldmfpjed">https://chrome.google.com/webstore/detail/gtt-booster/pjankaakojbendjaejlcnpgeldmfpjed</a>

                <h3>Support</h3>
                <p>We answer inquiries within 24 hours (excluding weekends). Please direct all inquiries to
                    gttbooster@gmail.com.</p>

                <h3>In development</h3>
                <p>A flexible feature voting screen will be added to the interface. You will be able to flexibly enter
                    your vote for the next feature or tweak you wish to see added. But naturally, you can still contact
                    us by e-mail separately if we can help you in any way.</p>

                <p>This voting feature will help set and change priorities flexibly as the product develops in line with
                    the requirements of our users.</p>

                <h3>Recent changes</h3>
                <ul>
                    <li>Font-resizing now persists between sessions</li>
                    <li>TM highlighting is now more accurate (placeholder-related)</li>
                    <li>You may now use ALT+1, ALT+2 and similar hotkeys to insert the first and second TM matches in
                        the Automatic Translation Search.
                    </li>
                    <li>Built-in QA tests have been improved</li>
                    <li>Tweaks made to Autocomplete in accordance with feedback*</li>
                </ul>

                * Note: However, RTL languages are currently not guaranteed to work for Autocomplete, but we welcome
                your feedback and suggestions.

                Best regards,
                GTT Booster team
                Birkeland Translation`
            </div>
        )
    }
}