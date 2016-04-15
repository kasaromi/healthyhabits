export const getAllUsers = (client) => {
  return client.hgetallAsync('users')
}

export const storeUser = (client, username, data) => {
  return client.hsetAsync('users', username, data)
}

    })
}
