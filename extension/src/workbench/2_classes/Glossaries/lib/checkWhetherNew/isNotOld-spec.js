import test from 'ava'
import isNotOld from './isNotOld'

test('Should check whether an item is "old"', (t) => {

   const sevenDays = 6.048e+8
   const threeDays = 259200000
   const oneWeekAgo = new Date() - sevenDays
   const threeDaysAgo = new Date() - threeDays

   t.deepEqual(true, isNotOld(threeDaysAgo))

})
