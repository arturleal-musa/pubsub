import { FastifyPluginAsync } from 'fastify'
import MessagesController from '../controllers/messages_controller'

const messages: FastifyPluginAsync = async (fastify) => {
  void new MessagesController(fastify)
}

export default messages
