// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2016/01/15.
 */
'use strict'
const _ = require('lodash')
// Term analysis
export default function wordFreq(arr1) {
    const cth = window.cth
    arr1 = Array.from(arr1)

    const text = arr1.map(seg => {
        return seg.firstChild.innerHTML.replace(/<[^>]+>/g, '')
    }).join(' ')

    const obj = {}

    text.split(' ').forEach(word => {
        if (!obj[word]) obj[word] = 0
        obj[word]++
    })

    const arr2 = _.pairs(obj).sort((a, b) => b[1] - a[1])
    return arr2
}