import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpResponse } from '../errors/http_response';

export abstract class BaseController {
  protected abstract handle(request: FastifyRequest): Promise<HttpResponse>;

  protected routeHandler() {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const response = await this.handle(request);
        reply.code(response.statusCode).send(response.body);
      } 
      catch (err: any) {
        console.error(`[Controller Error]: ${err.message}`);
        const fallback = HttpResponse.serverError(err.message);
        reply.code(fallback.statusCode).send(fallback.body);
      }
    };
  }
}
