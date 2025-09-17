import { Controller, Get } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { PublicUser } from './users.types';

@Controller('users')
export class UsersController {
  constructor() {}

  @Auth()
  @Get('me')
  getMe(@CurrentUser() user: PublicUser) {
    return user;
  }
}
