module.exports = function emailBody(paymentObject) {
    return `
Dear ${paymentObject.first_name} ${paymentObject.last_name},

Your subscription has now been activated for the GTT account you specified:
${paymentObject.option_selection1}

Please download GTT Booster below:
<a href="https://chrome.google.com/webstore/detail/gtt-booster/pjankaakojbendjaejlcnpgeldmfpjed">
    https://chrome.google.com/webstore/detail/gtt-booster/pjankaakojbendjaejlcnpgeldmfpjed
</a>
We hope that our product will help you work more effectively and enjoyably. Please do not hesitate to <a href="mailto:gttbooster@gmail.com?subject=Support">get in touch</a> for any reason.

Kind regards,
the GTT Booster team
`
}