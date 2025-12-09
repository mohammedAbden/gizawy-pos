import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierEntity } from './entities';
import { Supplier, SupplierInput } from './dto';

/**
 * Service for suppliers business logic
 */
@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(SupplierEntity)
    private readonly repository: Repository<SupplierEntity>,
  ) {}

  /**
   * List suppliers
   */
  async getSuppliers(): Promise<Supplier[]> {
    // TODO: Implement getSuppliers
    // Example using repository:
    // return this.repository.find();
    // return this.repository.findOne({ where: { id } });
    // return this.repository.save(data);
    throw new Error('Method getSuppliers not implemented');
  }

  /**
   * Add supplier
   */
  async postSuppliers(supplierInput: SupplierInput): Promise<any> {
    // TODO: Implement postSuppliers
    // Example using repository:
    // return this.repository.find();
    // return this.repository.findOne({ where: { id } });
    // return this.repository.save(data);
    throw new Error('Method postSuppliers not implemented');
  }

}
