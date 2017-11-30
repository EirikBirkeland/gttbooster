const loadDb = require('../services/central/db').loadDb
loadDb(() => {
})

const moment = require('moment')

const DailyStats = require('../services/central/model/DailyStats')

if (process.argv[2] === 'usersToday') usersToday()

function usersToday() {
    DailyStats.findById(moment().format('DD/MM/YYYY'), (err, res) => {
        console.log('Report for ' + process.argv[3])
        console.log(res.unique.length + ' unique users today')
    })
}