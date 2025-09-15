import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto, LoginDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { env } from 'src/config';
import { PublicUser } from 'src/users/users.types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const user = await this.usersService.create(registerDto);
    const { access_token, refresh_token } = this.getJwtTokens(user);

    return {
      user,
      access_token,
      refresh_token,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.validateUser(loginDto);

    const { access_token, refresh_token } = this.getJwtTokens(user);

    return {
      user,
      access_token,
      refresh_token,
    };
  }

  refreshTokens(user: PublicUser) {
    const { access_token, refresh_token } = this.getJwtTokens(user);

    return {
      access_token,
      refresh_token,
    };
  }

  private getJwtTokens(user: PublicUser) {
    const payload: JwtPayload = { sub: user.id, email: user.email };

    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(payload, {
      secret: env.JWT_REFRESH_SECRET,
      expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    });

    return { access_token, refresh_token };
  }
}
