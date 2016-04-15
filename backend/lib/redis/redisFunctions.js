export const getAllUsers = (client, callback) => {
  client.hgetallAsync('users')
    .then((res) => {
      callback(res)
    })
}
