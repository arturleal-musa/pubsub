import { FastifySchema } from 'fastify'
import { JSONSchemaType } from 'ajv'

export type CreatePayload = {
  name: string
  age: number
}

type JsonSchemaWithMessage<T> = JSONSchemaType<T> & {
  errorMessage?: Record<string, unknown> | string
}

const nameSchema: JsonSchemaWithMessage<CreatePayload['name']> = {
  type: 'string',
  minLength: 2,
  maxLength: 80,
  pattern: '^[A-Za-zÀ-ÿ]+$',
  errorMessage: {
    minLength: 'Nome muito curto',
    maxLength: 'Nome muito longo',
    pattern: 'Nome contém caracteres inválidos'
  }
}

const ageSchema: JsonSchemaWithMessage<CreatePayload['age']> = {
  type: 'number',
  minimum: 1,
  maximum: 99,
  errorMessage: {
    minimum: 'Idade muito baixa',
    maximum: 'Idade muito alta'
  }
}

export const createPayloadBodySchema: JsonSchemaWithMessage<CreatePayload> = {
  type: 'object',
  required: ['name', 'age'],
  additionalProperties: false,
  properties: {
    name: nameSchema,
    age: ageSchema
  },
  errorMessage: {
    required: {
      name: 'Nome é obrigatório',
      age: 'Idade é obrigatória'
    },
    additionalProperties: 'Campos extras não são permitidos'
  }
}

export const createPayloadSchema: FastifySchema = {
  body: createPayloadBodySchema,
  response: {
    201: {
      type: 'object',
      properties: {
        success: { type: 'boolean', const: true },
        data: {
          type: 'object',
          required: ['name', 'age'],
          additionalProperties: false,
          properties: {
            name: { type: 'string' },
            age: { type: 'number' }
          }
        }
      },
      required: ['success', 'data'],
      additionalProperties: false
    }
  }
}
