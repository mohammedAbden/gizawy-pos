import { IsString, IsNumber, IsEmail, IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength, Min, Max, IsArray, IsUUID, IsEnum, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * Product
 */
export class Product {
  /**
   * id
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  id?: string;

  /**
   * name
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

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
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  price?: number;

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
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sku?: string;

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
