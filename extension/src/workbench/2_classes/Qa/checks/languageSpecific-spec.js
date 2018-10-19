// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 28.09.2016.
 */

const debug = require('cth-debug');
const test = require('ava');
const Tests = require('./languageSpecific');

// Logger.setLevel("debug")

debug(Tests.extraSpacesBefore('Hello   .', '.'));

test('extra spaces before', (t) => {
   t.is('<code> .</code>', Tests.extraSpacesBefore('Hello .', '.').error);
});

debug(Tests.forbiddenCharacters('abc#abc', '#'));

test('', (t) => {
   t.is('<code>#</code>', Tests.forbiddenCharacters(
      'abc#abc',
      '#'
   ).error);
});

debug(Tests.missingEndPunctuation(
   'I am hungry.',
   'Jeg er sulten',
   '.'
));

test('missing end punctuation', (t) => {
   t.is('<code>.</code>', Tests.missingEndPunctuation(
      'I am hungry.',
      'Jeg er sulten',
      '.,?!'
   ).error);
});

debug(Tests.redundantEndPunctuation(
   'abc',
   'abc.',
   '.,?!'
));

test('redundant end punctuation', (t) => {
   t.is('<code>!</code>', Tests.redundantEndPunctuation(
      'abc',
      'abc!',
      '.,?!'
   ).error);
});

debug(Tests.consecutivePunctuation('hello ;; there', '.,;'));

test('consecutive punctuation', (t) => {
   t.is('<code>..</code>', Tests.consecutivePunctuation('hello .. there', '.,!?;').error);
});
