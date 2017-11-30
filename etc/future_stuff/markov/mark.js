var array = ['dog', 'fish', 'cat'];
var stats = require('word-stats').calculate(array);

var markov = require('markov-words');
var result = markov(stats, 8)
console.log(result);
