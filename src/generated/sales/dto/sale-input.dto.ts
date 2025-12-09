import { IsString, IsNumber, IsEmail, IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength, Min, Max, IsArray, IsUUID, IsEnum, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * SaleInput
 */
export class SaleInput {
  /**
   * items
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  items?: any[];

  /**
   * paymentMethod
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  /**
   * customerId
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  customerId?: string;

}
