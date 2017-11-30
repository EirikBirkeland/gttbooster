// Copyright © 2016 Eirik Birkeland. All rights reserved.
var a = require('word-ngrams') 

var ngram = a.buildNGrams('Hello, World!  How’s the world weather today? Hello, World!', 2, {caseSensitive: true, includePunctuation: true})

console.log(a.listNGramsByCount(ngram))
