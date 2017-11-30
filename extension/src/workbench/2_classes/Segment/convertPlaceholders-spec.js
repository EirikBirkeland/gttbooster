// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 30.07.2016.
 */
/* eslint-env node */

import test from 'ava'
import path from 'path'
import $ from 'cheerio'
import fs from 'fs'

import {convertPlaceholders} from './convertPlaceholders'

const source = fs.readFileSync(path.join(__dirname, '/421537/sourceDoc.html'), 'utf8')
const source2 = fs.readFileSync(path.join(__dirname, '/421663/sourceDoc.html'), 'utf8')
const source3 = fs.readFileSync(path.join(__dirname, '/web-strong-bold-italic/sourceDoc.html'), 'utf8')
const source4 = fs.readFileSync(path.join(__dirname, '/756193/sourceDoc.html'), 'utf8')
const source5 = fs.readFileSync(path.join(__dirname, '/761195/sourceDoc.html'), 'utf8')
const source6 = fs.readFileSync(path.join(__dirname, '/761439/sourceDoc.html'), 'utf8')
const source7 = fs.readFileSync(path.join(__dirname, '/793667/sourceDoc.html'), 'utf8')

test('A single tag; should be reflected in the new string.', (t) => {

   t.is(
      '{0/}Removing %1$d original photo or video',
      convertPlaceholders($(source).find('.goog-gtc-unit')[1], $)
   )

})

test('Recurring tags should be handled properly', (t) => {

   t.is(
      '{0/}{1/} of existing backup data will be deleted.{2/}{3/}This will stop all future {4/} backups.{2/}',
      convertPlaceholders($(source2).find('#goog-gtc-unit-42'), $)
   )

})

test('Markup like STRONG and B tags should be handled properly', (t) => {

   t.is(
      '{0}Oh so strong{/0} and so {0}apple{/0}{1}bold{/1} and {2}italics{/2}',
      convertPlaceholders($(source3).find('.goog-gtc-unit')[0], $)
   )

})

// TODO: Implement test for source4 / 756193 - #goog-gtc-unit-35
test('should handle special DFP segments', (t) => {

   t.is(
      '{0}All returned parts for which you have received a {/0}{1}replacement will become the property of Google. {/1}',
      convertPlaceholders($(source5).find('#goog-gtc-unit-22')[0], $)
   )

})

test('should convert ...', (t) => {

   t.is(
      '{0/}{1}Does it work with OnHub and other devices?{/1}',
      convertPlaceholders($(source6).find('#goog-gtc-unit-1')[0], $)
   )

})

test('should convert somewhat unusual "notranslate" placeholders as expected', (t) => {

   t.is(
      'For more information, see {0/}this Help Center page{1/}.',
      convertPlaceholders($(source7).find('#goog-gtc-unit-19')[0], $)
   )

})