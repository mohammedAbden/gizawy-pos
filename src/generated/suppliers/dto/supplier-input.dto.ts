import { IsString, IsNumber, IsEmail, IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength, Min, Max, IsArray, IsUUID, IsEnum, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * SupplierInput
 */
export class SupplierInput {
  /**
   * name
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * contact
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  contact?: string;

  /**
   * leadTime
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  leadTime?: number;

}
