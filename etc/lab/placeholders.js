// Copyright © 2016 Eirik Birkeland. All rights reserved.
var rtlDetect = require('rtl-detect')

// TODO: Find out what constitute placeholders. Possibly all tags except for span tags that constitute spaces are 'placeholders'. Placeholder spans often have 'notranslate' as class name.
var document_language = 'ar'

var source = _.filter(cth.dom.sourceSegments[38].firstChild.childNodes, $_=> {
    return $_.nodeType == 1 && $_.tagName == 'A'
})
// Make array of target A elements for a segment:
var target = _.filter(cth.dom.targetSegments[38].firstChild.childNodes, $_=> {
    return $_.nodeType == 1 && $_.tagName == 'A'
})

function arrIsEqual(sourceNodelist, targetNodelist, options) {
    if (!sourceNodelist.length) sourceNodelist = [sourceNodelist]
    if (!targetNodelist.length) targetNodelist = [targetNodelist]

    if (document_language == /*|| rtlDetect.isRtlLang(document_language) */){
        // _.reverse mutates the input!
        _.reverse(targetNodelist)
    }

    if (options && options.shallow) {
        // Clone elements to avoid disrupting actual DOM
        sourceNodelist = _.map(sourceNodelist, z=>z.cloneNode(true))
        targetNodelist = _.map(targetNodelist, z=>z.cloneNode(true))

        // Check whether equivalent but allowing for any innerHTML:
        sourceNodelist.forEach(z=>z.innerHTML = '')
        targetNodelist.forEach(z=>z.innerHTML = '')
    }

    _.forEach(sourceNodelist, ($_, i)=> {
        if (!_.isEqual($_.outerHTML.split("").sort(), targetNodelist[i].outerHTML.split("").sort())) {
            logger.log(`Error in index ${i}`)
        }
    })
}


