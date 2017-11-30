// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 25.07.2016.
 */
'use strict'
const $ = require('jquery')
const _ = require('lodash')
// I could create objects for each DOM element, which contain metadata as well as the DOM reference.

// For example: "scope of the API", string length limits, type of element (LI, P and similar), and then write tests that accept such extended objects!

const Segment = {
    init: function(segRef){
        this.dom = segRef
        this.scopeOfTheApi = $(segRef).closest('.goog-gtt-messageblock').text().match('scope of the api')
        this.id = segRef.id
        this.type = LI, SPAN, ETC
    }
}