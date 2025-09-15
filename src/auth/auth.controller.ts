import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import type { Response } from 'express';
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from './constants';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import type { PublicUser } from 'src/users/users.types';
import { CurrentUser } from './decorators/current-user.decorator';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, access_token, refresh_token } =
      await this.authService.register(registerDto);
    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, access_token, refresh_token } =
      await this.authService.login(loginDto);
    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refresh(
    @CurrentUser() user: PublicUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token } =
      this.authService.refreshTokens(user);
    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
    return;
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', accessTokenCookieOptions);
    res.clearCookie('refresh_token', refreshTokenCookieOptions);
    return;
  }

  @Auth()
  @Post('test-protected')
  testProtected() {
    return { message: 'You have accessed a protected route' };
  }
}
