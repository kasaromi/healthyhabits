export const getAllUsers = (client) => {
  return client.hgetallAsync('users')
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

    })
}
