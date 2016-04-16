export const checkUsernameAvalibility = (client, username) => {
  return client.hgetallAsync('users')
  .then(data => {
    const userNames = Object.keys(data)
    const isAvaliable = username.indexOf(userNames) === -1
    return Promise.resolve(isAvaliable)
  })
}

export const storeUser = (client, username, data) => {
  return client.hsetAsync('users', username, data)
}

export const getUserHabits = (client, username) => {
  return client.hgetAsync('users', username)
    .then(data => {
      const habits = JSON.parse(data).habits
      return Promise.resolve(habits)
    })
}
