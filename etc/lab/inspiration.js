// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2016/01/04.
 */
(function (cth, win) {
    'use strict'

// http://davidarvelo.com/blog/array-number-range-sequences-in-javascript-es6/
// convert nodelist to array
    var classes = Array.from(nodes).map(element => element.className)


    const uniqueId = (() => {
        let count = 0
        return function () {
            return ++count
        }
    })()

    function* idMaker() {
        var count = 0
        while (true)
            yield count++
    }
    var myIdMaker = idMaker()
    myIdMaker.next()

    // Chie: trying to access nonexistent properties will always traverse the full prototype chain.
})(window.cth, window)