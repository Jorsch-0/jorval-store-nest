import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepo: CategoriesRepository) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoriesRepo.create(createCategoryDto);
  }

  findAll() {
    return this.categoriesRepo.findAll();
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesRepo.update(id, updateCategoryDto);
  }

  remove(id: string) {
    return this.categoriesRepo.remove(id);
  }
}
