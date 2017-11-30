// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2016/02/27.
 */
'use strict'

Array.prototype.isAoA = function() {
    if (this[0] instanceof Array) return true
    else return false
}

Array.prototype.anyMatch = function(arr2) {
    for (let i = 0; i < this.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (this[i] == arr2[j]) return true
        }
    }
    return false
}

Array.prototype.unique = function() { // alternative: _.uniq
    return this.reduce(function(p, c) {
        if (p.indexOf(c) < 0) p.push(c)
        return p
    }, [])
}

Object.prototype.toArr = function (arr) { // _.pairs(object)
    for (let key of Object.keys(this)) {
        arr.push([key, String(this[key])])
    }
    return arr
}

var sArr = ['cat', 'dog', 'dog', 'dog', 'dog', 'fish', 'monkey', 'monkey', 'chair', 'stool']
var tArr = ['katt', 'hund', 'bikkje', 'sjefer', 'puddel', 'fish', 'ape', 'apekatt', 'stol', 'stol']

logger.log('Final output is :')
var result = findInconsistent(sArr, tArr)
for(let i=0;i<result.length;i++){
    logger.log('Indices ' + result[i] + ' are inconsistently translated')
}

result = findInconsistent(tArr, sArr)
for(let i=0;i<result.length;i++){
    logger.log('Indices ' + result[i] + ' are translated the same way, but source segments are different')
}

function findInconsistent(arr1, arr2) {
   // Find inconsistent translations in source/target or target/source
    var obj = generateObj(arr1, arr2)
    var outArr = []
    outArr = obj.toArr(outArr)
    outArr = mergeArraysWithCommonalities(outArr)
    outArr = outArr.isAoA() ? outArr.map(a => a.unique.sort()) : outArr.unique.sort()
    return outArr
}

function generateObj(arr1, arr2) {
    var obj = {}
    for (var i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr1.length; j++) {
         // not same item && strlen same && identical text content
            if ((i != j) && (arr1[i].length == arr1[j].length) && (arr1[i] == arr1[j])) {
                if (arr2[i] != arr2[j]) {
                    if (i <= j) {
                  // logger.log(`${arr2[i]} (index ${i}) is different from ${arr2[j]} (index ${j})`);
                        obj[i] = j
                    }
                }
            }
        }
    }
    return obj
}

function mergeArraysWithCommonalities(AoA) { // IN ["12", "21", "34"] OUT ["1221", "34"]
    if (!AoA.isAoA()) throw (AoA + ' is not an array!')
    for (let i = 0; i < AoA.length; i++) {
        for (let j = 0; j < AoA.length; j++) {
            if (i != j && AoA[i].anyMatch(AoA[j])) {
                AoA[i] = AoA[i].concat(AoA[j])
                AoA.splice(j, 1)
            }
        }
    }
    return AoA
}