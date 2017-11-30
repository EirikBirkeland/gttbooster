const exec = require('child_process').exec
const mailAlert = require('../services/central/routes/paypal/mailAlert')

function execute(command, callback) {
    exec(command, function (error, stdout, stderr) {
        callback(stdout);
    })
}

function sendMailAlert () {
    mailAlert({
        subject: "auth3 not working at https://api.gtt-booster.com/auth3",
        body: "read the subject",
        to: "birketrans@gmail.com"
    })
}
execute("curl https://api.gtt-booster.com/auth3", function (res) {
    if (res.match("Cannot GET /auth3")) {
        console.log("All good")
        sendMailAlert()
    } else {
        console.warn("OH NO")
        sendMailAlert()
    }
})
