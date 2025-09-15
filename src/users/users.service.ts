import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
import { LoginDto, RegisterDto } from 'src/auth/dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  async create(registerDto: RegisterDto) {
    const { password } = registerDto;

    const hashedPassword = hashSync(password, 10);

    return this.usersRepo.create(registerDto, hashedPassword);
  }

  async find(id: string) {
    return this.usersRepo.find(id);
  }

  async findByEmail(email: string) {
    return this.usersRepo.findByEmail(email);
  }

  async validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersRepo.findByEmailForAuth(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };
  }
}
