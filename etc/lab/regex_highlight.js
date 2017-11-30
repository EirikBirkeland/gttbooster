// Copyright © 2016 Eirik Birkeland. All rights reserved.
//the point is to capture "a" in a specific context, then retrieve its index in the str.
// 1. Retrieve index with look-forward
function highlightWithRegex(str, reOriginal, reForLength) {
    var re1Length = str.match(reForLength)[1].length
    var $1Length = str.match(reOriginal)[1].length
    var startIndex = reOriginal.exec(str).index
    var thePosition = startIndex + re1Length
    var arr = splitValue(str, thePosition - $1Length, $1Length)
    arr[1] = arr[1].replace(/(.*)/, '<span class=\'red\'>$1</span>')
    return arr.join('')
    function splitValue(str, index, length) {
        return [str.substring(0, index), str.substring(index, index + length), str.substring(index + $1Length)]
    }
}

var str = 'Vi liker epler, pærer, og bananer i fleng'
var re1 = /[a-zæøå]+, [a-zæøå]+(,)(?= og [a-zæøå]+)/i
var reForLength = /([a-zæøå]+, [a-zæøå]+,(?= og [a-zæøå]+))/i
console.log(highlightWithRegex(str, re1, reForLength))

var str = 'Kaniner, eggedosis, epler og fisker'
var re1 = /Kaniner, eggedosis, (epler)(?= og fisker)/i
var reForLength = /(Kaniner, eggedosis, epler(?= og fisker))/i

console.log(highlightWithRegex(str, re1, reForLength))



//////////////////

function _highlightWithRegex(str, reOriginal, reForLength) {
    let re1Length = str.match(reForLength)[1].length
    let $1Length = str.match(reOriginal)[1].length
    let startIndex = reOriginal.exec(str).index
    let thePosition = startIndex + re1Length
    let arr = splitValue(str, thePosition - $1Length, $1Length)
    arr[1] = arr[1].replace(/(.*)/, '<span style=\'background-color: lightpink\'>$1</span>')
    return arr.join('')
    function splitValue(str, index, length) {
        return [str.substring(0, index), str.substring(index, index + length), str.substring(index + $1Length)]
    }
}