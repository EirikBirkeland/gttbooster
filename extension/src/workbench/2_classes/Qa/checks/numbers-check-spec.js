// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 23.07.2016.
 */


import test from 'ava'
import Number from './numbers-check'

const seg1 = [
   '1,000,000 1.0 42, 850',
   '1 000 000 1,0 42, 850'
]
const seg2 = [
   '1,000,000 dogs and 1.0 cm and 42 conundrums and 850 ants',
   '1 000 000 hunder og 1,0 cm og 42 gåter og 850 maur'
]
const seg3 = [
   '3 2 1',
   '3 1 2'
]
const seg4 = [
   '42 18',
   '43 15'
]
const seg5 = [
   '1a000a000 123',
   '1b000b000 123'
]
const seg7 = [
   '3:45 pm',
   '15.45'
]
const seg8 = [
   'I have 1,000 dogs',
   'Jeg har 1000 hunder'
]
const seg9 = [
   '5:09 PM',
   '17.09'
]
const seg10 = [
   '6.07GB',
   '6,07 GB'
]

/*
 * Const seg11 = ['$2.00 USD', 'USD 2,00']
 * const seg12 = ['9.2 YOU ARE', '9.2 DU ER']
 */
const seg13 = [
   'it\'s at 00:00',
   'det er kl. 24.00'
]

test('should return the expected object', (t) => {

   t.deepEqual(false, Number.compare(seg1[0], seg1[1]).allFound)
   t.deepEqual(true, Number.compare(seg2[0], seg2[1]).orderValid)
   t.deepEqual(false, Number.compare(seg3[0], seg3[1]).orderValid)
   t.deepEqual(false, Number.compare(seg4[0], seg4[1]).allFound)
   t.deepEqual(true, Number.compare(seg7[0], seg7[1]).allFound)
   t.deepEqual(true, Number.compare(seg8[0], seg8[1]).allFound)

})

test('should not treat as float if not followed by a unit', (t) => {

   t.pass()

})

test('should properly handle time expressions (English > Norwegian)', (t) => {

   t.deepEqual(true, Number.compare(seg9[0], seg9[1]).allFound)

})

test('should properly handle units like GB', (t) => {

   t.deepEqual(true, Number.compare(seg10[0], seg10[1]).allFound)

})

test('should work with custom options', (t) => {

   t.deepEqual(
      'object',
      typeof Number.compare(seg5[0], seg5[1], {
         "thousandsSeparator": {
            "source": 'a',
            "target": 'b'
         }
      })
   )

})

test('should convert 00:00 to 24.00', (t) => {

   t.deepEqual(
      'object',
      typeof Number.compare(seg13[0], seg13[1])
   )

})
