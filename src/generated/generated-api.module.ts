import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { CustomersModule } from './customers/customers.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { FinanceModule } from './finance/finance.module';
import { PartnersModule } from './partners/partners.module';
import { AssetsModule } from './assets/assets.module';
import { UsersModule } from './users/users.module';
import { MarketingModule } from './marketing/marketing.module';

/**
 * Main generated API module
 * Generated from: OmniStore POS API
 */
@Module({
  imports: [
       // Database configuration using ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'postgres' | 'mysql'>('database.type'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('database.synchronize'),
        logging: configService.get<boolean>('database.logging'),
        autoLoadEntities: true,
      }),
    }),

    // Feature modules
    AuthModule,
    ProductsModule,
    SalesModule,
    CustomersModule,
    SuppliersModule,
    FinanceModule,
    PartnersModule,
    AssetsModule,
    UsersModule,
    MarketingModule
  ],
})
export class GeneratedApiModule {}
