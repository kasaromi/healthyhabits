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
    db.getAllUsers(client).then((data) => {
      const actual = Object.keys(data)
      const expected = helperFunctions.nUsersArray([1, 2, 3, 4, 5])
      t.deepEqual(actual, expected, 'worked!')
      t.end()
    })
  })
})

test('checkUsernameAvalibility returns false if a user is not available', (t) => {
  client.hsetAsync('users', 'katStallion', 'obj')
  .then(() => {
    db.checkUsernameAvalibility(client, 'katStallion')
      .then(data => {
        const actual = data
        const expected = false
        t.deepEqual(actual, expected, 'worked!')
        t.end()
      })
  })
})

test('checkUsernameAvalibility returns false if a user is available', (t) => {
  client.hsetAsync('users', 'katStallion', 'obj')
  .then(() => {
    db.checkUsernameAvalibility(client, 'robStallion')
      .then(data => {
        const actual = data
        const expected = true
        t.deepEqual(actual, expected, 'worked!')
        t.end()
      })
  })
})

test('storeUser adds a new user with an empty habits array', (t) => {
  db.storeUser(client, 'Robstallion', JSON.stringify({
    password: 'password1',
    habit: []
  }))
  .then(() => {
    db.getAllUsers(client).then(data => {
      const actual = Object.keys(data)[0]
      const expected = 'Robstallion'
      t.deepEqual(actual, expected, 'worked!')
      t.end()
    })
  })
})

test('getUserHabits gets habits of user as an array', (t) => {
  client.hsetAsync('users', 'SamStallion', JSON.stringify({
    password: 'password1',
    habits: ['coding', 'running']
  }))
  .then(() => {
    db.getUserHabits(client, 'SamStallion')
    .then((results) => {
      t.deepEqual(results, ['coding', 'running'])
      t.end()
    })
  })
})

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
