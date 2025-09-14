import { Prisma } from 'generated/prisma';

export const userForAuthSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  fullName: true,
  email: true,
  password: true,
});

export type UserForAuth = Prisma.UserGetPayload<{
  select: typeof userForAuthSelect;
}>;

export const publicUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  fullName: true,
  email: true,
});

export type PublicUser = Prisma.UserGetPayload<{
  select: typeof publicUserSelect;
}>;
