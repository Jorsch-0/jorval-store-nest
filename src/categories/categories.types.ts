import { Prisma } from 'generated/prisma';

export const categorySelect = Prisma.validator<Prisma.CategorySelect>()({
  id: true,
  name: true,
});

export type Category = Prisma.CategoryGetPayload<{
  select: typeof categorySelect;
}>;
