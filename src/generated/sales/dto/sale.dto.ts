import { IsString, IsNumber, IsEmail, IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength, Min, Max, IsArray, IsUUID, IsEnum, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * Sale
 */
export class Sale {
  /**
   * id
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  id?: string;

  /**
   * items
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  items?: any[];

  /**
   * total
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  total?: number;

  /**
   * date
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Type(() => Date)
  date?: string;

  /**
   * cashierId
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cashierId?: string;

  /**
   * paymentMethod
   */
  @ApiPropertyOptional({ enum: ['CASH', 'CARD'] })
  @IsOptional()
  @IsString()
  @IsEnum(['CASH', 'CARD'])
  paymentMethod?: string;

}
