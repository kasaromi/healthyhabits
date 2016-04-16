export const getAllUsers = (client) => {
  return client.hgetallAsync('users')
}

export const storeUser = (client, username, action) => {
  return client.hsetAsync('users', username, action)
}

export const getUserActions = (client, username) => {
  return client.hgetAsync('users', username)
    .then(data => {
      const habits = JSON.parse(data).actions
      return Promise.resolve(habits)
    })
}

export const addNewAction = (client, username, action) => {
  return client.hgetAsync('users', username)
    .then(data => {
      const initActions = JSON.parse(data).actions
      const newActions = initActions.concat(action)
      const strnewActions = JSON.stringify(newActions)
      client.hsetAsync('users', username, strnewActions)
    })
}
