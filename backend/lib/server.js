require('env2')('./config.env')

import Hapi from 'hapi'
const server = new Hapi.Server()
const port = process.env.PORT || 4000

import { handlePlugins, handleStart, handleRoute } from './helpers/server-helpers.js'
import client from './redis/client.js'
import { checkUsernameAvalibility } from './redis/redisFunctions.js'
import Login from './routes/Login.js'

import Bell from 'bell'
import AuthCookie from 'hapi-auth-cookie'
import Inert from 'inert'

const ConnectionSettings = { port, routes: {cors: true} }
const Plugins = [Inert, Bell, AuthCookie]

const Routes = [
  handleRoute('GET', '/img/{imageUrl*}', {directory: {path: './public/img'}}),
  handleRoute('GET', '/sayhello', (req, reply) => {reply('theResponse')}),
  handleRoute('GET', '/app.js', (req, reply) => {reply.file('./public/app.js')}),
  handleRoute('POST', '/checkUser', (req, reply) => {
    console.log(req.payload)
    reply(checkUsernameAvalibility(client(), req.payload))
  }),
  handleRoute('GET', '/{param*}', (req, reply) => {reply.file('./public/index.html')}),
  Login
]

import { TwitterCookie, TwitterOauth } from './authStrategies/twitterAuthStrategies.js'

server.connection(ConnectionSettings)
server.register(Plugins, handlePlugins)
server.auth.strategy('twitter', 'bell', TwitterOauth)
server.auth.strategy('session', 'cookie', TwitterCookie)
server.route(Routes)
server.start(handleStart)

export default server
