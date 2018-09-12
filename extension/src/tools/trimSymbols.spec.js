import test from 'ava'
import {trimSymbols} from './trimSymbols'

test('should ...', (t) => {
   t.deepEqual("books & videos", trimSymbols('books & videos.'))
})