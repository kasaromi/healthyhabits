export default {
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
}
