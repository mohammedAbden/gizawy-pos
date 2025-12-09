import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { PartnersService } from './partners.service';
import { Partner, PartnerInput, PartnerTransaction, PartnerTransactionInput } from './dto';

/**
 * Controller for partners endpoints
 */
@ApiTags('partners')
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  /**
   * List partners
   */
  @Get('/')
  @ApiOperation({ summary: 'List partners' })
  @ApiResponse({ status: 200, description: 'Partner list', type: [Partner] })
  async getPartners(): Promise<Partner[]> {
    return this.partnersService.getPartners();
  }

  /**
   * Register new partner
   */
  @Post('/')
  @ApiOperation({ summary: 'Register new partner' })
  @ApiResponse({ status: 201, description: 'Partner created' })
  async postPartners(@Body() partnerInput: PartnerInput): Promise<any> {
    return this.partnersService.postPartners(partnerInput);
  }

  /**
   * Get partner capital history
   */
  @Get('/{id}/transactions')
  @ApiOperation({ summary: 'Get partner capital history' })
  @ApiResponse({ status: 200, description: 'Transaction list', type: [PartnerTransaction] })
  @ApiParam({ name: 'id', description: '' })
  async getPartnersIdTransactions(@Param('id') id: string): Promise<PartnerTransaction[]> {
    return this.partnersService.getPartnersIdTransactions(id);
  }

  /**
   * Add capital transaction (Increase/Decrease)
   */
  @Post('/{id}/transactions')
  @ApiOperation({ summary: 'Add capital transaction (Increase/Decrease)' })
  @ApiResponse({ status: 201, description: 'Transaction recorded' })
  @ApiParam({ name: 'id', description: '' })
  async postPartnersIdTransactions(@Param('id') id: string, @Body() partnerTransactionInput: PartnerTransactionInput): Promise<any> {
    return this.partnersService.postPartnersIdTransactions(id, partnerTransactionInput);
  }

}
