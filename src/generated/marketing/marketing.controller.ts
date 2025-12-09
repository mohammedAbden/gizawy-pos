import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { MarketingService } from './marketing.service';
import { Campaign } from './dto';

/**
 * Controller for marketing endpoints
 */
@ApiTags('marketing')
@Controller('marketing')
export class MarketingController {
  constructor(private readonly marketingService: MarketingService) {}

  /**
   * List campaigns
   */
  @Get('/campaigns')
  @ApiOperation({ summary: 'List campaigns' })
  @ApiResponse({ status: 200, description: 'Successful', type: [Campaign] })
  async getMarketingCampaigns(): Promise<Campaign[]> {
    return this.marketingService.getMarketingCampaigns();
  }

  /**
   * Save generated campaign
   */
  @Post('/campaigns')
  @ApiOperation({ summary: 'Save generated campaign' })
  @ApiResponse({ status: 201, description: 'Campaign saved' })
  async postMarketingCampaigns(@Body() campaign: Campaign): Promise<any> {
    return this.marketingService.postMarketingCampaigns(campaign);
  }

  /**
   * Generate content via AI
   */
  @Post('/generate')
  @ApiOperation({ summary: 'Generate content via AI' })
  @ApiResponse({ status: 200, description: 'Successful' })
  async postMarketingGenerate(): Promise<any> {
    return this.marketingService.postMarketingGenerate();
  }

}
