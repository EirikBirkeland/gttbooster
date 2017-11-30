// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 23.07.2016.
 */

import test from 'ava'

import compareLengths from './compareLengths'
import * as eastAsianWidth from 'east-asian-width'

test('should give reasonable results for eastAsianWidth', (t) => {

   t.is(7, eastAsianWidth.str_width('العَرَبِيَّة'))
   t.is(10, eastAsianWidth.str_width('私は猫です'))
   t.is(6, eastAsianWidth.str_width('我爱你'))
   t.is(6, eastAsianWidth.str_width('Россия'))

})

test('should not not return any messages, just null', (t) => {

   t.is(null, compareLengths('I am hungry', 'Jeg er sulten'))
   t.is(null, compareLengths('Apple cake', 'Eplekake'))
   t.is(null, compareLengths('How are you today', 'Hvordan går det med deg i dag?'))

})

test('should complain that translated strings are too long', (t) => {

   t.is('Long translation', compareLengths('Google is great', 'Google er flotte ting, og Microsoft er enda bedre.'))

})
test('should complain that translated strings are too short', (t) => {

   t.is('Short translation', compareLengths('Google is great, and Microsoft is even better', 'Google er flott.'))

})
