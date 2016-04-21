export default (state = null, action) => {
  switch (action.type) {
  case 'ADD_ACTION':
    console.log(action.payload, '-------reducer adding an action')
    return action.payload
  default:
    return state
  }
}
