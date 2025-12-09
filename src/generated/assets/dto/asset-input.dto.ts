import { IsString, IsNumber, IsEmail, IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength, Min, Max, IsArray, IsUUID, IsEnum, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * AssetInput
 */
export class AssetInput {
  /**
   * name
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

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
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  value: number;

  /**
   * status
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: string;

  /**
   * purchaseDate
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  purchaseDate?: string;

}
