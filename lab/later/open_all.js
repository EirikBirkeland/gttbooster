// Copyright © 2016 Eirik Birkeland. All rights reserved.
﻿// TODO: Add this as a button in the inbox :)

function processLoop(input, i, delay) {
    setTimeout(function () {
        process(input)
    }, delay * i)
}

function process(input) {
    var documentId
    documentId = input
    logger.log('documentId')
    documentId = documentId.replace(/[0-9a-z]+:(.*)/, '$1')
    var url = 'https://translate.google.com/toolkit/workbench?did=' + documentId + '&hl=en'
    window.open(url)
}

//$(document).ready({
var documents = document.getElementsByClassName('gtc-list-row-select')
var delay
if (documents.length >= 15) {
    delay = 30000
} else if (documents.length >= 10 && documents.length < 15) {
    delay = 5000
} else if (documents.length < 10) {
    delay = 3000
} else {
    logger.log('Number out of range.')
}

for (var i = 0; i < documents.length; i++) {
    processLoop(documents[i].id, i, delay)
    logger.log(i)
}
//});