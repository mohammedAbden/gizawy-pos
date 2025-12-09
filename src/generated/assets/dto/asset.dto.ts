import { IsString, IsNumber, IsEmail, IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength, Min, Max, IsArray, IsUUID, IsEnum, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * Asset
 */
export class Asset {
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
   * type
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  type?: string;

  /**
   * value
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  value?: number;

  /**
   * status
   */
  @ApiPropertyOptional({ enum: ['Active', 'Maintenance', 'Broken'] })
  @IsOptional()
  @IsString()
  @IsEnum(['Active', 'Maintenance', 'Broken'])
  status?: string;

}
