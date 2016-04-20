export default () => {
  return {
    method: 'GET',
    path: '/sponsorsValidation',
    handler: (req, reply) => {
      var params = {
        'originator': '+447860039046',
        'recipients': [
          '00447590490239'
        ],
      }
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
  }
}
