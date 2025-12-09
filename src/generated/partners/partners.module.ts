import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';
import { PartnerEntity, PartnerTransactionEntity } from './entities';

/**
 * Partners Module
 */
@Module({
  imports: [TypeOrmModule.forFeature([PartnerEntity, PartnerTransactionEntity])],
  controllers: [PartnersController],
  providers: [PartnersService],
  exports: [PartnersService],
})
export class PartnersModule {}
