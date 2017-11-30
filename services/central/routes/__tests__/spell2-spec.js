/*
 * auth-spec.js
 * Copyright (C) 2016 Eirik Birkeland
 */
'use strict'

const test = require('ava')

const serverAddress = require('../../config').server

const sa = require('superagent')
const server = serverAddress + '/spell2'
const validAccount = 'birketrans@gmail.com'

// All Google language codes:
// https://sites.google.com/site/tomihasa/google-language-codes
const data = [
    {language: 'Afrikaans', code: 'af', string: 'Ek fissh is albei honger cakke en moeg', expected: 'fissh cakke'},
    {language: 'Amharic', code: 'am', string: 'ይህ የአማርኛው ውክፔዲያ ጥር 18 ቀን 1996 ዓመተ ምሕረት', expected: 'የአማርኛው ውክፔዲያ'},
    {language: 'Arabic', code: 'ar', string: 'أنا جائع و عطشان', expected: null},
    {
        language: 'Basque',
        code: 'eu',
        string: 'Sustraiak, enbor bat edo gehiago, adarrak eta hostoak ditu.',
        expected: null
    },
    {language: 'Bengali', code: 'bn', string: 'উইকিপিডিয়া, মুক্ত বিশ্বকোষ থেকে', expected: 'উইকিপিডিয়া'},
    {
        language: 'Brazilian Portuguese',
        code: 'pt_BR',
        string: 'Estou fish com fome e cake cansado Ambos',
        expected: 'fish cake'
    },
    {language: 'Dutch', code: 'nl', string: 'Ik fissh ben hongerig cakke en moe Beide', expected: 'fissh cakke'},
    {
        language: 'Eastern Punjabi',
        code: 'pa',
        string: 'ਮੈਨੂੰ ਦੋਨੋ ਭੁੱਖੇ ਅਤੇ ਥੱਕੇ am',
        expected: 'ਥੱਕੇ ਦੋਨੋ ਭੁੱਖੇ ਮੈਨੂੰ'
    },
    {language: 'Farsi', code: 'fa', string: 'گرسنه و تشنه', expected: null},
    {language: 'French', code: 'fr', string: 'Jeee suiss faim et soifff deuz', expected: 'Jeee suiss soifff deuz'},
    {language: 'German', code: 'de', string: 'Ich bin sowohl hungrig und durstig', expected: null},
    {language: 'Gujarati', code: 'gu', string: 'ગુજરાતી સંસ્કૃત ભાષામાંથી', expected: 'ભાષામાંથી'},
    {language: 'Hebrew (modern)', code: 'he', string: 'אני גם רעב ועייף', expected: null},
    {language: 'Hindi', code: 'hi', string: 'मैं दोनों थक गया और भूख लगी है', expected: 'है'},
    {language: 'Italian', code: 'it', string: 'Sono fissh entrambi affamati cakke e stanchi', expected: 'fissh cakke'},
    {language: 'Kannada', code: 'kn', string: 'ನಾನು ಹಸಿದ ಬೇಸತ್ತು ಎರಡೂ ಇದ್ದೇನೆ', expected: 'ಹಸಿದ'},
    {
        language: 'Malayalam',
        code: 'ml',
        string: 'എനിക്കു വിശന്നു കൂര്മുള്ളുകളും ഇരുവരും ആകുന്നു',
        expected: 'വിശന്നു കൂര്മുള്ളുകളും'
    },
    {language: 'Marathi', code: 'mr', string: 'मी भुकेला आणि थकल्यासारखे दोन्ही आहे', expected: 'मी थकल्यासारखे'},
    {language: 'Norwegian', code: 'nb', string: 'Jag er både sultn og tørrst', expected: 'sultn tørrst'},
    {language: 'Polish', code: 'pl', string: 'Jestem zarówno głodni i zmęczeni', expected: null},
    {language: 'Russian', code: 'ru', string: 'Я так голоден и устал', expected: null},
    {language: 'Slovene', code: 'sl', string: 'Jaz fissh sem tako lačen cakke in utrujen', expected: 'fissh cakke'},
    {language: 'Spanish', code: 'es', string: 'Estoy fish hambriento y cake cansado Tanto', expected: 'fish cake'},
    {
        language: 'Tamil',
        code: 'ta',
        string: 'நான் பசி மற்றும் சோர்வாக இருவரும் இருக்கிறேன்',
        expected: 'சோர்வாக இருவரும் இருக்கிறேன்'
    },
    {language: 'Telugu', code: 'te', string: 'నేను ఆకలితో మరియు అలసటతో am రెండు', expected: 'అలసటతో'},
    {language: 'Turkic', code: 'tr', string: 'Ben aç ve susuz hem de duyuyorum', expected: null},
    {language: 'Zulu', code: 'zu', string: 'elambile futhi omile', expected: null},
]

const temp = [
    {
        language: 'Basque',
        code: 'eu',
        string: 'Sustraiak, enbor bat edo gehiago, adarrak eta hostoak ditu.',
        expected: null
    },
]
temp.forEach(function (ele) {

    test.cb(`Test for ${ele.language}`, t => {
        sa.post(server)

            .send({
                language: {override: '', gtt: ele.code, navigator: ele.code},
                text: ele.string.replace(/ /g, ', '),
                user: validAccount,
                chromeVersion: 123,
                extensionVersion: 456
            })

            .end((err, res) => {
                if (err) {
                    t.end(false)
                    return console.warn(err)
                }

                const expected = process(ele.expected)
                const resBodyText = process(res.body.text)

                if (resBodyText === expected) {
                    t.end(false)
                }
                else {
                    t.end(true)
                }
            })
    })

})

function process(val) {
    if (val !== null) {
        return val.split(' ').sort().join(' ').replace(/ /g, '*')
    } else return val
}