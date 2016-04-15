export default (state = null, action) => {
  switch (action.type) {
    case 'CHECK_USER':
      return action.payload
  }
}
