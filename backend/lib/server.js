require('env2')('./config.env')

import Hapi from 'hapi'
const server = new Hapi.Server()
const port = process.env.PORT || 4000

// helper methods
import { handlePlugins, handleStart, handleRoute } from './helpers/server-helpers.js'

// server plugins
import Inert from 'inert'

const ConnectionSettings = { port, routes: {cors: true} }
const Plugins = [Inert]

const Routes = [
  handleRoute('GET', '/img/{imageUrl*}', './public/img', 'directory'),
  handleRoute('GET', '/app.js', './public/app.js'),
  handleRoute('GET', '/{param*}', './public/index.html')
]

server.connection(ConnectionSettings)
server.register(Plugins, handlePlugins)
server.route(Routes)
server.start(handleStart)

export default server
