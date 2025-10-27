import { FastifySchema } from 'fastify'
import { JSONSchemaType } from 'ajv'

export type CreatePayload = {
  name: string
  age: number
}

export const createPayloadBodySchema: JSONSchemaType<CreatePayload> = {
  type: 'object',
  required: ['name', 'age'],
  additionalProperties: false,
  properties: {
    name: { type: 'string', minLength: 1, maxLength: 80, pattern: '^[A-Za-zÀ-ÿ]+$' },
    age: { type: 'number', minimum: 1, maximum: 110 }
  }
}

export const createPayloadSchema: FastifySchema = {
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
