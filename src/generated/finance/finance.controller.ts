import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { FinanceService } from './finance.service';
import { Expense, ExpenseInput } from './dto';

/**
 * Controller for finance endpoints
 */
@ApiTags('finance')
@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  /**
   * List expenses
   */
  @Get('/expenses')
  @ApiOperation({ summary: 'List expenses' })
  @ApiResponse({ status: 200, description: 'Expense history', type: [Expense] })
  async getFinanceExpenses(): Promise<Expense[]> {
    return this.financeService.getFinanceExpenses();
  }

  /**
   * Record expense
   */
  @Post('/expenses')
  @ApiOperation({ summary: 'Record expense' })
  @ApiResponse({ status: 201, description: 'Expense recorded' })
  async postFinanceExpenses(@Body() expenseInput: ExpenseInput): Promise<any> {
    return this.financeService.postFinanceExpenses(expenseInput);
  }

}
