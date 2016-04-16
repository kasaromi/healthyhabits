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

export const handleRoute = (method, urlpath, replyPath, handler) => {
  if (handler === 'directory') {
    return {
      method: method,
      path: urlpath,
      handler: {directory: {path: replyPath}}
    }
  } else if (handler === 'reply') {
    return {
      method: method,
      path: urlpath,
      handler: (request, reply) => {
        reply(replyPath)
      }
    }
  } else {
    return {
      method: method,
      path: urlpath,
      handler: (request, reply) => {
        reply.file(replyPath)
      }
    }
  }
}
