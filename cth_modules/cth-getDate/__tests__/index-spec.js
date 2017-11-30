const test = require('ava')
const getDate = require('../index')

test('', (t)=>{
    t.is('string', typeof getDate())
})