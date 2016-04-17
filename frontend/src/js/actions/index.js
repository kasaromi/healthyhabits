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

export const addNewAction = (input1, input2, input3) => {
  const toSend = {}
  const username = document.cookie.split('=')[1]
  const inputObj = {}
  inputObj.habit = input1
  inputObj.friendName = input2
  inputObj.friendNumber = input3
  toSend.user = username
  toSend.habit = inputObj
  console.log(toSend, '--toSend---')
  const url = '/addNewAction'
  return axios.post(url, JSON.stringify(toSend))
    .then(response => {
      return Promise.resolve({
        type: 'ADD_ACTION',
        payload: response.data
      })
    })
}
