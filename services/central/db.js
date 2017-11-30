const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//mongoose.set('debug', true)

function loadDb(cb) {
    if (typeof window === 'undefined') {
        mongoose.connect('mongodb://localhost/gttbooster')
    }

    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.on('connected', console.log.bind(console, 'Mongoose connected to database.'))
    //  db.on('disconnected', console.log.bind(console, 'Mongoose default connection disconnected'))
    db.once('open', cb.bind(this, db))
}

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination')
        process.exit(0)
    })
})

const db = mongoose

module.exports = {loadDb, db}