"use strict";

if (typeof window === 'undefined')
   var _ = require('underscore');


// ES6:
const QaTesting = (function () {
   let output = [];
   const isSingleNode = (node) => !!(!node.hasOwnProperty(length) && node.nodeType === 1);

   class QaTesting {
      constructor(englishArray, norwegianArray) {
         this.eng = isSingleNode(englishArray) ? [englishArray] : englishArray;
         this.nor = isSingleNode(norwegianArray) ? [norwegianArray] : norwegianArray;
      }

      // lots of privileged test methods
      numberTest(str) {
         let $1;
         if ($1 = str.match(/([0-9])/)) {
            output.push("Found number " + $1[0])
         }
      }

      dupWords(str) {
         let $1;
         if ($1 = str.match(/([a-z]+) \1/)) {
            output.push("Dup word found " + $1[0])
         }
      }

      retrieveResults() {
         _.delay(function () {
            output = []
         }, 0);
         return output;
      }

      fetchResults() {
         return output;
      }
   }
   return QaTesting;
})();

// revealing module pattern
const QaTesting2 = (function () {
   let output = [];
  const isSingleNode = (node) => !!(!node.hasOwnProperty(length) && node.nodeType === 1);

   let engl = [];
   let norw = [];

   function insertStrings(englishArray, norwegianArray){
      engl = isSingleNode(englishArray) ? [englishArray] : englishArray;
      norw = isSingleNode(norwegianArray) ? [norwegianArray] : norwegianArray;
   }

   function numberTest(str) {
      let $1;
      if ($1 = str.match(/([0-9])/)) {
         output.push("Found number " + $1[0])
      }
   }

   function dupWords(str) {
      let $1;
      if ($1 = str.match(/([a-z]+) \1/)) {
         output.push("Dup word found " + $1[0])
      }
   }

   function retrieveResults() {
      _.delay(function () {
         output = []
      }, 0);
      return output;
   }

   function returnEverything(str){
      output.push(str);
   }

   function fetchResults() {
      return output;
   }

   return {
      eng: engl,
      nor: norw,
      numberTest: numberTest,
      dupWords: dupWords,
      retrieveResults: retrieveResults,
      insertStrings: insertStrings
   };
})();

// INPUT
var engArr = ["test test", "number 5", "number 7"];
var norArr = ["test test", "nummer 5", "nummer 7"];

// Instantiating the class:
QaTesting2.insertStrings(engArr, norArr);

//let myTest = new QaTesting("I am hungry", "Jeg er sulten");

// Using the public services of the class:
QaTesting2.nor.forEach((sentence) => {
   QaTesting2.returnEverything(sentence);
});

let out = QaTesting2.fetchResults();
console.log(out);

/*
// TODO: add parameter for "run all" mode to choose whether to first run all tests on a single segment, or whether to run all segments through test by test.

// INPUT
var engArr = ["test test", "number 5", "number 7"];
var norArr = ["test test", "nummer 5", "nummer 7"];

// Instantiating the class:
let myTest = new QaTesting(engArr, norArr);
//let myTest = new QaTesting("I am hungry", "Jeg er sulten");

// Using the public services of the class:
myTest.nor.forEach((sentence) => {
   myTest.numberTest(sentence);
   myTest.dupWords(sentence);
});

// retrieve, thereby emptying array
//let out = myTest.retrieveResults();

// fetch result but keep data in object's array
let out = myTest.fetchResults();
console.log(out);
console.log(out);

// could even say, "store the results in a database if x,y,z"

// I could easily make multiple functions that contain different types of QA sessions with different pre- and post-processing, without having to contaminate the core.
*/