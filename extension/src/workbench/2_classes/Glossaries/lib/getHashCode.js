// TODO: Replace with an NPM module - but make a unit test first to ensure *identical* operation.
export function hashCode(inputStr) {

   let hash = 0
   let i
   let chr
   let len
   if (inputStr.length === 0) {

      return hash

   }
   for (i = 0, len = inputStr.length; i < len; i++) {

      chr = inputStr.charCodeAt(i)
      hash = (hash << 5) - hash + chr
      hash |= 0 // Convert to 32bit integer

   }
   return hash

}
