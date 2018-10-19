/**
 * Like Object.assign, but includes getters and setters
 * @param {Object} target
 * @param {Object|Object[]} sources
 * @returns {Object}
 */
export function completeAssign (target: Object, ...sources: Object[]): Object {
   sources.forEach((source) => {
      const descriptors = Object.keys(source).reduce((descriptors, key) => {
         descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
         return descriptors;
      }, {});
      // By default, Object.assign copies enumerable Symbols too
      Object.getOwnPropertySymbols(source).forEach((sym) => {
         const descriptor = Object.getOwnPropertyDescriptor(source, sym);
         if (descriptor.enumerable) {
            descriptors[sym] = descriptor;
         }
      });
      Object.defineProperties(target, descriptors);
   });
   return target;
}