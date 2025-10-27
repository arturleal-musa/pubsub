import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

const swaggerPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Musa PubSub API',
        version: '1.0.0'
      },
    }
  })

  await fastify.register(swaggerUi, {
    routePrefix: '/docs'
  })
}

export default fp(swaggerPlugin, {
  name: 'swagger'
})
