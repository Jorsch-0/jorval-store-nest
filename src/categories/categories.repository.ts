import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { categorySelect, type Category } from './categories.types';

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto): Promise<Category> {
    return this.prisma.category.create({
      data,
      select: categorySelect,
    });
  }

  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: { deletedAt: null },
      select: categorySelect,
    });
  }

  async update(id: string, data: UpdateCategoryDto): Promise<Category> {
    return this.prisma.category.update({
      where: { id, deletedAt: null },
      data,
      select: categorySelect,
    });
  }

  async remove(id: string): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
      select: categorySelect,
    });
  }
}
