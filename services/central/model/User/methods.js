Array.prototype.uniq = function () {
   return this.filter((ele, i) => this.indexOf(ele) === i)
}

/**
 * Log access for today's date
 */
function logUserStats(fingerprint) {
   const todaysDate = new Date().toLocaleDateString()
   this.usage.datesUsed.push(todaysDate)
   this.usage.datesUsed = this.usage.datesUsed.sort().uniq()

   if (fingerprint) {
      this.usage.fingerprints.push(fingerprint)
      this.usage.fingerprints = this.usage.fingerprints.sort().uniq()
   }
}

/**
 *
 * @param {string} ip
 */
function logIpStats(ip) {
   const index = this['ip-stats'].map(ele => ele.ip).indexOf(ip)

   if (index !== -1) {
      this['ip-stats'][index]['#'] += 1
      this['ip-stats'][index]['date'] = Date.now()
   } else {
      this['ip-stats'].push({ip: ip, '#': 1, 'date': Date.now()})
   }

}

/**
 *
 * @param {boolean} boolValidUser
 */
function logAuth() {
   this.userLastSeen = new Date()
   this.requests.auth['#'] += 1
   this.requests.auth.success += (this._id ? 1 : 0)
   this.requests.auth.fail += (this._id ? 0 : 1)
   this.requests.auth.lastRequest = new Date()
}

/**
 *
 * @type {number} - Unique days allowed for any trial. This number can be increased to quickly give every user X extra days, then later it can be returned to a lower number (though that may disturb a few users here and there, but who cares.)
 */
const UNIQUE_DAYS_ALLOWED = require('cth-config').UNIQUE_DAYS_ALLOWED

/**
 * @return {boolean}
 */
function didTrialAndFreeTimeExpire() {
   const freetime = this._extraDaysGranted
   const datesUsed = this.usage.datesUsed
   return datesUsed.length >= (UNIQUE_DAYS_ALLOWED + freetime)
}

/**
 * @return {number}
 */
function getFreeDaysLeft() {
   const freeDaysLeft = (UNIQUE_DAYS_ALLOWED + this._extraDaysGranted) - this.usage.datesUsed.length
   if (freeDaysLeft > 0) return freeDaysLeft
   else return 0
}

module.exports = {logUserStats, didTrialAndFreeTimeExpire, logIpStats, logAuth, getFreeDaysLeft}