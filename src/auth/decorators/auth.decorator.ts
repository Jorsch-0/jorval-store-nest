import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from 'generated/prisma';
import { Roles } from './roles.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export function Auth(...roles: Role[]) {
  return applyDecorators(Roles(...roles), UseGuards(JwtAuthGuard, RolesGuard));
}
