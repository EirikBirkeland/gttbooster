// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 16.08.2016.
 */

import ParensCheck from './parens-check'
import test from 'ava'

const seg0 = [
   'I am a cat (or a dog)',
   'Jeg er en katt (eller en hund)'
]
// Const seg1 = ['I am a {{cat (or a dog)','Jeg er en katt eller en hund(){{']

test('abc', (t) => {
   t.deepEqual(true, ParensCheck.compare(seg0[0], seg0[1]).allFound)
})
