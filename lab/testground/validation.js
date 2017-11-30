// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 10.07.2016.
 */


// This should be a bit like a 'handy unit test' for the state of the DOM.

const validation = (function () {

    var obj = {}

    obj.run = () => {
        const cth = window.cth
        if (!cth.dom.sourceSegments)
            console.warn('dom.sourceSegments is falsy!')
        if (!cth.dom.targetSegments)
            console.warn('dom.targetSegments is falsy!')
    }

    return obj
})()

export default validation