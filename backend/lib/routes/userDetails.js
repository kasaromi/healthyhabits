// import jwt from 'jsonwebtoken'
// const JWT_SECRET = process.env.JWT_SECRET

export default {
  method: 'GET',
  path: '/user-details',
  config: {
    auth: 'session',
    handler: (request, reply) => {
      // const decodedData = jwt.verify(request.auth.credentials['twitterCookie'], JWT_SECRET)
      reply.redirect('/habits')
    }
  }
}
