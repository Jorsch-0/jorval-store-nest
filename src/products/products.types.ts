import { Prisma } from 'generated/prisma';

export const productSelect = Prisma.validator<Prisma.ProductSelect>()({
  id: true,
  slug: true,
  title: true,
  description: true,
  price: true,
  stock: true,
  images: true,
});

export type Product = Prisma.CategoryGetPayload<{
  select: typeof productSelect;
}>;
