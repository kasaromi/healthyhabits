export default (state = null, action) => {
  switch (action.type) {
  case 'SAY_HELLO':
    console.log(action.payload)
    return action.payload
  default:
    return state
  }
}
