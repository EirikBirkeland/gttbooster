/**
 *
 * @param {Array} arr - the array to iterate on
 * @param {Function} func - the function to execute. Receives standard ele, i, arr parameters
 * @param {number} [delay]
 * @param {number} [index]
 */
module.exports = function forEachAsync(arr, func, delay = 0, index = 0) {
  if (typeof arr !== 'object') {
    return console.error('Can only iterate an array or array-like! You provided an item of type ' + typeof arr)
  }
  if (arr[index]) {
    func(arr[index], index, arr)
  }
  if (arr.length) {
    setTimeout(forEachAsync.bind(this, arr, func.bind(this), delay, ++index), delay)
  }
}
