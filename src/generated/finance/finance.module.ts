import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';
import { ExpenseEntity } from './entities';

/**
 * Finance Module
 */
@Module({
  imports: [TypeOrmModule.forFeature([ExpenseEntity])],
  controllers: [FinanceController],
  providers: [FinanceService],
  exports: [FinanceService],
})
export class FinanceModule {}
