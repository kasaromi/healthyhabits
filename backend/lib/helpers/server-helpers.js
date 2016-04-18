import server from '../server.js'

export const handlePlugins = (err) => {
  if (err) {
    console.log('plugins error: ', err)
    throw err
  }
}

export const handleRoute = (method, urlpath, handler) => {
  return {
    method: method,
    path: urlpath,
    handler: handler
  }
}
