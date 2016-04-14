import client from './client.js'
import bluebird from 'bluebird'

client.lpush = bluebird.promisify(client.lpush)
client.lrange = bluebird.promisify(client.lrange)

// these are some dummy functions
// make sure to delete these if you're done using them
export const addDummyData = (data) => {
  return client.lpush('myList', data)
}

export const getDummyData = () => {
  return client.lrange('myList', 0, -1)
}
