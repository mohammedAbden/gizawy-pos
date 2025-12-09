import { IsString, IsNumber, IsEmail, IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength, Min, Max, IsArray, IsUUID, IsEnum, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * Customer
 */
export class Customer {
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
   * email
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email?: string;

  /**
   * phone
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  /**
   * loyaltyPoints
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  loyaltyPoints?: number;

}
