/**
 *
 * @param {number} lastUpdated
 * @param {number} option - number of days
 * @return {boolean}
 */
export default function isNotOld (lastUpdated, option) {
   const daysOption = option ? option * 24 * 60 * 60 * 1000 : null;

   const sevenDays = 6.048e+8;
   const expirationTime = daysOption || sevenDays;
   return new Date() - lastUpdated < expirationTime;
}
