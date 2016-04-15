import axios from 'axios'

export const checkUser = (user) => {
  const url = '/checkUser'
  // const request = axios.get(url)

  return {
    type: 'CHECK_USER',
    payload: 'hi'
  }
}
