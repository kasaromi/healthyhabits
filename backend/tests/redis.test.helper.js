const setNusers = (client, arr, callback) => {
  arr.forEach((n, i) => {
    client.hsetAsync('users', 'user' + n, JSON.stringify({
      password: 'password' + n,
      habits: []
    }))
    .then(() => {
      if (i === arr.length - 1) {
        callback()
      }
    })
  })
}

const nUsersArray = arr => {
  return arr.map(n => {
    return 'user' + n
  })
}

module.exports = {
  setNusers: setNusers,
  nUsersArray: nUsersArray
}
