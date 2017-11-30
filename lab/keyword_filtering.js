// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2016/03/13.
 */

// TODO: Create filter view according to provided keyword
// 1. How to display the results?
//    - alter existing dom .. hide all stuff not relevant at the moment
//    - create a new popup window or similar, preferably editable (possible? probably not)
//    -

// Works well to hide unmatched segments for documents with messageblocks / descriptions.
// + standard docs .. but doesn't care about BRs and such.
// TODO: Add a separate button to hide all elements which aren't segment data.

function hideAllButMatching(searchText, sourceArr, targetArr) {
    _.forEach(sourceArr, (ele, i) => {
        if (!ele.innerHTML.match(searchText)) {
            if (!$(cth.dom.targetDoc).find('.goog-gtt-messageblock').length == 0) {
                $(sourceArr[i]).closest('.goog-gtt-messageblock').hide()
                $(targetArr[i]).closest('.goog-gtt-messageblock').hide()
            } else {
                $(sourceArr[i]).hide()
                $(targetArr[i]).hide()
            }
        }
    })
}

// This can also be used in segmenttype-filtering.js probably.
function hideAllExceptUnits(className) {
    $(cth.dom.targetDoc).find('*').hide()

// show all direct parents of units:
    $(cth.dom.targetDoc).find('.' + className).parents().show()

// show all units
    $(cth.dom.targetDoc).find('.' + className).show()

// show all children of units:
    $(cth.dom.targetDoc).find('.' + className).find('*').show()
}

// NICE:
$('#the_id').siblings().hide()
$('#the_id').parents().siblings().hide()


function hideFormatting(sourceArr, targetArr) {

}

// It seems like when I clone a div, I can still alter the contents and have it saved! However, it may be that the segments need to remain in the <body> ..

function dumpSegmentsIntoDiv(segArray, docBody) {
    const newDiv = document.createElement('div')
    _.forEach(segArray, ele => {
        newDiv.appendChild(ele.cloneNode(true))
    })
    logger.log(newDiv)
    cth.dom.targetDoc.getElementsByTagName('body')[0].appendChild(newDiv)
}