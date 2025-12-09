import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseEntity } from './entities';
import { Expense, ExpenseInput } from './dto';

/**
 * Service for finance business logic
 */
@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private readonly repository: Repository<ExpenseEntity>,
  ) {}

  /**
   * List expenses
   */
  async getFinanceExpenses(): Promise<Expense[]> {
    // TODO: Implement getFinanceExpenses
    // Example using repository:
    // return this.repository.find();
    // return this.repository.findOne({ where: { id } });
    // return this.repository.save(data);
    throw new Error('Method getFinanceExpenses not implemented');
  }

  /**
   * Record expense
   */
  async postFinanceExpenses(expenseInput: ExpenseInput): Promise<any> {
    // TODO: Implement postFinanceExpenses
    // Example using repository:
    // return this.repository.find();
    // return this.repository.findOne({ where: { id } });
    // return this.repository.save(data);
    throw new Error('Method postFinanceExpenses not implemented');
  }

}
