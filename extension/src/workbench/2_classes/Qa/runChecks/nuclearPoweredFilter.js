const debug = require('cth-debug')(__filename);

/**
 *
 * @param fn {Function} - function to execute
 * @param params - parameters to apply to function
 */
export default function nuclearPoweredFilter (fn, ...params) {
   let result = fn(...params);
   // Just for conveniently overriding the fact that some tests return a detailed object:
   if (result && result.hasOwnProperty('msg')) {
      result = result.msg;
   }

   if (typeof result === 'string') {
      if (result.length > 0) {
         this.push(result);
      } else {
         // Just an empty string: ""
      }
   } else if (result === null) {
      // Ignore this, as every test that didn't yield anything returns null.
   } else {
      debug.log('Unexpected results from this function:');
      debug.log(fn.toString());
      debug.log('With these results:');
      debug.log(result);
      debug.log('Refer to window.cth.testError');
      window.cth.testError = result;
   }
}
