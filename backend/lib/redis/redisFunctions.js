export const getAllUsers = (client) => {
  return client.hgetallAsync('users')
}

    })
}
