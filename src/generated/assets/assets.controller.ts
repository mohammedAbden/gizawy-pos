import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AssetsService } from './assets.service';
import { Asset, AssetInput } from './dto';

/**
 * Controller for assets endpoints
 */
@ApiTags('assets')
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  /**
   * List assets
   */
  @Get('/')
  @ApiOperation({ summary: 'List assets' })
  @ApiResponse({ status: 200, description: 'Successful', type: [Asset] })
  async getAssets(): Promise<Asset[]> {
    return this.assetsService.getAssets();
  }

  /**
   * Register asset
   */
  @Post('/')
  @ApiOperation({ summary: 'Register asset' })
  @ApiResponse({ status: 201, description: 'Asset created' })
  async postAssets(@Body() assetInput: AssetInput): Promise<any> {
    return this.assetsService.postAssets(assetInput);
  }

  /**
   * Update asset status
   */
  @Put('/{id}')
  @ApiOperation({ summary: 'Update asset status' })
  @ApiResponse({ status: 200, description: 'Asset updated' })
  @ApiParam({ name: 'id', description: '' })
  async putAssetsId(@Param('id') id: string): Promise<any> {
    return this.assetsService.putAssetsId(id);
  }

}
