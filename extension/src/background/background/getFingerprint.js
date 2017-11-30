import Fingerprintjs2 from 'fingerprintjs2'

export default function getFingerprint(cb) {

   new Fingerprintjs2().get((result, components) => {

      cb(result) // A hash, representing your device fingerprint

   })

}