import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { Customer, CustomerInput } from './dto';

/**
 * Controller for customers endpoints
 */
@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  /**
   * List customers
   */
  @Get('/')
  @ApiOperation({ summary: 'List customers' })
  @ApiResponse({ status: 200, description: 'Customer list', type: [Customer] })
  async getCustomers(): Promise<Customer[]> {
    return this.customersService.getCustomers();
  }

  /**
   * Create customer
   */
  @Post('/')
  @ApiOperation({ summary: 'Create customer' })
  @ApiResponse({ status: 201, description: 'Customer created' })
  async postCustomers(@Body() customerInput: CustomerInput): Promise<any> {
    return this.customersService.postCustomers(customerInput);
  }

}
