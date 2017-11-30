const test = require('ava')
const fetch = require('node-fetch')
const ps = require('portscanner')
// TODO: Add database check

const websiteUrlsToTest = [
  'https://www.gtt-booster.com',
  'https://base.gtt-booster.com'
]

test.cb('The main website (store) should return status 200', t => {
  fetch(websiteUrlsToTest[0]).then(res => {
    if (res.ok) {
      t.end()
    }
  })
})

test.cb('The knowledge base running on Raneto should return status 200', t => {
  fetch(websiteUrlsToTest[1]).then(res => {
    if (res.ok) {
      t.end()
    }
  })
})

test.cb('The API, when accessed using GET, should returned the expected error', t => {
  fetch('https://api.gtt-booster.com').then(res => res.text()).then((text) => {
    if (text.match(/Cannot GET \//)) {
      t.end()
    }
  })
})

test.cb('Mongo should be running on port 27017', t => {
  ps.checkPortStatus(27017, 'localhost', function (err, status) {
    if (status === 'open') {
      t.end()
    }
  })
})

test.cb('Mongo should NOT running on port 27018 (just an extra arbitrary check)', t => {
  ps.checkPortStatus(27018, 'localhost', function (err, status) {
    if (status === 'closed') {
      t.end()
    }
  })
})