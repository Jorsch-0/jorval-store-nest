import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { productSelect } from './products.types';

@Injectable()
export class ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async getSlugCount(slug: string) {
    return this.prisma.product.count({
      where: {
        slug: {
          startsWith: slug,
        },
      },
    });
  }

  async create(createProductDto: CreateProductDto, slug: string) {
    return this.prisma.product.create({
      data: {
        ...createProductDto,
        slug,
      },
      select: productSelect,
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      where: { deletedAt: null },
      select: productSelect,
    });
  }

  async findOne(id: string) {
    return this.prisma.product.findFirst({
      where: { id, deletedAt: null },
      select: productSelect,
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id, deletedAt: null },
      data: updateProductDto,
      select: productSelect,
    });
  }

  async remove(id: string) {
    return this.prisma.product.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
      select: productSelect,
    });
  }
}
