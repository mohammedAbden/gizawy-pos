import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { SalesService } from './sales.service';
import { Sale, SaleInput } from './dto';

/**
 * Controller for sales endpoints
 */
@ApiTags('sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  /**
   * Get sales history
   */
  @Get('/')
  @ApiOperation({ summary: 'Get sales history' })
  @ApiResponse({ status: 200, description: 'List of sales', type: [Sale] })
  @ApiQuery({ name: 'startDate', required: false, description: '' })
  @ApiQuery({ name: 'endDate', required: false, description: '' })
  async getSales(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string): Promise<Sale[]> {
    return this.salesService.getSales(startDate, endDate);
  }

  /**
   * Record a new sale (POS Transaction)
   */
  @Post('/')
  @ApiOperation({ summary: 'Record a new sale (POS Transaction)' })
  @ApiResponse({ status: 201, description: 'Sale recorded', type: Sale })
  async postSales(@Body() saleInput: SaleInput): Promise<Sale> {
    return this.salesService.postSales(saleInput);
  }

}
