/**
 *
 * @param input {string} - a string containing a number to extract
 * @returns {*} - return a string
 */
export default function getColor (input: string): string | null {
   input = parseInt(input);

   if (input < 60) {
      return 'red';
   } else if (input >= 60 && input < 80) {
      return 'orange';
   } else if (input >= 80 && input < 100) {
      return 'blue';
   } else if (input === 100) {
      return 'blue';
   }
   
   return null;
}
