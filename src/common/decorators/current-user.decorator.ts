import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';
import { PublicUser } from 'src/users/users.types';

export const CurrentUser = createParamDecorator<keyof PublicUser>(
  (data, ctx: ExecutionContext): PublicUser | PublicUser[keyof PublicUser] => {
    const request: Request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new InternalServerErrorException();
    }

    return data ? user[data] : user;
  },
);
