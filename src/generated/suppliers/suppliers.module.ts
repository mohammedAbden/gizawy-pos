import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuppliersController } from './suppliers.controller';
import { SuppliersService } from './suppliers.service';
import { SupplierEntity } from './entities';

/**
 * Suppliers Module
 */
@Module({
  imports: [TypeOrmModule.forFeature([SupplierEntity])],
  controllers: [SuppliersController],
  providers: [SuppliersService],
  exports: [SuppliersService],
})
export class SuppliersModule {}
