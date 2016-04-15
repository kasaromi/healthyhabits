process.env.REDIS_DB = 1

const tape = require('wrapping-tape')
const redis = require('redis')
const bluebird = require('bluebird')

const db = require('../dist/redis/redisFunctions.js')
const helperFunctions = require('./redis.test.helper.js')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const DB_URL = process.env.REDIS_URL || 'redis://localhost:6379'
const DB_NUM = process.env.REDIS_DB || 1
var client = []

const test = tape({
  setup: (t) => {
    client = redis.createClient(DB_URL)
    client.select(DB_NUM, () => {
      client.flushdb()
      t.end()
    })
  },
  teardown: (t) => {
    client.flushdb()
    client.quit()
    t.end()
  }
})

test('getAllUsers gets an array of all users', (t) => {
  helperFunctions.setNusers(client, [1, 2, 3, 4, 5], () => {
    db.getAllUsers(client, (res) => {
      const actual = Object.keys(res)
      const expected = helperFunctions.nUsersArray([1, 2, 3, 4, 5])
      t.deepEqual(actual, expected, 'worked!')
      t.end()
      client.quit()
    })
  })
})

// test('getUser gets value of user', (t) => {
//   helperFunctions.set5users().then(() => {
//     return db.getUser('users', 'user1')
//   }).then((results) => {
//     t.deepEqual(results, JSON.stringify({
//       password: 'password1',
//       habits: []
//     }))
//     t.end()
//   })
// })
//
// test('addNewUser adds a new user with an empty habits array', (t) => {
//   db.addNewUser('users', 'user1', 'password1').then(() => {
//     return client.hget('users', 'user1')
//   }).then((results) => {
//     t.deepEqual(results, {
//       password: 'password1',
//       habits: []
//     })
//     t.end()
//   })
// })
//
// // test('addNewHabit adds a new habit to the habit array for an already set up user', (t) => {
// //   client.hset('users', 'user1', {
// //     password: 'password1',
// //     habits: []
// //   }).then(() => {
// //     return db.getPrechatNotes(client, 'john')
// //   }).then((results) => {
// //     t.deepEqual(results, [{
// //       menteeName: 'john',
// //       mentorName: 'sally',
// //       note: 'Some stuff',
// //       date: '2016/04/01'
// //     }])
// //     t.end()
// //   })
// // })
