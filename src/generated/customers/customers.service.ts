import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './entities';
import { Customer, CustomerInput } from './dto';

/**
 * Service for customers business logic
 */
@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly repository: Repository<CustomerEntity>,
  ) {}

  /**
   * List customers
   */
  async getCustomers(): Promise<Customer[]> {
    // TODO: Implement getCustomers
    // Example using repository:
    // return this.repository.find();
    // return this.repository.findOne({ where: { id } });
    // return this.repository.save(data);
    throw new Error('Method getCustomers not implemented');
  }

  /**
   * Create customer
   */
  async postCustomers(customerInput: CustomerInput): Promise<any> {
    // TODO: Implement postCustomers
    // Example using repository:
    // return this.repository.find();
    // return this.repository.findOne({ where: { id } });
    // return this.repository.save(data);
    throw new Error('Method postCustomers not implemented');
  }

}
