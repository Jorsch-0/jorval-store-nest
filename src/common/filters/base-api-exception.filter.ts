import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request } from 'express';
import { env } from 'src/config';

export abstract class BaseApiExceptionFilter<T extends Error>
  implements ExceptionFilter<T>
{
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  abstract getErrorDetails(
    exception: T,
    host: ArgumentsHost,
  ): {
    status: number;
    message: string | string[];
  };

  catch(exception: T, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request: Request = ctx.getRequest();

    const { status, message } = this.getErrorDetails(exception, host);

    const isProduction = env.NODE_ENV === 'production';

    const responseBody = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(request) as string,
      ...(isProduction ? null : { stack: exception.stack }),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }
}
