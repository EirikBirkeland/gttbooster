export default function asyncForEach(arr, cb, delay = 50, index = 0) {

   if (index > arr.length - 1) {

      return

   }
   cb(arr[index], index, arr)
   setTimeout(() => {

      asyncForEach(arr, cb, delay, ++index)

   }, delay)

}
