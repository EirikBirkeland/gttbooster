// TODO: Test and expand this. Replace with "CORS" npm module if feasible.
module.exports = function() {
    return function(request, response, next) {
      // Website you wish to allow to connect
        response.setHeader('Access-Control-Allow-Origin', '*')
         // Request methods you wish to allow
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST')
         // Request headers you wish to allow
        response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
         // Set to true if you need the website to include cookies in the requests sent
         // to the API (e.g. in case you use sessions)
        response.setHeader('Access-Control-Allow-Credentials', true)
         // Pass to next layer of middleware
        next()
    }
}
