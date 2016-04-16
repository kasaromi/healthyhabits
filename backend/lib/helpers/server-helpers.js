import server from '../server.js'

export const handlePlugins = (err) => {
  if (err) {
    console.log('plugins error: ', err)
    throw err
  }
}

export const handleStart = (err) => {
  if (err) {
    console.log('server error: ', err)
  } else {
    console.log('server listening on port: ' + server.info.port)
  }
}

export const handleRoute = (method, urlpath, handler) => {
  return {
    method: method,
    path: urlpath,
    handler: handler
  }
}
