// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 30.07.2016.
 */
/*
 * Import $ from 'jquery'
 * import _ from 'lodash'
 */
import test from 'ava'
import {runChecksCollection} from './index'

const debug = require('cth-debug')(__filename)

/*
 * TODO: Add timeout if test takes too long to run ... just as an experiment.
 * TODO: I need to test some faulty patterns and see if catastrophic backtracking results.
 */

// TODO: read all of this and use interesting stuff: http://xregexp.com/api/#install

const seg0 = [
   'I like AdWords',
   'Jeg liker AdGrants'
]
const seg1 = [
   'yes 1 and 2 and 3',
   'ja 2 og 3 og 4'
]
const seg2 = [
   'I have apple, cake and dog',
   'Jeg har apple, cake og dog'
]
const seg3 = [
   'da parens( )are missing n stuff yo',
   'ein parantes (  mangler'
]
const seg4 = [
   'This has two words',
   'Dette har to to ord'
]

const testCollection = [
   {
      "source_pattern": 'AdWords',
      "target_pattern": '-"AdWords"',
      "toggle": 'on'
   },
   {
      "source_pattern": '-"AdWords"',
      "target_pattern": '-"AdWords"',
      "toggle": 'on'
   }
]

test.cb('source regular, target inverted', (t) => {
   t.deepEqual('Untranslatable "<strong><code>AdWords</code></strong>" missing in translation.', runChecksCollection(seg0[0], seg0[1], testCollection)[0].result)
   t.end()
})

// TODO: Add more tests ... one named test per major thing
/*
 * Test.cb(''), t => {
 * //console.log(runChecksCollection(seg1[0], seg1[1], testCollection))
 * //console.log(runChecksCollection(seg2[0], seg2[1], testCollection))
 * //console.log(runChecksCollection(seg3[0], seg3[1], testCollection))
 * // console.log(runChecksCollection(seg4[0], seg4[1], testCollection))
 * })
 */
