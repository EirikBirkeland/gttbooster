import test from 'ava';
import { ChromeProxy } from './ChromeProxy';

test('should output a mock version of a sent background message', (t) => {
   t.pass();
   ChromeProxy.runtime.sendMessage('oh hi');
});