export default (state = null, action) => {
  switch (action.type) {
  case 'ADD_ACTION':
    console.log(action.payload)
    return action.payload
  default:
    return state
  }
}