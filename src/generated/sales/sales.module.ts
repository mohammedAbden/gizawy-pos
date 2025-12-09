import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { SaleEntity } from './entities';

/**
 * Sales Module
 */
@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity])],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService],
})
export class SalesModule {}
