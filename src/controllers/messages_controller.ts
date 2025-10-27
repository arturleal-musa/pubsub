import { FastifyInstance } from 'fastify'
import { CreatePayload, createPayloadSchema } from '../schemas/messages'

class MessagesController {
  constructor(private readonly fastify: FastifyInstance) {
    this.registerRoutes()
  }

  private registerRoutes(): void {
    this.message()
  }

  private message(): void {
    this.fastify.post<{ Body: CreatePayload }>(
      '/messages',
      { schema: createPayloadSchema },
      async (request, reply) => {
        const { name, age } = request.body

        return reply.status(201).send({
          name,
          age
        })
      }
    )
  }
}

export default MessagesController
