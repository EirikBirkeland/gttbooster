import test from 'ava'
import {Segment} from './Segment'
import path from 'path'
import $ from 'cheerio'
import fs from 'fs'

const targetDoc = fs.readFileSync(path.join(__dirname, '/421663/targetDoc.html'), 'utf8')

const seg = Segment.create($(targetDoc).find('.goog-gtc-unit')[0])

// TODO: Add a ton of tests
test('A', (t) => {

   t.is('string', typeof seg.inner)

})

test('B', (t) => {

   t.is('string', typeof seg.description)

})

test('C', (t) => {

   t.is('string', typeof seg.innerWithConvertedPlaceholders)

})

test('D', (t) => {

   t.is('string', typeof seg.segmentType)

})

test('E', (t) => {

   t.is('boolean', typeof seg.isPartOfList)

})
