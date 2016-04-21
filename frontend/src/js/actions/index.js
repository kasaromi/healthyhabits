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
  inputObj.completed = []
  toSend.user = username
  toSend.habit = inputObj
  const url = '/addNewAction'
  return axios.post(url, toSend)
    .then(response => {
      return Promise.resolve({
        type: 'ADD_ACTION',
        payload: response.data
      })
    })
}

export const getUserActions = () => {
  const username = document.cookie.split('=')[1]
  const toSend = {}
  const habitsArr = []
  toSend.user = username
  toSend.habits = habitsArr
  const url = '/getUserActions'
  return axios.post(url, toSend)
  .then(response => {
    console.log(response.data, '<-------response data over here')
    return Promise.resolve({
      type: 'LOAD_ACTIONS',
      payload: response.data
    })
  })
}
