'use strict'
const express = require('express')
const router = module.exports = express.Router()
const Aspell = require('@eirikbirkeland/ob-aspell-lang-codes')
const runSpellcheck = require('../lib/spellcheck')
const getFinalSpellcheckLanguage = require('./spellcheck/getFinalSpellcheckLanguage')
const stripPunctuation = require('./spellcheck/stripPunctuation')
const getIp = require('../helpers/getIp')

// TODO: Replace aspell with hunspell. The main work will be to create a language code conversion table (perhaps using a tool to convert it?)
// e.g.: echo "a b c" | hunspell -d gu_IN

router.post('/spellcheck', (req, res) => {
    const {user, text, language} = req.body
    const dataAmount = text.length
    const ip = getIp(req)

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
