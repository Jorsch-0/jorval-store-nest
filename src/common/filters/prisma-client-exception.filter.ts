import { Catch, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { BaseApiExceptionFilter } from './base-api-exception.filter';
import { Prisma } from 'generated/prisma';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseApiExceptionFilter<Prisma.PrismaClientKnownRequestError> {
  constructor(httpAdapterHost: HttpAdapterHost) {
    super(httpAdapterHost);
  }

  getErrorDetails(exception: Prisma.PrismaClientKnownRequestError) {
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'An internal database error occurred.';

    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.CONFLICT;
        message = 'A record with these details already exists.';
        break;
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = 'The requested record was not found.';
        break;
    }

    return { status, message };
  }
}
