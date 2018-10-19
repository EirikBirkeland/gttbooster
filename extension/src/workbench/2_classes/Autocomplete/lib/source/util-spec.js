import test from 'ava';
import {lowerCaseFilterAccordingToProp, uniqFilterAccordingToProp, upperCaseFilterAccordingToProp} from './util';
import type {Term} from './Term-type';

const terms: Term = [
   {
      "label": 'Apple',
      "type": 'gl',
      "color": 'green'
   },
   {
      "label": 'pear',
      "type": 'tm',
      "color": 'blue'
   },
   {
      "label": 'Dog',
      "type": 'mt',
      "color": 'orange'
   },
   {
      "label": 'cat',
      "type": 'mt',
      "color": 'orange'
   }
];

test('should uppercase filter terms according to property name', (t) => {
   t.deepEqual([
      {
         "label": 'Apple',
         "type": 'gl',
         "color": 'green'
      },
      {
         "label": 'Dog',
         "type": 'mt',
         "color": 'orange'
      }
   ], terms.filter(upperCaseFilterAccordingToProp('label')));
});

test('should uppercase filter terms according to property name', (t) => {
   t.deepEqual([
      {
         "label": 'pear',
         "type": 'tm',
         "color": 'blue'
      },
      {
         "label": 'cat',
         "type": 'mt',
         "color": 'orange'
      }
   ], terms.filter(lowerCaseFilterAccordingToProp('label')));
});

test('should unique filter according to property name', (t) => {
   const terms = [
      {
         "label": 'pear',
         "type": 'tm',
         "color": 'blue'
      },
      {
         "label": 'pear',
         "type": 'tm',
         "color": 'blue'
      },
      {
         "label": 'pear',
         "type": 'tm',
         "color": 'blue'
      }
   ];
   t.deepEqual([
      {
         "label": 'pear',
         "type": 'tm',
         "color": 'blue'
      }
   ], terms.filter(uniqFilterAccordingToProp('label')));
});

test('should fail to unique filter according to property name because of erroneous data', (t) => {
   const terms = [
      {
         "apple": 'pear',
         "type": 'tm',
         "color": 'blue'
      },
      {
         "cake": 'pear',
         "type": 'tm',
         "color": 'blue'
      },
      {
         "fish": 'pear',
         "type": 'tm',
         "color": 'blue'
      }
   ];
   t.deepEqual([], terms.filter(uniqFilterAccordingToProp('cat')));
});