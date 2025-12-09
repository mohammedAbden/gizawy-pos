import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleEntity } from './entities';
import { Sale, SaleInput } from './dto';

/**
 * Service for sales business logic
 */
@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly repository: Repository<SaleEntity>,
  ) {}

  /**
   * Get sales history
   */
  async getSales(startDate?: string, endDate?: string): Promise<Sale[]> {
    // TODO: Implement getSales
    // Example using repository:
    // return this.repository.find();
    // return this.repository.findOne({ where: { id } });
    // return this.repository.save(data);
    throw new Error('Method getSales not implemented');
  }

  /**
   * Record a new sale (POS Transaction)
   */
  async postSales(saleInput: SaleInput): Promise<Sale> {
    // TODO: Implement postSales
    // Example using repository:
    // return this.repository.find();
    // return this.repository.findOne({ where: { id } });
    // return this.repository.save(data);
    throw new Error('Method postSales not implemented');
  }

}
