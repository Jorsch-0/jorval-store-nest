import { Catch, HttpException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { BaseApiExceptionFilter } from './base-api-exception.filter';

@Catch(HttpException)
export class HttpExceptionFilter extends BaseApiExceptionFilter<HttpException> {
  constructor(httpAdapterHost: HttpAdapterHost) {
    super(httpAdapterHost);
  }

  getErrorDetails(exception: HttpException) {
    const status = exception.getStatus();
    const response = exception.getResponse();

    if (typeof response === 'string') {
      return { status, message: response };
    }

    if (this.isErrorResponseObject(response)) {
      if (
        Array.isArray(response.message) &&
        response.message.every((msg) => typeof msg === 'string')
      ) {
        return { status, message: response.message };
      }
      if (typeof response.message === 'string') {
        return { status, message: response.message };
      }
    }

    return { status, message: exception.message };
  }

  private isErrorResponseObject(
    response: unknown,
  ): response is { message: unknown } {
    return (
      typeof response === 'object' && response !== null && 'message' in response
    );
  }
}
