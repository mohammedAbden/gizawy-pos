import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Product, ProductInput } from './dto';

/**
 * Controller for products endpoints
 */
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * List all products
   */
  @Get('/')
  @ApiOperation({ summary: 'List all products' })
  @ApiResponse({ status: 200, description: 'List of products', type: [Product] })
  @ApiQuery({ name: 'search', required: false, description: 'Filter by name or SKU' })
  @ApiQuery({ name: 'category', required: false, description: '' })
  async getProducts(@Query('search') search?: string, @Query('category') category?: string): Promise<Product[]> {
    return this.productsService.getProducts(search, category);
  }

  /**
   * Create a new product
   */
  @Post('/')
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created', type: Product })
  async postProducts(@Body() productInput: ProductInput): Promise<Product> {
    return this.productsService.postProducts(productInput);
  }

  /**
   * Update product details
   */
  @Put('/{id}')
  @ApiOperation({ summary: 'Update product details' })
  @ApiResponse({ status: 200, description: 'Product updated' })
  @ApiParam({ name: 'id', description: '' })
  async putProductsId(@Param('id') id: string, @Body() productInput: ProductInput): Promise<any> {
    return this.productsService.putProductsId(id, productInput);
  }

  /**
   * Adjust product stock level
   */
  @Patch('/{id}/stock')
  @ApiOperation({ summary: 'Adjust product stock level' })
  @ApiResponse({ status: 200, description: 'Stock updated', type: Product })
  @ApiParam({ name: 'id', description: '' })
  async patchProductsIdStock(@Param('id') id: string): Promise<Product> {
    return this.productsService.patchProductsIdStock(id);
  }

  /**
   * Bulk update stock for multiple products
   */
  @Post('/bulk-adjustment')
  @ApiOperation({ summary: 'Bulk update stock for multiple products' })
  @ApiResponse({ status: 200, description: 'Bulk update successful' })
  async postProductsBulkAdjustment(): Promise<any> {
    return this.productsService.postProductsBulkAdjustment();
  }

}
