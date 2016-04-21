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

test('getUserHabits gets habits of user as an array', (t) => {
  client.hsetAsync('users', 'SamStallion', JSON.stringify([
    {
      habit: 'swimming',
      sponsor: 'rob',
      sponsorNum: '65974439',
      startDate: 1234567,
      DaysCompleted: []
    },
    {
      habit: 'running',
      sponsor: 'kat',
      sponsorNum: '12345678',
      startDate: 1234568,
      DaysCompleted: []
    }
  ]))
  .then(() => {
    db.getUserHabits(client, 'SamStallion')
    .then((results) => {
      t.deepEqual(results, {habits: ['coding', 'running']})
      t.end()
    })
  })
})

test('addNewHabit adds a new habit to the array of habits and returns user habits afterwards', (t) => {
  client.hsetAsync('users', 'SamStallion', JSON.stringify([{
    habitName: 'swimming',
    previousDates: [{d100000: true}, {d100000: false}],
    friendNo: '+44...',
    friendName: 'Rob',
    startDate: '10000'
  }]))
  .then(() => {
    return db.addNewHabit(client, 'SamStallion', {
      habitName: 'coding',
      previousDates: [{d100000: true}, {d100000: true}],
      friendNo: '+44...',
      friendName: 'Kat',
      startDate: '20000'
    })
  .then((data) => {
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

test('addNewHabit works when the db is previously empty', (t) => {
  return db.addNewHabit(client, 'SamStallion', {
    habitName: 'coding',
    previousDates: [{d100000: true}, {d100000: true}],
    friendNo: '+44...',
    friendName: 'Kat',
    startDate: '20000'
  })
  .then((data) => {
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

test('completeHabit changes completed from false to true for specific habit', (t) => {
  client.hsetAsync('users', 'SamStallion', JSON.stringify({
    habits: [{
      habit: 'coding',
      completed: false}]
  }))
  .then(() => {
    db.completeHabit(client, 'SamStallion', 'coding')
    .then(() => {
      client.hgetAsync('users', 'SamStallion')
        .then(data => {
          const results = JSON.parse(data)
          t.deepEqual(results, [{
            habit: 'coding',
            completed: true}])
          t.end()
        })
    })
  })
})
