export class HttpResponse {
  constructor(
    public readonly statusCode: number,
    public readonly body: Record<string, any>
  ) {}

  static ok(data: any): HttpResponse {
    return new HttpResponse(200, { success: true, data });
  }

  static created(data: any): HttpResponse {
    return new HttpResponse(201, { success: true, data });
  }

  static badRequest(message = 'Bad Request', details?: any): HttpResponse {
    return new HttpResponse(400, { success: false, message, details });
  }

  static notFound(message = 'Not Found'): HttpResponse {
    return new HttpResponse(404, { success: false, message });
  }

  static serverError(message = 'Internal Server Error'): HttpResponse {
    return new HttpResponse(500, { success: false, message });
  }
}
