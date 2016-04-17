process.env.REDIS_DB = 1

const tape = require('wrapping-tape')
const redis = require('redis')
const bluebird = require('bluebird')

const db = require('../dist/redis/redisFunctions.js')
// const helperFunctions = require('./redis.test.helper.js')

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

test('storeUser adds a new user with an empty habits array', (t) => {
  db.storeUser(client, 'Robstallion', JSON.stringify({
    actions: []
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

test('getUserActions gets habits of user as an array', (t) => {
  client.hsetAsync('users', 'SamStallion', JSON.stringify({
    actions: ['coding', 'running']
  }))
  .then(() => {
    db.getUserActions(client, 'SamStallion')
    .then((results) => {
      t.deepEqual(results, ['coding', 'running'])
      t.end()
    })
  })
})

// test('addNewAction adds a new action to the array of existing actions', (t) => {
//   client.hsetAsync('users', 'SamStallion', JSON.stringify({
//     actions: ['coding', 'running']
//   }))
//   .then(() => {
//     db.addNewAction(client, 'SamStallion', 'swimming')
//     .then(() => {
//       client.hgetAsync('users', 'SamStallion')
//         .then(data => {
//           const results = JSON.parse(data)
//           t.deepEqual(results, ['coding', 'running', 'swimming'])
//           t.end()
//         })
//     })
//   })
// })

test('addNewAction adds a new action to the array of existing actions and returns user actions afterwards', (t) => {
  client.hsetAsync('users', 'SamStallion', JSON.stringify([{
    habitName: 'swimming',
    previousDates: [{d100000: true}, {d100000: false}],
    friendNo: '+44...',
    friendName: 'Rob',
    startDate: '10000'
  }]))
  .then(() => {
    return db.addNewAction(client, 'SamStallion', {
      habitName: 'coding',
      previousDates: [{d100000: true}, {d100000: true}],
      friendNo: '+44...',
      friendName: 'Kat',
      startDate: '20000'
  })
  .then((data) => {
    console.log('DATA->>>>>>', data, 'TYPE', typeof data)
    const results = (data)
    t.deepEqual(results, [
      {
        habitName: 'swimming',
        previousDates: [{d100000: true}, {d100000: false}],
        friendNo: '+44...',
        friendName: 'Rob',
        startDate: '10000'
      },
      {
        habitName: 'coding',
        previousDates: [{d100000: true}, {d100000: true}],
        friendNo: '+44...',
        friendName: 'Kat',
        startDate: '20000'
      }
    ], 'THEY ARE THE SAME')
    t.end()
  })
  })
})

test('addNewAction works when the db is previously empty', (t) => {
  return db.addNewAction(client, 'SamStallion', {
    habitName: 'coding',
    previousDates: [{d100000: true}, {d100000: true}],
    friendNo: '+44...',
    friendName: 'Kat',
    startDate: '20000'
  })
  .then((data) => {
    console.log('DATA->>>>>>', data, 'TYPE', typeof data)
    const results = (data)
    t.deepEqual(results, [
      {
        habitName: 'coding',
        previousDates: [{d100000: true}, {d100000: true}],
        friendNo: '+44...',
        friendName: 'Kat',
        startDate: '20000'
      }
    ], 'THEY ARE THE SAME')
    t.end()
  })
})

test('completeAction changes completed from false to true for specific action', (t) => {
  client.hsetAsync('users', 'SamStallion', JSON.stringify({
    actions: [{
      action: 'coding',
      completed: false}]
  }))
  .then(() => {
    db.completeAction(client, 'SamStallion', 'coding')
    .then(() => {
      client.hgetAsync('users', 'SamStallion')
        .then(data => {
          const results = JSON.parse(data)
          t.deepEqual(results, [{
            action: 'coding',
            completed: true}])
          t.end()
        })
    })
  })
})
