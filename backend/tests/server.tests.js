const tape = require('wrapping-tape')
const server = require('../dist/server.js').default
const client = require('../dist/redis/client.js').default()

const tests = tape({
  setup: (t) => {
    client.flushdb()
    t.end()
  },
  teardown: (t) => {
    client.flushdb()
    t.end()
  }
})

tests('Check index status', (t) => {
  server.inject({
    method: 'GET',
    url: '/'
  }, (res) => {
    t.equal(res.statusCode, 200, 'Assert status code is 200')
    t.end()
  })
})

tests('Test setting prechats', (t) => {
  server.inject({
    method: 'POST',
    url: '/checkUser',
    payload: {
      menteeName: 'john',
      mentorName: 'jim',
      note: 'foo',
      date: '1980/12/10'
    }
  }, (res) => {
    t.deepEqual(res.result, {data: 1, success: true}, 'Assert success')
    t.end()
  })
})

tape({
  setup: (t) => t.end(),
  teardown: (t) => t.end()
})('Final teardown', (t) => {
  client.end(true)
  t.end()
})
