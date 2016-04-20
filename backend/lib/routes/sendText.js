require('env2')('config.env')
const messageBird = require('messageBird')(process.env.API_KEY)

export default () => {
  return {
    method: 'GET',
    path: '/sendText',
    handler: (req, reply) => {
      const params = {
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
  }
}
