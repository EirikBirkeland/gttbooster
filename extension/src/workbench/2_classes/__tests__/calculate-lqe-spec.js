/*
 * Calculate-lqe-spec.js
 * Copyright (C) 2016 Eirik Birkeland
 */
import test from 'ava';
import calculate from '../../../otherPages/calculateLqe';

// Const debug = require('cth-debug')(__filename)

test('should return false, to indicate a non-fail', (t) => {
   t.deepEqual(false, calculate(800, 2.5).isFail);
});

test('should return true,  to indicate a fail', (t) => {
   t.deepEqual(true, calculate(800, 4).isFail);
});

test('should be a report containing letters and numbers', (t) => {
   t.regex(calculate(800, 9).textReport, /\w.*[0-9]/);
});
