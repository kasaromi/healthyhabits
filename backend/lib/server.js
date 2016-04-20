require('env2')('./config.env')
const messageBird = require('messageBird')(process.env.API_KEY)

import Hapi from 'hapi'
const server = new Hapi.Server()
const port = process.env.PORT || 4000

import { handlePlugins, handleRoute } from './helpers/server-helpers.js'
import client from './redis/client.js'
// import {addNewAction, completeAction } from './redis/redisFunctions.js'
import { TwitterCookie, TwitterOauth } from './authStrategies/twitterAuthStrategies.js'
import Login from './routes/Login.js'
import userDetails from './routes/userDetails.js'
import sendText from './routes/sendText.js'
import sponsorsValidation from './routes/sponsorsValidation.js'

import Bell from 'bell'
import AuthCookie from 'hapi-auth-cookie'
import Inert from 'inert'

const ConnectionSettings = { port, routes: {cors: true} }
const Plugins = [Inert, Bell, AuthCookie]

let username
let habit

const Routes = [
  handleRoute('GET', '/img/{imageUrl*}', {directory: {path: './public/img'}}),
  handleRoute('GET', '/sayhello', (req, reply) => {reply('theResponse')}),
  handleRoute('GET', '/app.js', (req, reply) => {reply.file('./public/app.js')}),
  userDetails,
  Login,
  sendText(), {
    method: 'GET',
    path: '/sponsorsValidation',
    handler: (req, reply) => {
      let receivedTexts
      const callMbird = (cb) => {
        messageBird.messages.read('', (err, response) => {
        if (err) {
          console.log(err)
        } else {
          console.log('START HEREEEE', response.items, 'END HEREEEE');
          const allTexts = response.items
          receivedTexts = allTexts.filter((text) =>
            text.direction === 'mo'
          )
        }
        cb()
      })}
      const run = () => {
        const refinedTexts = receivedTexts.map(text => {
          return {
            message: text.body,
            sponsor: text.originator,
            time: text.createdDatetime
          }
        })
        reply(refinedTexts)
      }
      callMbird(run)
    }
  },
  handleRoute('GET', '/{param*}', (req, reply) => {reply.file('./public/index.html')})
]

const loggin = () => {
  if (username) {
    console.log('working!')
    client.hset('users', 'shouston33', JSON.stringify({ swimming: swimming }))
  }
}

const handleStart = (err) => {

  if (err) {
    console.log('server error: ', err)
  } else {

    setInterval(loggin, 1000)
    console.log('server listening on port: ' + server.info.port)
  }
}

server.connection(ConnectionSettings)
server.register(Plugins, handlePlugins)
server.auth.strategy('twitter', 'bell', TwitterOauth)
server.auth.strategy('session', 'cookie', TwitterCookie)
server.route(Routes)
server.start(handleStart)

  // completeAction(client(), username, habit)))

export default server
