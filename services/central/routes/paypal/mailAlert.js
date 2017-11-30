const nodemailer = require('nodemailer')

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gttbooster@gmail.com',
        pass: 'Fantasy123'
    }
})

/**
 *
 * @param opts {Object}
 * @param opts.to {String}
 * @param opts.subject {String}
 * @param opts.text {String}
 * @param opts.html {String}
 *
 */
function mailAlert(opts) {
    const {subject, body, to} = opts

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"GTT Booster" <foo@blurdybloop.com>', // sender address
        to: to, // list of receivers
        subject: subject || 'Hello ✔', // Subject line
        text: body, // plain text body
        html: body.replace(/\r?\n/g, '<br/>') // html body
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        }
        console.log('Message %s sent: %s', info.messageId, info.response)
    })

}

module.exports = mailAlert
