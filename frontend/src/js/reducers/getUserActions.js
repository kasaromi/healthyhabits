export default (state = null, action) => {
  switch (action.type) {
  case 'LOAD_ACTIONS':
    console.log(action.payload, '-------reducer load action')
    return action.payload
  default:
    return state
  }
}
