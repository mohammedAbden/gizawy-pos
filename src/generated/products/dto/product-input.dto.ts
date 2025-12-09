import { IsString, IsNumber, IsEmail, IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength, Min, Max, IsArray, IsUUID, IsEnum, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * ProductInput
 */
export class ProductInput {
  /**
   * name
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * category
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;

  /**
   * price
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  /**
   * cost
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  cost?: number;

  /**
   * stock
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  stock?: number;

  /**
   * sku
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sku: string;

  /**
   * supplierIds
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  supplierIds?: string[];

  /**
   * lowStockThreshold
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  lowStockThreshold?: number;

  /**
   * image
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  image?: string;

}
