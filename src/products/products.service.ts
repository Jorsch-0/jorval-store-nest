import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { slugify } from 'src/common/utils';

@Injectable()
export class ProductsService {
  constructor(private productsRepo: ProductsRepository) {}

  async create(createProductDto: CreateProductDto) {
    let slug = slugify(createProductDto.title);
    const slugCount = await this.productsRepo.getSlugCount(slug);
    if (slugCount) {
      slug = `${slug}-${slugCount}`;
    }
    return this.productsRepo.create(createProductDto, slug);
  }

  findAll() {
    return this.productsRepo.findAll();
  }

  async findOne(id: string) {
    const product = await this.productsRepo.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productsRepo.update(id, updateProductDto);
  }

  remove(id: string) {
    return this.productsRepo.remove(id);
  }
}
