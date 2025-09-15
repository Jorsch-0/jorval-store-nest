import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { env } from 'src/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import type { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) =>
          (req.cookies as Record<string, string>)?.refresh_token,
      ]),
      ignoreExpiration: false,
      secretOrKey: env.JWT_REFRESH_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.find(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
