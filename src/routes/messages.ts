import { FastifyPluginAsync, FastifySchema } from 'fastify'
import { JSONSchemaType } from 'ajv'


type CreatePayload = {
  name: string
  age: number
}

const createPayloadBodySchema: JSONSchemaType<CreatePayload> = {
  type: 'object',
  required: ['name', 'age'],
  additionalProperties: false,
  properties: {
    name: { type: 'string', minLength: 1, maxLength: 80,  pattern: '^[A-Za-zÀ-ÿ]+$' },
    age: { type: 'number', minimum: 1, maximum: 110 }
  }
}

const createPayloadSchema: FastifySchema = {
  body: createPayloadBodySchema,
  response: {
    201: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' }
      },
      required: ['name', 'age'],
      additionalProperties: false
    }
  }
}

const messages: FastifyPluginAsync = async (fastify) => {
  fastify.post<{ Body: CreatePayload }>(
    '/messages',
    { schema: createPayloadSchema },
    async (request, reply) => {
      const { name, age } = request.body

      return reply.status(201).send({
        name,
        age,
      })
    }
  )
}

export default messages
