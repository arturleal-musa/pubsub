import { FastifyInstance, FastifyRequest } from 'fastify';
import { BaseController } from './base_controller';
import { HttpResponse } from '../errors/http_response';
import { CreatePayload, createPayloadSchema } from '../schemas/messages';

export class MessagesController extends BaseController {
  constructor(private readonly app: FastifyInstance) {
    super();
    this.registerRoutes();
  }

  private registerRoutes() {
    this.app.post<{ Body: CreatePayload }>('/messages', {
      schema: createPayloadSchema ,
      handler: this.routeHandler(),
    });
  }

  protected async handle(request: FastifyRequest<{ Body: CreatePayload }>) {
    const { name, age } = request.body;
    const message = { name, age };
    return HttpResponse.created(message);
  }
}
