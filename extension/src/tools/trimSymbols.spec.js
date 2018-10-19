import test from 'ava';
import { trimSymbols } from './trimSymbols';

test('should trim symbols', (t) => {
   t.deepEqual("books & videos", trimSymbols('books & videos.'));
});