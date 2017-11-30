// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 22.07.2016.
 */
/* eslint-env node */


import runCharLimitCheck from './charlimit-check'
import path from 'path'
import $ from 'cheerio'
import fs from 'fs'
import test from 'ava'

const sourceDoc = fs.readFileSync(path.join(__dirname, '/421537/sourceDoc.html'), 'utf8')
const targetDoc = fs.readFileSync(path.join(__dirname, '/421537/targetDoc.html'), 'utf8')

const sourceSegment = $(sourceDoc).find('.goog-gtc-unit')
const targetSegment = $(targetDoc).find('.goog-gtc-unit')

// FIXME: The test input html might be broken ... replace it.
test('should match the RegEx - string too long', (t) => {

   t.regex(runCharLimitCheck($(sourceSegment.get(0)), $(targetSegment.get(0)), sourceDoc, $), /Character limit exceeded by/)

})