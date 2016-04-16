require('env2')('./config.env')

import Hapi from 'hapi'
const server = new Hapi.Server()
const port = process.env.PORT || 4000

import { handlePlugins, handleStart, handleRoute } from './helpers/server-helpers.js'
import client from './redis/client.js'
import { checkUsernameAvalibility } from './redis/redisFunctions.js'
import Login from './routes/Login.js'
import { TwitterCookie, TwitterOauth } from './authStrategies/twitterAuthStrategies.js'

import Bell from 'bell'
import AuthCookie from 'hapi-auth-cookie'
import Inert from 'inert'

const JWT_SECRET = process.env.JWT_SECRET
import jwt from 'jsonwebtoken'

const ConnectionSettings = { port, routes: {cors: true} }
const Plugins = [Inert, Bell, AuthCookie]

const Routes = [
  handleRoute('GET', '/img/{imageUrl*}', {directory: {path: './public/img'}}),
  handleRoute('GET', '/sayhello', (req, reply) => {reply('theResponse')}),
  handleRoute('GET', '/app.js', (req, reply) => {reply.file('./public/app.js')}),
  {
    method: 'GET',
    path: '/user-details',
    config: {
      auth: 'session',
      handler: (request, reply) => {
        console.log(request.auth.credentials)
        const decodedData = jwt.verify(request.auth.credentials['twitterCookie'], JWT_SECRET)
        console.log(decodedData, decodedData.screenName)
        reply.redirect('/')
        // reply({
        //   screenName: decodedData.screenName,
        //   profileImg: decodedData.profile_image_url
        // })
      }
    }
  },
  Login,
  handleRoute('GET', '/{param*}', (req, reply) => {reply.file('./public/index.html')})
]

server.connection(ConnectionSettings)
server.register(Plugins, handlePlugins)
server.auth.strategy('twitter', 'bell', TwitterOauth)
server.auth.strategy('session', 'cookie', TwitterCookie)
server.route(Routes)
server.start(handleStart)

export default server
