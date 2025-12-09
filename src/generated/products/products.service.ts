import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities';
import { Product, ProductInput } from './dto';

/**
 * Service for products business logic
 */
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  /**
   * List all products
   */
  async getProducts(search?: string, category?: string): Promise<Product[]> {
    // TODO: Implement getProducts
    // Example using repository:
    // return this.repository.find();
    // return this.repository.findOne({ where: { id } });
    // return this.repository.save(data);
    throw new Error('Method getProducts not implemented');
  }

  /**
   * Create a new product
   */
  async postProducts(productInput: ProductInput): Promise<Product> {
    // TODO: Implement postProducts
    // Example using repository:
    // return this.repository.find();
    // return this.repository.findOne({ where: { id } });
    // return this.repository.save(data);
    throw new Error('Method postProducts not implemented');
  }

  /**
   * Update product details
   */
  async putProductsId(id: string, productInput: ProductInput): Promise<any> {
    // TODO: Implement putProductsId
    // Example using repository:
    // return this.repository.find();
    // return this.repository.findOne({ where: { id } });
    // return this.repository.save(data);
    throw new Error('Method putProductsId not implemented');
  }

  /**
   * Adjust product stock level
   */
  async patchProductsIdStock(id: string): Promise<Product> {
    // TODO: Implement patchProductsIdStock
    // Example using repository:
    // return this.repository.find();
    // return this.repository.findOne({ where: { id } });
    // return this.repository.save(data);
    throw new Error('Method patchProductsIdStock not implemented');
  }

  /**
   * Bulk update stock for multiple products
   */
  async postProductsBulkAdjustment(): Promise<any> {
    // TODO: Implement postProductsBulkAdjustment
    // Example using repository:
    // return this.repository.find();
    // return this.repository.findOne({ where: { id } });
    // return this.repository.save(data);
    throw new Error('Method postProductsBulkAdjustment not implemented');
  }

}
