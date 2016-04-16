import axios from 'axios'

export const sayHello = () => {
  const url = '/sayhello'
  return axios.get(url)
    .then(request => {
      return Promise.resolve({
        type: 'SAY_HELLO',
        payload: request.data
      })
    })
}

export const checkUser = () => {
  return {
    type: 'CHECK_USER',
    payload: 'hilow'
  }
}
