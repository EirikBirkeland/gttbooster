/* eslint-disable */

import React from 'react'

export default function SecuredByPaypal() {
    return (
        <a href="https://www.paypal.com/webapps/mpp/paypal-popup" title="How PayPal Works"
           onClick="javascript:window.open('https://www.paypal.com/webapps/mpp/paypal-popup','WIPaypal','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700'); return false;"><img
            src="https://www.paypalobjects.com/digitalassets/c/website/marketing/na/us/logo-center/9_bdg_secured_by_pp_2line.png"
            border="0" alt="Secured by PayPal"/>
        </a>
    )
}