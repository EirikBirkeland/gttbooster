/* eslint-env es7*/
const LOCAL_EXTENSION_URL = require('@eirikbirkeland/ob-config').LOCAL_EXTENSION_URL
const REST_SERVER_HOST_NAME = require('@eirikbirkeland/ob-config').REST_SERVER_HOST_NAME
const Promise = require('bluebird')
const dns = require('dns')
const dnsReverse = Promise.promisify(dns.reverse)

module.exports = function (opts) {
   return async (req, res, next) => {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
      const origin = req.get('origin')
      const host = req.get('host')

      let domains
      try {
         /* ------> AWAIT START -----> */
         domains = await dnsReverse(ip)
         /* ------> AWAIT END ------->*/
      } catch (e) {
         if (e.code && e.code === "ENOTFOUND") {
            console.warn("Host name for " + ip + " could not be looked up (err.code: ENOTFOUND).")
         } else {
            console.warn(e)
         }
      }

      if (domains && domains.includes('notify.paypal.com') || domains && domains.includes('ipnpb.paypal.com')) {
         console.log('Temporarily skipping firewall.js for request from PayPal')
         return next()
      }

      if (opts.exceptionIp) {
         if (opts.exceptionIp.includes(ip)) {
            return next()
         }
      }

      if (origin !== LOCAL_EXTENSION_URL || host !== REST_SERVER_HOST_NAME) {
         if (origin !== LOCAL_EXTENSION_URL) {
            console.warn('Origin is not valid for ' + ip + ' !')
            console.warn('Host name was: ' + host)
         }
         if (host !== REST_SERVER_HOST_NAME) {
            console.warn('Host is not valid for ' + ip + ' !')
            console.warn('Host name was: ' + origin)
         }

         console.log(`Domain name(s) for IP ${ip} are ${domains}`)

      }
      // TODO: Disallow host === LOCAL_EXTENSION_URL later on after figuring this out.
      if (origin === LOCAL_EXTENSION_URL && (host === REST_SERVER_HOST_NAME)) {
         next()
      }
   }
}