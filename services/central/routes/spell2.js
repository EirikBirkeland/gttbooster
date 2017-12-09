'use strict'
const express = require('express')
const router = module.exports = express.Router()
const User = require('../model/User.js')
const Aspell = require('../../../lib/aspellLangCodes')
const runSpellcheck = require('../lib/spellcheck')
const getFinalSpellcheckLanguage = require('./spell2/getFinalSpellcheckLanguage')
const stripPunctuation = require('./spell2/stripPunctuation')
const getIp = require('../model/getIp')

// TODO: Replace aspell with hunspell. The main work will be to create a language code conversion table (perhaps using a tool to convert it?)
// e.g.: echo "a b c" | hunspell -d gu_IN

router.post('/spell2', (req, res) => {
    const {user, text, language} = req.body
    const dataAmount = text.length
    const ip = getIp(req)

    User.storeCall('spell', {
        username: user,
        'data-amount': dataAmount,
        ip: ip
    })

    res.setHeader('Content-Type', 'application/json')

    if (text.length === 0) {
        console.log('Empty text content')
        return res.status(204).send('Empty text content')
    } else if (!language) {
        return res.status(400).send('Language code missing from req!')
    } else {

        console.log(language)

        const finalSpellcheckLanguage = getFinalSpellcheckLanguage(language)

        if (!finalSpellcheckLanguage) {
            console.log('Sending 400...', finalSpellcheckLanguage)
            try {
                console.log('req.body.language: ' + JSON.stringify(req.body.language))
            } catch (e) {
                console.log(e)
                console.log("Could not parse req.body.language. It was ", req.body.language)
            }
            return res.status(400).send('Invalid language code')
        }

        console.log('req.body.language ', JSON.stringify(req.body.language))

        const cleanedText = stripPunctuation(text)

        console.log('original text: ' + text)
        console.log('cleaned text: ' + cleanedText)

        runSpellcheck(cleanedText, finalSpellcheckLanguage, (spellres) => {
            // log('Sending plain text result ...')
            res.status(200).send({text: spellres})

            console.log('about to send these results: ' + spellres)

        })

    }

})