import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { SuppliersService } from './suppliers.service';
import { Supplier, SupplierInput } from './dto';

/**
 * Controller for suppliers endpoints
 */
@ApiTags('suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  /**
   * List suppliers
   */
  @Get('/')
  @ApiOperation({ summary: 'List suppliers' })
  @ApiResponse({ status: 200, description: 'Supplier list', type: [Supplier] })
  async getSuppliers(): Promise<Supplier[]> {
    return this.suppliersService.getSuppliers();
  }

  /**
   * Add supplier
   */
  @Post('/')
  @ApiOperation({ summary: 'Add supplier' })
  @ApiResponse({ status: 201, description: 'Supplier added' })
  async postSuppliers(@Body() supplierInput: SupplierInput): Promise<any> {
    return this.suppliersService.postSuppliers(supplierInput);
  }

}
