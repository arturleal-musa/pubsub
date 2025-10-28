import fp from 'fastify-plugin'
import Ajv, { Options as AjvOptions } from 'ajv'
import ajvErrors from 'ajv-errors'

const ajvOptions: AjvOptions = {
  allErrors: true,
  strict: false,
  strictSchema: false
}

export default fp(async (fastify) => {
  const ajv = new Ajv(ajvOptions)
  ajvErrors(ajv)

  fastify.setValidatorCompiler(({ schema }) => {
    return ajv.compile(schema)
  })
})
