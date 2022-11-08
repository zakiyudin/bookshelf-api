const Hapi = require('@hapi/hapi')
const route = require('./routes')

const init = async () => {
  const server = Hapi.Server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.route(route)
  await server.start()
  console.log(`server running on ${server.info.uri}`)
}

init()
