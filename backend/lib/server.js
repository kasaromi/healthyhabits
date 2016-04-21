require('env2')('./config.env')
const messageBird = require('messageBird')(process.env.API_KEY)

import Hapi from 'hapi'
const server = new Hapi.Server()
const port = process.env.PORT || 4000

import { handlePlugins, handleStart, handleRoute } from './helpers/server-helpers.js'
import client from './redis/client.js'
import {addNewAction, getUserActions} from './redis/redisFunctions.js'
import { TwitterCookie, TwitterOauth } from './authStrategies/twitterAuthStrategies.js'
import Login from './routes/Login.js'
import userDetails from './routes/userDetails.js'

import Bell from 'bell'
import AuthCookie from 'hapi-auth-cookie'
import Inert from 'inert'

const ConnectionSettings = { port, routes: {cors: true} }
const Plugins = [Inert, Bell, AuthCookie]

const Routes = [
  handleRoute('GET', '/img/{imageUrl*}', {directory: {path: './public/img'}}),
  handleRoute('GET', '/sayhello', (req, reply) => {reply('theResponse')}),
  handleRoute('GET', '/app.js', (req, reply) => {reply.file('./public/app.js')}),
  userDetails,
  Login,
  {
    method: 'POST',
    path: '/addNewAction',
    handler: (req, reply) => {
      // console.log(req.payload.user, '<<<<payload123')
      addNewAction(client(), req.payload.user, JSON.stringify(req.payload.habit))
      .then(info => {
        const newInfo = info.map(j => JSON.parse(j))
        reply(newInfo)
      })
    }
  },
  {
    method: 'POST',
    path: '/getUserActions',
    handler: (req, reply) => {
      getUserActions(client(), req.payload.user)
      .then(info => {
        const newInfo = info.map(j => JSON.parse(j))
        const newNewInfo = newInfo.map(el => el.habit)
        reply(newNewInfo)
      })
    }
  }, {
    method: 'GET',
    path: '/sendText',
    handler: (req, reply) => {
      var params = {
        originator: '+447860039046',
        recipients: [
          '00447590490239'
        ],
        body: 'Bazinga!!'
      }

      messageBird.messages.create(params, (err, response) => {
        console.log(err ? err : response)
      })
      reply('BAZINGAAAA')
    }
  }, {
    method: 'GET',
    path: '/sponsorsValidation',
    handler: (req, reply) => {
      let receivedTexts
      const callMbird = (cb) => {
        messageBird.messages.read('', (err, response) => {
          if (err) {
            console.log(err)
          } else {
            console.log('START HEREEEE', response.items, 'END HEREEEE')
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

server.connection(ConnectionSettings)
server.register(Plugins, handlePlugins)
server.auth.strategy('twitter', 'bell', TwitterOauth)
server.auth.strategy('session', 'cookie', TwitterCookie)
server.route(Routes)
server.start(handleStart)

export default server
