import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketingController } from './marketing.controller';
import { MarketingService } from './marketing.service';
import { CampaignEntity } from './entities';

/**
 * Marketing Module
 */
@Module({
  imports: [TypeOrmModule.forFeature([CampaignEntity])],
  controllers: [MarketingController],
  providers: [MarketingService],
  exports: [MarketingService],
})
export class MarketingModule {}
