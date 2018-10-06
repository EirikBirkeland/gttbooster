// Synchronous object storage. The contents are synced with localStorage automatically.

import getPersistentArrayObject from 'persistent-array';

/*
 * Usage:
 * const myPersistentArray = getPersistentArrayObject("myArray")
 */
export default getPersistentArrayObject(cth.docInfo.dokNavn.innerHTML);
