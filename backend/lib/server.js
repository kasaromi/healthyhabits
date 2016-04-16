require('env2')('./config.env')

import Hapi from 'hapi'
const server = new Hapi.Server()
const port = process.env.PORT || 4000

import { handlePlugins, handleStart, handleRoute } from './helpers/server-helpers.js'
import client from './redis/client.js'
import { checkUsernameAvalibility } from './redis/redisFunctions.js'

import Inert from 'inert'

const ConnectionSettings = { port, routes: {cors: true} }
const Plugins = [Inert]

const Routes = [
  handleRoute('GET', '/img/{imageUrl*}', {directory: {path: './public/img'}}),
  handleRoute('GET', '/sayhello', (req, reply) => {reply('theResponse')}),
  handleRoute('GET', '/app.js', (req, reply) => {reply.file('./public/app.js')}),
  handleRoute('POST', '/checkUser', (req, reply) => {
    console.log(req.payload)
    reply(checkUsernameAvalibility(client(), req.payload))
  }),
  handleRoute('GET', '/{param*}', (req, reply) => {reply.file('./public/index.html')})
]

server.connection(ConnectionSettings)
server.register(Plugins, handlePlugins)
server.route(Routes)
server.start(handleStart)

export default server
