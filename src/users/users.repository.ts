import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  PublicUser,
  publicUserSelect,
  UserForAuth,
  userForAuthSelect,
} from './users.types';
import { RegisterDto } from 'src/auth/dto';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    registerDto: RegisterDto,
    hashedPassword: string,
  ): Promise<PublicUser> {
    const { fullName, email } = registerDto;
    return this.prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
      select: publicUserSelect,
    });
  }

  async find(id: string): Promise<PublicUser | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: publicUserSelect,
    });
  }

  async findByEmail(email: string): Promise<PublicUser | null> {
    return this.prisma.user.findUnique({
      where: { email },
      select: publicUserSelect,
    });
  }

  async findByEmailForAuth(email: string): Promise<UserForAuth | null> {
    return this.prisma.user.findUnique({
      where: { email },
      select: userForAuthSelect,
    });
  }
}
