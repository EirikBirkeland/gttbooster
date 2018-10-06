const test = require('ava');
const rgbHex = require('rgb-hex');

test('should convert rgb to hex value', (t) => {
   t.is("7bde8e", rgbHex(123, 222, 142));
});