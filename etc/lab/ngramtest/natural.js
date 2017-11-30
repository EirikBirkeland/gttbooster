// Copyright © 2016 Eirik Birkeland. All rights reserved.
var generator = require('ngram-natural-language-generator')
 
generator({
    text: 'Colorless green ideas sleep furiously.',
    model: {
        maxLength: 100,
        minLength: 50
    }
}, function(err, sentence){
    console.log(sentence)
})
