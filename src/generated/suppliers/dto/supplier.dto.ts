import { IsString, IsNumber, IsEmail, IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength, Min, Max, IsArray, IsUUID, IsEnum, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * Supplier
 */
export class Supplier {
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
